import type { SponsorAllocation, TicketSection, TicketStatus } from '../types'

interface SponsorRowProps {
  section: TicketSection
  sponsor: SponsorAllocation
  metricStatus: TicketStatus
  onOpenDetails: (sectionId: string, sponsorId: string, matchId: string) => void
}

export function SponsorRow({
  section,
  sponsor,
  metricStatus,
  onOpenDetails,
}: SponsorRowProps) {
  return (
    <>
      <div className="hidden px-8 lg:block">
        <div className="grid grid-cols-[minmax(220px,1.4fr)_110px_repeat(3,minmax(140px,1fr))_40px] items-center gap-4 border-t border-[var(--color-line)] py-4">
          <div className="flex items-center gap-4">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold text-white shadow-[0_10px_24px_rgba(87,54,243,0.22)]"
              style={{ backgroundColor: sponsor.sponsor.accent }}
            >
              {sponsor.sponsor.badge}
            </div>
            <div>
              <div className="font-medium text-[var(--color-ink)]">
                {sponsor.sponsor.name}
              </div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                {sponsor.sponsor.tier}
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="font-serif text-[2rem] leading-none text-[var(--color-gold)]">
              {sponsor.seasonTotal}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
              Tickets
            </div>
          </div>

          {sponsor.matchdays.map((matchday) => (
            <button
              key={matchday.matchId}
              type="button"
              className="flex flex-col items-center justify-center rounded-2xl border border-transparent px-3 py-3 text-center transition hover:border-[var(--color-line-strong)] hover:bg-white"
              aria-label={`${sponsor.sponsor.name} ${matchday.opponent} details`}
              onClick={() =>
                onOpenDetails(section.id, sponsor.sponsor.id, matchday.matchId)
              }
            >
              <div className="font-serif text-[1.9rem] leading-none text-[var(--color-ink-soft)]">
                {matchday[metricStatus]}
              </div>
              <div className="mt-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: getMetricColor(metricStatus) }}
                />
                {getMetricLabel(metricStatus)}
              </div>
            </button>
          ))}

          <button
            type="button"
            className="text-xl leading-none text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
            onClick={() =>
              onOpenDetails(
                section.id,
                sponsor.sponsor.id,
                sponsor.matchdays[0]?.matchId ?? '',
              )
            }
            aria-label={`Open ${sponsor.sponsor.name} details`}
          >
            …
          </button>
        </div>
      </div>

      <div className="px-8 lg:hidden">
        <div className="space-y-4 border-t border-[var(--color-line)] py-5">
          <div className="flex items-center gap-4">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: sponsor.sponsor.accent }}
            >
              {sponsor.sponsor.badge}
            </div>
            <div className="flex-1">
              <div className="font-medium text-[var(--color-ink)]">
                {sponsor.sponsor.name}
              </div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                {sponsor.sponsor.tier}
              </div>
            </div>
            <div className="text-right">
              <div className="font-serif text-3xl text-[var(--color-gold)]">
                {sponsor.seasonTotal}
              </div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Season
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {sponsor.matchdays.map((matchday) => (
              <button
                key={matchday.matchId}
                type="button"
                className="rounded-2xl border border-[var(--color-line)] bg-white px-4 py-4 text-left"
                aria-label={`${sponsor.sponsor.name} ${matchday.opponent} details`}
                onClick={() =>
                  onOpenDetails(
                    section.id,
                    sponsor.sponsor.id,
                    matchday.matchId,
                  )
                }
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-[var(--color-ink)]">
                      {matchday.opponent}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                      {matchday.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-3xl text-[var(--color-ink-soft)]">
                      {matchday[metricStatus]}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                      {getMetricLabel(metricStatus)}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function getMetricLabel(metricStatus: TicketStatus) {
  if (metricStatus === 'distributed') {
    return 'Distributed'
  }

  if (metricStatus === 'allocated') {
    return 'Allocated'
  }

  return 'Pending'
}

function getMetricColor(metricStatus: TicketStatus) {
  if (metricStatus === 'distributed') {
    return 'var(--color-olive)'
  }

  if (metricStatus === 'allocated') {
    return 'var(--color-gold)'
  }

  return 'var(--color-stone)'
}
