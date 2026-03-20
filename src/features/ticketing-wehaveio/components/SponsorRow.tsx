import type {
  SponsorAllocation,
  TicketSection,
  TicketStatus,
} from '@/shared/ticketing/types'

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
  const totalDistributed = sponsor.matchdays.reduce(
    (sum, matchday) => sum + matchday.distributed,
    0,
  )
  const totalAllocated = sponsor.matchdays.reduce(
    (sum, matchday) => sum + matchday.allocated,
    0,
  )
  const totalPending = sponsor.matchdays.reduce(
    (sum, matchday) => sum + matchday.pending,
    0,
  )
  const progressValue =
    metricStatus === 'distributed'
      ? totalDistributed
      : metricStatus === 'allocated'
        ? totalAllocated
        : totalPending
  const progressPercent = Math.min(
    100,
    Math.round((progressValue / Math.max(sponsor.seasonTotal, 1)) * 100),
  )

  return (
    <>
      <div className="hidden lg:block">
        <div className="grid grid-cols-[minmax(280px,1.45fr)_112px_220px_minmax(320px,1.2fr)_56px] items-center gap-4 border-b border-[var(--wehave-line)] px-5 py-4 last:border-b-0">
          <div className="flex items-center gap-4">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-[12px] text-sm font-semibold text-white shadow-[0_12px_24px_rgba(87,54,243,0.18)]"
              style={{ backgroundColor: sponsor.sponsor.accent }}
            >
              {sponsor.sponsor.badge}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-[var(--wehave-ink)]">
                {sponsor.sponsor.name}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--wehave-muted)]">
                {sponsor.sponsor.tier}
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-semibold tracking-[-0.04em] text-[var(--wehave-ink)]">
              {sponsor.seasonTotal}
            </div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--wehave-muted)]">
              tickets
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-medium text-[var(--wehave-soft)]">
              <span>{getMetricLabel(metricStatus)}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--wehave-primary-soft)]">
              <div
                className="h-full rounded-full bg-[var(--wehave-primary)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 text-[11px] text-[var(--wehave-muted)]">
              {progressValue} of {sponsor.seasonTotal} tickets
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {sponsor.matchdays.map((matchday) => (
              <button
                key={matchday.matchId}
                type="button"
                onClick={() =>
                  onOpenDetails(section.id, sponsor.sponsor.id, matchday.matchId)
                }
                className="rounded-[10px] border border-[var(--wehave-line)] bg-[var(--wehave-surface-alt)] px-3 py-3 text-left transition hover:border-[var(--wehave-primary-tint)] hover:bg-white"
                aria-label={`${sponsor.sponsor.name} ${matchday.opponent} details`}
              >
                <div className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--wehave-muted)]">
                  {matchday.date}
                </div>
                <div className="mt-2 truncate text-sm font-semibold text-[var(--wehave-ink)]">
                  {matchday.opponent}
                </div>
                <div className="mt-3 text-lg font-semibold tracking-[-0.03em] text-[var(--wehave-primary)]">
                  {matchday[metricStatus]}
                </div>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--wehave-line)] text-[var(--wehave-soft)] transition hover:border-[var(--wehave-primary-tint)] hover:text-[var(--wehave-primary)]"
            onClick={() =>
              onOpenDetails(
                section.id,
                sponsor.sponsor.id,
                sponsor.matchdays[0]?.matchId ?? '',
              )
            }
            aria-label={`Open ${sponsor.sponsor.name} details`}
          >
            <MoreIcon />
          </button>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="border-t border-[var(--wehave-line)] px-4 py-4 first:border-t-0">
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-sm font-semibold text-white"
              style={{ backgroundColor: sponsor.sponsor.accent }}
            >
              {sponsor.sponsor.badge}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-[var(--wehave-ink)]">
                {sponsor.sponsor.name}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--wehave-muted)]">
                {sponsor.sponsor.tier}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold tracking-[-0.04em] text-[var(--wehave-ink)]">
                {sponsor.seasonTotal}
              </div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--wehave-muted)]">
                season
              </div>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--wehave-primary-soft)]">
            <div
              className="h-full rounded-full bg-[var(--wehave-primary)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-2 text-[11px] text-[var(--wehave-muted)]">
            {progressValue} of {sponsor.seasonTotal} tickets
          </div>

          <div className="mt-4 grid gap-3">
            {sponsor.matchdays.map((matchday) => (
              <button
                key={matchday.matchId}
                type="button"
                className="rounded-[12px] border border-[var(--wehave-line)] bg-[var(--wehave-surface-alt)] px-4 py-4 text-left"
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
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-[var(--wehave-ink)]">
                      {matchday.opponent}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[var(--wehave-muted)]">
                      {matchday.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold tracking-[-0.03em] text-[var(--wehave-primary)]">
                      {matchday[metricStatus]}
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

function MoreIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="4" cy="10" r="1.5" fill="currentColor" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      <circle cx="16" cy="10" r="1.5" fill="currentColor" />
    </svg>
  )
}
