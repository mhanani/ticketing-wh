import { Badge } from '@/components/ui/badge'
import type {
  SponsorAllocation,
  TicketSection,
  TicketStatus,
} from '@/shared/ticketing/types'

const statusTextColor: Record<TicketStatus, string> = {
  distributed: 'text-[#6132fd]',
  allocated: 'text-[#0e7490]',
  pending: 'text-[#52525b]',
}

const statusBarColor: Record<TicketStatus, string> = {
  distributed: 'bg-gradient-to-r from-[#6132fd]/40 to-[#6132fd]/60',
  allocated: 'bg-gradient-to-r from-[#0e7490]/40 to-[#0e7490]/60',
  pending: '',
}

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
        className="hidden transition-colors duration-200 hover:bg-[#fafafc]/60 lg:grid lg:items-center lg:gap-4 lg:px-4 lg:py-3"
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
            <div className="truncate text-sm font-medium text-foreground">
              {sponsor.sponsor.name}
            </div>
            <div className="mt-0.5 text-[11px] text-muted-foreground">
              {sponsor.sponsor.tier}
            </div>
          </div>
        </div>

        {visibleColumns.includes('seasonTotal') ? (
          <div className="flex h-full items-center justify-center text-center text-sm font-medium text-foreground">
            {sponsor.seasonTotal}
          </div>
        ) : null}

        {visibleColumns.includes('progress') ? (
          <div className="flex h-full items-center justify-center">
            <div className="w-full max-w-[220px]">
              <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                <span className={statusTextColor[metricStatus]}>{progressValue} {metricStatus}</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="mt-1.5 min-w-0 flex-1">
                <div className="relative h-1.5 overflow-hidden rounded-full bg-secondary">
                  {metricStatus === 'pending' ? (
                    <div
                      className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${progressPercent}%`,
                        backgroundImage: 'repeating-linear-gradient(90deg, #71717a 0px, #71717a 4px, transparent 4px, transparent 8px)',
                        opacity: 0.45,
                      }}
                    />
                  ) : (
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${statusBarColor[metricStatus]}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  )}
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
                className="rounded-lg border border-border/60 bg-gradient-to-br from-[#fafafc] to-white px-2.5 py-2 text-left shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-primary/25 hover:shadow-[0_2px_8px_rgba(87,54,243,0.07)]"
              >
                <div className="truncate text-[11px] font-medium text-muted-foreground">
                  {matchday.date}
                </div>
                <div className="mt-1 truncate text-[13px] font-medium text-foreground">
                  {matchday.opponent}
                </div>
                <Badge variant="primary-soft" className="mt-2">
                  {matchday[metricStatus]}
                </Badge>
              </button>
            ))}
          </div>
        ) : null}

        <div className="flex h-full items-center justify-center">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
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
              <div className="truncate text-sm font-medium text-foreground">
                {sponsor.sponsor.name}
              </div>
              <div className="mt-0.5 text-[11px] text-muted-foreground">
                {section.label}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">
              {sponsor.seasonTotal}
            </div>
            <div className="text-[11px] text-muted-foreground">season</div>
          </div>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary/40 to-primary/60 transition-all duration-500 ease-out"
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
              className="rounded-lg border border-border/60 bg-gradient-to-br from-[#fafafc] to-white px-3 py-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-200 hover:shadow-[0_2px_8px_rgba(87,54,243,0.07)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-medium text-foreground">
                    {matchday.opponent}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    {matchday.date}
                  </div>
                </div>
                <Badge variant="primary-soft" className="px-2 py-1">
                  {matchday[metricStatus]}
                </Badge>
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
