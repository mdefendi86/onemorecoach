'use client'

import { useActionState, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { copy } from '@/data/copy'
import { submitApplication, type ApplicationFormState } from '@/app/apply/actions'
import { trackEvent } from '@/lib/analytics'

/*
  Application form — Phase 3 wires the Server Action.

  REBUILD_PLAN.md §9 behavior:
   - URL prefill on mount (program / term)
   - Prefill banner if any param matched
   - Hidden honeypot ("company") — Server Action returns fake success when filled
   - useActionState drives submit; pending state disables the button
   - Inline success / error UI (no third-party redirect)
   - Fires `application_submit` analytics event on 200 success
*/

const PROGRAM_OPTIONS = [
  { value: 'lifestyle', label: 'Lifestyle (Training + Nutrition)' },
  { value: 'nutrition', label: 'Nutrition & Supplementation Only' },
  { value: 'training', label: 'Training Guidance Only' },
  { value: 'in-person', label: 'In-Person Training' },
  { value: 'not-sure', label: 'Not sure — need help deciding' },
] as const

const TERM_OPTIONS = [
  { value: 'monthly', label: 'Month-to-Month' },
  { value: '3month', label: '3 Months — Save $50' },
  { value: '6month', label: '6 Months — Save $50' },
  { value: '12month', label: '12 Months — Save $50' },
  { value: 'not-sure', label: 'Not sure yet' },
] as const

const GOAL_OPTIONS = [
  { value: 'weight-loss', label: 'Weight Loss' },
  { value: 'build-muscle', label: 'Build Muscle' },
  { value: 'hybrid', label: 'Hybrid / Performance' },
  { value: 'not-sure', label: 'Not Sure Yet' },
] as const

const INITIAL_STATE: ApplicationFormState = { status: 'idle' }

function errorCopy(code: 'validation' | 'rate-limited' | 'misconfigured' | 'send-failed') {
  switch (code) {
    case 'validation':
      return copy.applyPage.formErrorValidationBody
    case 'rate-limited':
      return copy.applyPage.formErrorRateLimitedBody
    case 'misconfigured':
      return copy.applyPage.formErrorMisconfiguredBody
    case 'send-failed':
      return copy.applyPage.formErrorSendFailedBody
  }
}

export function ApplicationForm() {
  const params = useSearchParams()
  const programParam = params.get('program') ?? ''
  const termParam = params.get('term') ?? ''

  const initialProgram = PROGRAM_OPTIONS.some((o) => o.value === programParam) ? programParam : ''
  const initialTerm = TERM_OPTIONS.some((o) => o.value === termParam) ? termParam : ''
  const prefilled = Boolean(initialProgram || initialTerm)

  const [program, setProgram] = useState(initialProgram)
  const [term, setTerm] = useState(initialTerm)

  const [state, formAction, isPending] = useActionState(submitApplication, INITIAL_STATE)

  // Fire analytics on success — useEffect is the correct place because
  // this is "react to state change" (post-server-action), not "sync
  // external state into React".
  useEffect(() => {
    if (state.status === 'success') {
      trackEvent('application_submit', { form_location: 'apply' })
    }
  }, [state.status])

  if (state.status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-[var(--radius)] border border-accent/40 bg-accent/[0.06] px-6 py-8 text-center md:px-8 md:py-10"
      >
        <h3 className="font-display text-accent text-[1.8rem]">
          {copy.applyPage.formSuccessTitle}
        </h3>
        <p className="text-muted mx-auto mt-3 max-w-md text-[0.95rem] leading-[1.65]">
          {copy.applyPage.formSuccessBody}
        </p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      noValidate
      aria-label="Coaching application form"
      className="rounded-[var(--radius)] border border-border bg-bg-card px-6 py-7 md:px-7 md:py-8"
    >
      <h3 className="font-display text-[1.6rem]">{copy.applyPage.formTitle}</h3>

      {prefilled ? (
        <p
          className="text-accent mt-4 rounded border border-accent/25 bg-accent/[0.08] px-3.5 py-2.5 text-[0.82rem] leading-[1.5]"
          role="status"
        >
          {copy.applyPage.prefillBannerText}
        </p>
      ) : null}

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field id="apply-name" label="Full Name *">
          <input
            type="text"
            id="apply-name"
            name="name"
            placeholder="Your name"
            required
            autoComplete="name"
            className={inputClasses}
          />
        </Field>
        <Field id="apply-email" label="Email Address *">
          <input
            type="email"
            id="apply-email"
            name="email"
            placeholder="you@email.com"
            required
            autoComplete="email"
            className={inputClasses}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field id="apply-phone" label="Phone (optional)">
          <input
            type="tel"
            id="apply-phone"
            name="phone"
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
            className={inputClasses}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field id="apply-goal" label="Primary Goal *">
          <select id="apply-goal" name="goal" required defaultValue="" className={inputClasses}>
            <option value="" disabled>
              Select your goal…
            </option>
            {GOAL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field id="apply-program" label="Interested In">
          <select
            id="apply-program"
            name="program"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className={inputClasses}
          >
            <option value="">Which program interests you?</option>
            {PROGRAM_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field id="apply-term" label="Commitment Length">
          <select
            id="apply-term"
            name="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className={inputClasses}
          >
            <option value="">Select if you have a preference…</option>
            {TERM_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field id="apply-about" label="Tell Josh About Yourself">
          <textarea
            id="apply-about"
            name="about"
            rows={4}
            placeholder="Current training background, biggest challenge, what you've tried before… anything that helps Josh understand your situation."
            className={`${inputClasses} min-h-[100px] resize-y`}
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field id="apply-heard" label="How Did You Hear About Us?">
          <input
            type="text"
            id="apply-heard"
            name="heard_from"
            placeholder="Instagram, friend referral, Google…"
            className={inputClasses}
          />
        </Field>
      </div>

      {/* Honeypot — hidden field; Server Action returns fake success if non-empty. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[5000px] h-0 w-0 opacity-0"
      />

      {state.status === 'error' ? (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-5 rounded border border-red-500/40 bg-red-500/[0.08] px-3.5 py-3 text-[0.85rem] leading-[1.55] text-red-200"
        >
          {errorCopy(state.code)}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        aria-disabled={isPending}
        className="bg-accent mt-6 inline-flex w-full items-center justify-center rounded-[var(--radius)] px-6 py-4 font-display text-[1.15rem] tracking-[0.06em] text-[color:var(--color-bg)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? copy.applyPage.formSendingLabel : copy.applyPage.formSubmitLabel}
      </button>
      <p className="text-muted mt-3 text-center text-[0.76rem] leading-[1.5]">
        {copy.applyPage.formNote}
      </p>
    </form>
  )
}

// --- helpers (form-specific, not shared primitives) ---

const inputClasses =
  'w-full rounded-[var(--radius)] border border-border bg-bg px-3.5 py-3 text-[0.95rem] leading-[1.4] text-text appearance-none transition-colors placeholder:text-[#444] focus:border-accent focus:outline-none'

function Field({
  id,
  label,
  children,
}: {
  id: string
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-muted mb-1.5 block text-[0.76rem] uppercase tracking-[0.12em]"
      >
        {label}
      </label>
      {children}
    </div>
  )
}
