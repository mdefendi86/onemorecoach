# Forms & email — application form

The site has **one** form (the coaching application at [/apply](../src/app/apply/page.tsx)). It submits to a Server Action that validates input with Zod, runs a per-IP rate limit + a hidden honeypot check, then sends the application body to Josh via [Resend](https://resend.com/).

Behavior is defined in [REBUILD_PLAN.md §9](../Rebuild%20Plan/REBUILD_PLAN.md#9-forms-plan). This file is the operational guide for setup and troubleshooting.

---

## Code map

| File | Role |
|---|---|
| [`src/components/ApplicationForm.tsx`](../src/components/ApplicationForm.tsx) | Client component. Reads `?program=&term=` URL params, prefills selects, dispatches the Server Action via `useActionState`, renders inline success / error UI, fires `application_submit` analytics on success. |
| [`src/app/apply/actions.ts`](../src/app/apply/actions.ts) | Server Action. Honeypot → Zod → rate-limit → env check → Resend send. Returns a discriminated-union result. |
| [`src/lib/env.ts`](../src/lib/env.ts) | Typed access to `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Defaults `to`/`from` from `business.ts`. |
| [`src/lib/rate-limit.ts`](../src/lib/rate-limit.ts) | In-memory per-IP rate limit, 5 submissions / hour. |
| [`src/lib/email-template.ts`](../src/lib/email-template.ts) | Text + HTML email bodies and the subject string. |

---

## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** for Production (and any Preview environments you want to receive real email from). For local development, put them in `.env.local` (git-ignored).

| Variable | Required | Default if unset | What happens if unset |
|---|---|---|---|
| `RESEND_API_KEY` | **Yes (production)** | — | Server Action returns `{ status: 'error', code: 'misconfigured' }`. User sees: *"The application form is temporarily unavailable. Please email Josh directly…"* |
| `CONTACT_TO_EMAIL` | No | `business.email` (`josh@onemorecoach.com`) | Send proceeds to the default. |
| `CONTACT_FROM_EMAIL` | No | `no-reply@<canonical-domain>` derived from `business.canonicalUrl` | Send proceeds — but Resend will **reject** if this domain isn't verified in the Resend dashboard. |

The exact `to`/`from` resolution lives in [`src/lib/env.ts`](../src/lib/env.ts) — update there if the defaults ever need to change.

---

## Resend setup — one-time

These are the steps Josh (or whoever owns the Resend account) takes once before the form can actually send mail.

### 1. Create the Resend account + API key

1. Go to <https://resend.com/> and sign up.
2. Resend → **API Keys** → **Create API Key**.
3. Scope: "Sending access" (not full). Name it `onemorecoach-production`.
4. Copy the key — you can only see it once.

### 2. Verify the sending domain

The `from` address must use a domain Josh controls (e.g. `no-reply@onemorecoach.com`). Resend won't deliver mail otherwise.

1. Resend → **Domains** → **Add Domain**.
2. Enter `onemorecoach.com` (the production canonical).
3. Resend gives you DNS records to add at your registrar:
   - **SPF**: a `TXT` record at the apex (`onemorecoach.com`).
   - **DKIM**: a `TXT` record at a Resend-provided subdomain.
   - **MX** (optional but recommended for return-path).
4. Add the records at your registrar / DNS provider.
5. Back in Resend, click **Verify**. DNS propagation can take 15 minutes to a few hours.
6. When the dashboard shows **Verified**, the domain is good.

### 3. Set env vars in Vercel

1. Vercel → Project → **Settings** → **Environment Variables**.
2. Add:
   - `RESEND_API_KEY` = the key from step 1, scoped to **Production** (and **Preview** if you want preview deploys to actually send).
   - `CONTACT_TO_EMAIL` = `josh@onemorecoach.com` (or whatever inbox should receive applications — could also be a Google Workspace group like `applications@onemorecoach.com`).
   - `CONTACT_FROM_EMAIL` = `no-reply@onemorecoach.com` (must match the verified domain).
3. **Redeploy** — env var changes are picked up on the next deploy, not live.

### 4. Local development

Add the same vars to `.env.local` (already in `.gitignore`). Most local dev sessions don't need to actually send — leaving `RESEND_API_KEY` unset locally is fine; the form will surface the "misconfigured" error path, which is useful for testing that branch.

---

## Spam protection

Two layers, both implemented in [`actions.ts`](../src/app/apply/actions.ts):

1. **Honeypot field.** The form includes a hidden `<input name="company">` that real users never see or fill. Bots auto-fill every field they see; when this field is non-empty, the Server Action returns a **fake success** (the same UX a human would get), so the bot has no signal that the trap fired. This is the primary defense.
2. **Per-IP rate limit.** [`rate-limit.ts`](../src/lib/rate-limit.ts) tracks submission timestamps per IP in memory and rejects anything over 5 submissions per hour with `{ code: 'rate-limited' }`. **Caveat:** the limiter is in-memory and resets on serverless cold starts — it's best-effort, not a security boundary. If volume grows or persistent abuse appears, swap in Vercel KV (v2 work).

No CAPTCHA in v1.

---

## End-to-end testing

### Local

```bash
# 1. Set RESEND_API_KEY in .env.local (use a Resend test key first if you want).
pnpm.cmd dev

# 2. Open http://localhost:3000/apply
# 3. Fill out the form, submit.
# 4. Confirm the success card renders.
# 5. Check Josh's inbox for the application email.
```

### Preview (Vercel)

1. Push a branch.
2. Vercel creates a preview deployment.
3. Visit `<preview-url>/apply` and submit the form.
4. Confirm receipt in the inbox associated with `CONTACT_TO_EMAIL`.

### Production smoke test (after DNS cutover)

1. Submit a real-looking application from `<https://onemorecoach.com>/apply`.
2. Confirm the success card renders.
3. Confirm the email arrives.
4. Reply from the inbox — the `reply-to` header is the applicant's email, so the reply goes directly to them.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| User sees *"temporarily unavailable"* (`misconfigured`) | `RESEND_API_KEY` not set in current environment | Set it in Vercel (or `.env.local`); redeploy. |
| User sees *"something went wrong sending"* (`send-failed`) | Resend returned an error or threw | Check Vercel function logs for `[apply] Resend …` lines. Most common cause: `from` domain not verified, or the API key is for a different environment. |
| User sees *"too many submissions"* (`rate-limited`) | They actually submitted 5+ times in the last hour | Expected. If a legit user hits this in normal use, the cap is probably too low — adjust `MAX_PER_WINDOW` in `lib/rate-limit.ts`. |
| User sees *"please double-check the required fields"* (`validation`) | Required field empty or invalid email | Expected. Browser usually catches this first via `required`/`type="email"`; the Server Action validation is the second line. |
| Email never arrives but Resend dashboard shows it sent | Inbox spam folder, or domain reputation issue | Check spam. Verify SPF + DKIM. Add a DMARC record (`v=DMARC1; p=none; rua=mailto:…`). |
| `reply-to` is wrong | Bug — should be `data.email` | Check `replyTo` is passed in `resend.emails.send(…)` call in `actions.ts`. |

---

## Future work (not in v1)

These are tracked here so they don't get lost; none block launch.

- **Vercel KV-backed rate limit** — durable across cold starts and instances.
- **Per-field inline validation errors** — currently all validation errors collapse to one banner; a richer state shape would surface "email is invalid" next to the email field.
- **Optimistic success state** — show the success card immediately on submit click, with a quiet recovery if the action errors. Not worth the complexity for a low-volume form.
- **CRM forwarding** — POST a copy of each application to a CRM (HubSpot, Notion, Sheets) so Josh has a structured pipeline beyond his inbox.
