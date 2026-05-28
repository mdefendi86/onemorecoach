import { business } from '@/data/business'

/*
  Email template for the application form submission email Josh receives.

  Renders the same payload in two formats — text + HTML — so the email
  works in any mail client. Field labels match what the visitor saw on
  the form so Josh's email reads naturally.

  HTML is intentionally minimal: no remote images, no external CSS,
  no inline tracking pixels. Resend handles the rest.
*/

export interface ApplicationPayload {
  name: string
  email: string
  phone?: string
  goal: string
  program?: string
  term?: string
  about?: string
  heard_from?: string
}

const GOAL_LABELS: Record<string, string> = {
  'weight-loss': 'Weight Loss',
  'build-muscle': 'Build Muscle',
  hybrid: 'Hybrid / Performance',
  'not-sure': 'Not Sure Yet',
}

const PROGRAM_LABELS: Record<string, string> = {
  lifestyle: 'Lifestyle (Training + Nutrition)',
  nutrition: 'Nutrition & Supplementation',
  training: 'Training Guidance',
  'in-person': 'In-Person Training',
  'not-sure': 'Not sure — needs help deciding',
}

const TERM_LABELS: Record<string, string> = {
  monthly: 'Month-to-Month',
  '3month': '3 Months',
  '6month': '6 Months',
  '12month': '12 Months',
  'not-sure': 'Not sure yet',
}

function label(map: Record<string, string>, value: string | undefined): string {
  if (!value) return '—'
  return map[value] ?? value
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function buildEmailSubject(payload: ApplicationPayload): string {
  return `New coaching application — ${payload.name}`
}

export function buildEmailText(payload: ApplicationPayload): string {
  return [
    `New ${business.name} application`,
    '',
    `Name:        ${payload.name}`,
    `Email:       ${payload.email}`,
    `Phone:       ${payload.phone || '—'}`,
    `Goal:        ${label(GOAL_LABELS, payload.goal)}`,
    `Program:     ${label(PROGRAM_LABELS, payload.program)}`,
    `Commitment:  ${label(TERM_LABELS, payload.term)}`,
    `Heard from:  ${payload.heard_from || '—'}`,
    '',
    'About:',
    payload.about || '—',
  ].join('\n')
}

export function buildEmailHtml(payload: ApplicationPayload): string {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#888;font-size:13px;vertical-align:top;">${k}</td><td style="padding:4px 0;font-size:14px;">${escapeHtml(v)}</td></tr>`
  return `<!doctype html>
<html><body style="font-family:-apple-system,system-ui,sans-serif;color:#111;line-height:1.5;">
  <h2 style="margin:0 0 16px;">New ${escapeHtml(business.name)} application</h2>
  <table>
    ${row('Name', payload.name)}
    ${row('Email', payload.email)}
    ${row('Phone', payload.phone || '—')}
    ${row('Goal', label(GOAL_LABELS, payload.goal))}
    ${row('Program', label(PROGRAM_LABELS, payload.program))}
    ${row('Commitment', label(TERM_LABELS, payload.term))}
    ${row('Heard from', payload.heard_from || '—')}
  </table>
  <h3 style="margin:20px 0 6px;font-size:14px;color:#888;text-transform:uppercase;letter-spacing:0.08em;">About</h3>
  <p style="margin:0;white-space:pre-wrap;font-size:14px;">${escapeHtml(payload.about || '—')}</p>
</body></html>`
}
