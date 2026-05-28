import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Mail, Clock, Globe } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHead } from '@/components/ui/SectionHead'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import { EmailLink } from '@/components/EmailLink'
import { InstagramLink } from '@/components/InstagramLink'
import { HowItWorksSteps } from '@/components/HowItWorksSteps'
import { ApplicationForm } from '@/components/ApplicationForm'
import { InstagramCtaSection } from '@/components/InstagramCtaSection'
import { business } from '@/data/business'
import { copy } from '@/data/copy'

export const metadata: Metadata = {
  title: 'Apply for Coaching',
  description:
    'Fill out the form below. Josh reviews every application personally and will reach out within 24 hours.',
}

/*
  Apply page.

  Phase 2: full page layout + ApplicationForm shell with URL-prefill.
  The form's submit handler is a no-op (see ApplicationForm.tsx for
  details on what Phase 3 will add).

  ApplicationForm uses useSearchParams() which requires a Suspense
  boundary to avoid forcing the whole page into client rendering.
*/
export default function ApplyPage() {
  const displayDomain = business.canonicalUrl.replace(/^https?:\/\//, '')

  return (
    <>
      <section className="px-5 pt-16 pb-10 text-center md:px-10 md:pt-20 md:pb-12">
        <Container>
          <SectionHead
            as={1}
            tag={copy.applyPage.eyebrow}
            title={copy.applyPage.title}
            sub={copy.applyPage.sub}
          />
        </Container>
      </section>

      <section className="px-5 py-10 md:px-10 md:py-12">
        <Container>
          <div className="mx-auto grid max-w-[860px] grid-cols-1 gap-10 md:grid-cols-[1fr_1.6fr]">
            {/* Left column — info + how it works */}
            <div>
              <h2 className="font-display text-[1.8rem]">{copy.applyPage.beforeYouApplyTitle}</h2>

              <div className="mt-5 flex items-start gap-3.5">
                <Clock size={20} aria-hidden="true" className="text-text shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-muted text-[0.8rem] uppercase tracking-[0.1em]">
                    {copy.applyPage.responseTimeLabel}
                  </h4>
                  <p className="mt-1 text-[0.93rem] leading-[1.5] text-text">
                    {copy.applyPage.responseTimeNote}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3.5">
                <Mail size={20} aria-hidden="true" className="text-text shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-muted text-[0.8rem] uppercase tracking-[0.1em]">Email</h4>
                  <p className="mt-1 text-[0.93rem] leading-[1.5]">
                    <EmailLink location="apply_info" className="hover:text-accent text-text" />
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3.5">
                <InstagramIcon size={20} className="text-text shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-muted text-[0.8rem] uppercase tracking-[0.1em]">
                    Instagram
                  </h4>
                  <p className="mt-1 text-[0.93rem] leading-[1.5]">
                    <InstagramLink location="apply_info" className="hover:text-accent text-text" />
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3.5">
                <Globe size={20} aria-hidden="true" className="text-text shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-muted text-[0.8rem] uppercase tracking-[0.1em]">Website</h4>
                  <p className="mt-1 text-[0.93rem] leading-[1.5] text-text">{displayDomain}</p>
                </div>
              </div>

              <div className="text-accent mt-7 rounded-[var(--radius)] border border-accent/25 bg-accent/[0.07] px-4.5 py-4">
                <p className="text-[0.84rem] leading-[1.6]">{copy.applyPage.responseBoxText}</p>
              </div>

              <div className="mt-8">
                <HowItWorksSteps />
              </div>
            </div>

            {/* Right column — the form */}
            <Suspense
              fallback={
                <div className="rounded-[var(--radius)] border border-border bg-bg-card px-6 py-7 text-muted">
                  Loading form…
                </div>
              }
            >
              <ApplicationForm />
            </Suspense>
          </div>
        </Container>
      </section>

      <InstagramCtaSection location="apply" />
    </>
  )
}
