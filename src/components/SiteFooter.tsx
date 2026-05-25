import Link from 'next/link'
import { business } from '@/data/business'
import { footerNav } from '@/data/nav'
import { EmailLink } from '@/components/EmailLink'
import { InstagramLink } from '@/components/InstagramLink'

/*
  SiteFooter — server component, reads from nav.ts + business.ts.
  REBUILD_PLAN.md §8.

  Page links come from footerNav; social/email links from business.ts
  via the dedicated interaction wrappers (instagram_click + email_click
  events fire from there).
*/
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-[#0a0a0a] px-5 py-7 text-center md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-accent font-display mb-3 text-lg tracking-[0.05em]">
          {business.name}
        </div>

        <nav
          aria-label="Footer navigation"
          className="mb-3.5 flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {footerNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted text-[0.83rem] transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <InstagramLink
            location="footer"
            className="text-muted text-[0.83rem] transition-colors hover:text-accent"
          />
          <EmailLink
            location="footer"
            className="text-muted text-[0.83rem] transition-colors hover:text-accent"
          />
        </nav>

        <p className="text-[#555] text-xs">
          &copy; {year} {business.name} &nbsp;|&nbsp; {business.canonicalUrl.replace(/^https?:\/\//, '')} &nbsp;|&nbsp;{' '}
          {business.socials.instagram}
        </p>
      </div>
    </footer>
  )
}
