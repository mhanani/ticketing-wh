import type {
  SponsorAllocation,
  TicketSection,
  TicketStatus,
} from '@/shared/ticketing/types'

export type TicketingColumnKey =
  | 'seasonTotal'
  | 'progress'
  | 'matchdays'

interface SponsorTableRowProps {
  section: TicketSection
  sponsor: SponsorAllocation
  metricStatus: TicketStatus
  visibleColumns: TicketingColumnKey[]
  desktopGridTemplate: string
  onOpenDetails: (sectionId: string, sponsorId: string, matchId: string) => void
}

export function SponsorTableRow({
  section,
  sponsor,
  metricStatus,
  visibleColumns,
  desktopGridTemplate,
  onOpenDetails,
}: SponsorTableRowProps) {
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
      <div
        className="hidden lg:grid lg:items-center lg:gap-4 lg:px-4 lg:py-3"
        style={{ gridTemplateColumns: desktopGridTemplate }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold text-white"
            style={{ backgroundColor: sponsor.sponsor.accent }}
          >
            {sponsor.sponsor.badge}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-[var(--wehave-v2-ink)]">
              {sponsor.sponsor.name}
            </div>
            <div className="mt-0.5 text-[11px] text-[var(--wehave-v2-muted)]">
              {sponsor.sponsor.tier}
            </div>
          </div>
        </div>

        {visibleColumns.includes('seasonTotal') ? (
          <div className="flex h-full items-center justify-center text-center text-sm font-medium text-[var(--wehave-v2-ink)]">
            {sponsor.seasonTotal}
          </div>
        ) : null}

        {visibleColumns.includes('progress') ? (
          <div className="flex h-full items-center justify-center">
            <div className="w-full max-w-[220px]">
              <div className="flex items-center justify-between gap-2 text-[11px] text-[var(--wehave-v2-muted)]">
                <span className="text-[#826AF6]">{progressValue} done</span>
                <span>{sponsor.seasonTotal - progressValue} left</span>
              </div>
              <div className="mt-1.5 min-w-0 flex-1">
                <div className="h-1 overflow-hidden rounded-full bg-[var(--wehave-v2-surface-muted)]">
                  <div
                    className="h-full rounded-full bg-[var(--wehave-v2-ring)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {visibleColumns.includes('matchdays') ? (
          <div className="grid items-center grid-cols-3 gap-2 justify-self-stretch">
            {sponsor.matchdays.map((matchday) => (
              <button
                key={matchday.matchId}
                type="button"
                onClick={() =>
                  onOpenDetails(section.id, sponsor.sponsor.id, matchday.matchId)
                }
                aria-label={`${sponsor.sponsor.name} ${matchday.opponent} details`}
                className="rounded-md border border-[var(--wehave-v2-border)] bg-[var(--wehave-v2-surface-soft)] px-2.5 py-2 text-left transition hover:border-[var(--wehave-v2-primary-border)] hover:bg-white"
              >
                <div className="truncate text-[11px] font-medium text-[var(--wehave-v2-ink-soft)]">
                  {matchday.date}
                </div>
                <div className="mt-1 truncate text-[13px] font-medium text-[var(--wehave-v2-ink)]">
                  {matchday.opponent}
                </div>
                <div className="mt-2 inline-flex rounded-md border border-[var(--wehave-v2-primary-border)] bg-[var(--wehave-v2-primary-soft)] px-2 py-0.5 text-xs font-medium text-[var(--wehave-v2-primary-text)]">
                  {matchday[metricStatus]}
                </div>
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex h-full items-center justify-center">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--wehave-v2-border)] text-[var(--wehave-v2-muted)] transition hover:border-[var(--wehave-v2-primary-border)] hover:text-[var(--wehave-v2-primary)]"
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

      <div className="px-4 py-4 lg:hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold text-white"
              style={{ backgroundColor: sponsor.sponsor.accent }}
            >
              {sponsor.sponsor.badge}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-[var(--wehave-v2-ink)]">
                {sponsor.sponsor.name}
              </div>
              <div className="mt-0.5 text-[11px] text-[var(--wehave-v2-muted)]">
                {section.label}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-[var(--wehave-v2-ink)]">
              {sponsor.seasonTotal}
            </div>
            <div className="text-[11px] text-[var(--wehave-v2-muted)]">season</div>
          </div>
        </div>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-[var(--wehave-v2-surface-muted)]">
          <div
            className="h-full rounded-full bg-[var(--wehave-v2-ring)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="mt-3 grid gap-2">
          {sponsor.matchdays.map((matchday) => (
            <button
              key={matchday.matchId}
              type="button"
              onClick={() =>
                onOpenDetails(section.id, sponsor.sponsor.id, matchday.matchId)
              }
              aria-label={`${sponsor.sponsor.name} ${matchday.opponent} details`}
              className="rounded-md border border-[var(--wehave-v2-border)] bg-[var(--wehave-v2-surface-soft)] px-3 py-3 text-left"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-medium text-[var(--wehave-v2-ink)]">
                    {matchday.opponent}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[var(--wehave-v2-muted)]">
                    {matchday.date}
                  </div>
                </div>
                <div className="rounded-md border border-[var(--wehave-v2-primary-border)] bg-[var(--wehave-v2-primary-soft)] px-2 py-1 text-xs font-medium text-[var(--wehave-v2-primary-text)]">
                  {matchday[metricStatus]}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  )
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
