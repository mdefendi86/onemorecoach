/*
  Analytics helper — Phase 1 no-op shim.

  REBUILD_PLAN.md §11: GA4 is wired in Phase 5. The interaction wrappers
  (EmailLink, InstagramLink, ApplyCtaLink, PricingTier, ApplicationForm)
  already call trackEvent() during Phase 1 so the instrumentation points
  exist before the gtag script ships.

  Behavior:
    - Server: no-op
    - Client without NEXT_PUBLIC_GA_MEASUREMENT_ID: no-op
    - Client with GA loaded: forwards to window.gtag (Phase 5+)
    - Any error inside gtag: swallowed — analytics must never block
      a user action or throw into a click handler.

  This file's API is stable. Phase 5 will add the gtag dispatch path
  inside trackEvent without changing any caller.
*/

type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: EventParams) => void
  }
}

export function trackEvent(name: string, params?: EventParams): void {
  if (typeof window === 'undefined') return
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return
  if (typeof window.gtag !== 'function') return
  try {
    window.gtag('event', name, params)
  } catch {
    // Silent fail — analytics must never break user actions.
  }
}
