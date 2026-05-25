'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { headerNav } from '@/data/nav'
import { business } from '@/data/business'
import { Container } from '@/components/ui/Container'

/*
  SiteNav — sticky header with center logo + hamburger.
  REBUILD_PLAN.md §8.

  Phase 1 notes:
  - Logo is text-only ("ONE MORE COACH" in Bebas Neue). The optimized
    SVG/WebP logo from images/logo.png is exported in Phase 4 — at that
    point swap the <span> for next/image.
  - Active-state via usePathname() + aria-current="page".
  - Hamburger toggle uses Lucide Menu/X icons.
  - Mobile menu closes on link click and on Escape (no route-change
    effect — that pattern violates React 19's set-state-in-effect rule).
*/
export function SiteNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  // Close on Escape — subscribing to an external (window) event source
  // is a legitimate effect use.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false // same-page anchors never highlight
    return pathname === href
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
      <Container className="relative flex h-[84px] items-center justify-start md:justify-end">
        {/* Mobile hamburger (left) */}
        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          onClick={() => setIsOpen((v) => !v)}
          className="text-text relative z-50 inline-flex h-9 w-9 items-center justify-center md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Center logo — text-only until Phase 4 */}
        <Link
          href="/"
          aria-label={`${business.name} — Home`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:mr-auto md:flex md:items-center"
        >
          <span className="font-display text-accent text-lg tracking-[0.06em] uppercase md:text-xl">
            {business.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          id="primary-nav-desktop"
          aria-label="Main navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {headerNav.map((link) =>
            link.isApplyCta ? (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className="bg-accent rounded-[var(--radius)] px-[18px] py-2 font-display text-sm tracking-[0.05em] text-[color:var(--color-bg)] transition-opacity hover:opacity-90"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`text-sm transition-colors hover:text-accent ${
                  isActive(link.href) ? 'text-accent' : 'text-text'
                }`}
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </Container>

      {/* Mobile menu — fixed dropdown */}
      {isOpen ? (
        <nav
          id="primary-nav"
          aria-label="Main navigation"
          className="fixed inset-x-0 top-[84px] z-40 border-b border-border bg-bg p-6 md:hidden"
        >
          <ul className="flex flex-col gap-5">
            {headerNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={
                    link.isApplyCta
                      ? 'bg-accent inline-block self-start rounded-[var(--radius)] px-[22px] py-2.5 font-display text-base tracking-[0.05em] text-[color:var(--color-bg)]'
                      : `block text-base hover:text-accent ${isActive(link.href) ? 'text-accent' : 'text-text'}`
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
