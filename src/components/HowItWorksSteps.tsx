import { howItWorks } from '@/data/howItWorks'
import { copy } from '@/data/copy'

/*
  Apply page "What Happens Next" — 4-step sequence.
  Vertical list with Bebas Neue numerals on the left.
*/
export function HowItWorksSteps() {
  return (
    <div>
      <h3 className="font-display text-[1.5rem]">{copy.applyPage.whatHappensNextTitle}</h3>
      <div className="mt-4 flex flex-col gap-3">
        {howItWorks.map((step) => (
          <div key={step.number} className="flex items-start gap-3.5">
            <span className="font-display text-accent text-[1.4rem] leading-none shrink-0">
              {step.number}
            </span>
            <div>
              <p className="text-[0.88rem] font-semibold text-text">{step.title}</p>
              <p className="text-muted mt-1 text-[0.82rem] leading-[1.5]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
