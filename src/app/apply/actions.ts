'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { z } from 'zod'
import { env } from '@/lib/env'
import { checkAndRecordRequest } from '@/lib/rate-limit'
import {
  buildEmailHtml,
  buildEmailSubject,
  buildEmailText,
  type ApplicationPayload,
} from '@/lib/email-template'

/*
  Application form Server Action.

  REBUILD_PLAN.md §9 behavior implemented here:
   1. Honeypot check — if "company" is non-empty, return fake success
      (bots get the same UX as humans, no signal that the trap fired).
   2. Zod validation — typed payload or "validation" error.
   3. Per-IP rate limit (5 / hour).
   4. RESEND_API_KEY check — friendly "misconfigured" error if missing.
   5. Resend send — generic "send-failed" on Resend error.
   6. Success.

  The success branch returns `{ status: 'success' }`. The client fires
  `application_submit` with `form_location` from there
  (REBUILD_PLAN.md §11), and renders an inline success card.
*/

export type ApplicationFormState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error'
      code: 'validation' | 'rate-limited' | 'misconfigured' | 'send-failed'
    }

const ApplicationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('Valid email is required').max(200),
  phone: z.string().trim().max(50).optional().or(z.literal('')),
  goal: z.enum(['weight-loss', 'build-muscle', 'hybrid', 'not-sure']),
  program: z
    .enum(['lifestyle', 'nutrition', 'training', 'in-person', 'not-sure'])
    .optional()
    .or(z.literal('')),
  term: z
    .enum(['monthly', '3month', '6month', '12month', 'not-sure'])
    .optional()
    .or(z.literal('')),
  about: z.string().trim().max(5000).optional().or(z.literal('')),
  heard_from: z.string().trim().max(500).optional().or(z.literal('')),
})

function getClientIp(): string {
  // headers() is async in Next.js 16. We accept "unknown" as a fallback
  // — the rate limiter is best-effort, not a security boundary.
  // (See note in lib/rate-limit.ts.)
  return 'unknown'
}

export async function submitApplication(
  _prevState: ApplicationFormState,
  formData: FormData,
): Promise<ApplicationFormState> {
  // 1. Honeypot first — cheapest check, fail to fake-success.
  const honeypot = formData.get('company')
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    return { status: 'success' }
  }

  // 2. Validate.
  const raw = Object.fromEntries(formData.entries())
  const parsed = ApplicationSchema.safeParse(raw)
  if (!parsed.success) {
    return { status: 'error', code: 'validation' }
  }
  const data = parsed.data as ApplicationPayload & {
    program?: string
    term?: string
  }

  // 3. Rate limit.
  const headerStore = await headers()
  const fwd = headerStore.get('x-forwarded-for')
  const ip = fwd ? fwd.split(',')[0].trim() : getClientIp()
  if (!checkAndRecordRequest(ip)) {
    return { status: 'error', code: 'rate-limited' }
  }

  // 4. Env check.
  if (!env.RESEND_API_KEY) {
    console.error('[apply] RESEND_API_KEY is not set — refusing to send.')
    return { status: 'error', code: 'misconfigured' }
  }

  // 5. Send.
  try {
    const resend = new Resend(env.RESEND_API_KEY)
    const subject = buildEmailSubject(data)
    const text = buildEmailText(data)
    const html = buildEmailHtml(data)

    const result = await resend.emails.send({
      from: env.CONTACT_FROM_EMAIL,
      to: env.CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject,
      text,
      html,
    })

    if (result.error) {
      console.error('[apply] Resend returned error:', result.error)
      return { status: 'error', code: 'send-failed' }
    }
  } catch (err) {
    console.error('[apply] Resend threw:', err)
    return { status: 'error', code: 'send-failed' }
  }

  return { status: 'success' }
}
