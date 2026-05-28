import Link from 'next/link'
import { MapPin, Clock, Handshake, Salad } from 'lucide-react'
import type { Program } from '@/types/content'
import { business } from '@/data/business'

/*
  Home page in-person card — wider layout with a bullets sidebar.

  Location/availability copy is built only from values that actually
  exist in business.inPersonVenue. Per the standing rule, no city,
  gym, or address is invented here.
*/

interface InPersonOverviewCardProps {
  program: Program
}

export function InPersonOverviewCard({ program }: InPersonOverviewCardProps) {
  const venue = business.inPersonVenue
  const locationLine = venue ? `${venue.gymName} — ${venue.city}, ${venue.state}` : null

  return (
    <div className="rounded-[var(--radius)] border border-border bg-bg-card p-6 md:p-7">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
        {/* Main */}
        <div className="md:flex-[1.3]">
          <span className="font-display text-accent inline-block rounded bg-accent/10 px-2.5 py-[3px] text-[0.7rem] tracking-[0.14em]">
            In-Person
          </span>
          <h3 className="font-display mt-3 text-[1.6rem]">{program.name}</h3>
          <p className="text-muted mt-2 text-[0.9rem] leading-[1.6]">{program.tagline}</p>
          <div className="font-display text-accent mt-4 text-[1.5rem]">
            <span className="text-muted text-[1rem]">Contact for pricing</span>
          </div>
          <Link
            href="/in-person"
            className="text-accent mt-4 inline-block text-[0.88rem] underline underline-offset-[3px] transition-opacity hover:opacity-75"
          >
            See full program →
          </Link>
        </div>

        {/* Bullets */}
        <ul className="space-y-0 md:flex-1">
          {locationLine ? (
            <li className="flex items-center gap-2.5 border-b border-border py-2.5 text-[0.85rem] text-muted">
              <MapPin size={16} aria-hidden="true" className="shrink-0" />
              <span>{locationLine}</span>
            </li>
          ) : null}
          <li className="flex items-center gap-2.5 border-b border-border py-2.5 text-[0.85rem] text-muted">
            <Clock size={16} aria-hidden="true" className="shrink-0" />
            <span>60-minute 1-on-1 sessions</span>
          </li>
          <li className="flex items-center gap-2.5 border-b border-border py-2.5 text-[0.85rem] text-muted">
            <Handshake size={16} aria-hidden="true" className="shrink-0" />
            <span>Hands-on form coaching every rep</span>
          </li>
          <li className="flex items-center gap-2.5 py-2.5 text-[0.85rem] text-muted">
            <Salad size={16} aria-hidden="true" className="shrink-0" />
            <span>Nutrition & supplement add-ons available</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
