import { Badge } from '@/components/ui/badge'
import type { TicketSection, TicketStatus } from '@/shared/ticketing/types'

interface SectionGroupHeaderProps {
  section: TicketSection
  sponsorCount: number
  metricLabel: TicketStatus
  metricTotal: number
  metricCapacity: number
  metricPercent: number
  isExpanded: boolean
  onToggle: () => void
}

export function SectionGroupHeader({
  section,
  sponsorCount,
  metricLabel,
  metricTotal,
  metricCapacity,
  metricPercent,
  isExpanded,
  onToggle,
}: SectionGroupHeaderProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      aria-label={`${section.label} section`}
      className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-all duration-200 hover:bg-[#fafafc]/80 sm:px-5"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-muted-foreground">
            {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </span>
          <SectionGlyph />
          <span className="truncate text-[13px] font-semibold text-foreground sm:text-sm">
            {section.label}
          </span>
          <Badge variant="primary-soft">
            {sponsorCount}
          </Badge>
          <div className="relative hidden h-1 w-18 overflow-hidden rounded-full bg-secondary sm:block">
            {metricLabel === 'pending' ? (
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${metricPercent}%`,
                  backgroundImage: 'repeating-linear-gradient(90deg, #71717a 0px, #71717a 3px, transparent 3px, transparent 6px)',
                  opacity: 0.4,
                }}
              />
            ) : (
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${metricLabel === 'allocated' ? 'bg-gradient-to-r from-[#0e7490]/40 to-[#0e7490]/60' : 'bg-gradient-to-r from-[#6132fd]/40 to-[#6132fd]/60'}`}
                style={{ width: `${metricPercent}%` }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-3 sm:flex">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {metricLabel}
        </span>
        <Badge variant="secondary">
          {metricTotal}/{metricCapacity}
        </Badge>
      </div>
    </button>
  )
}

function SectionGlyph() {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center text-muted-foreground">
      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
        <path
          d="M3.25 5.25H12.75M3.25 8H12.75M3.25 10.75H8.75"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <path
          d="M2.75 2.75H13.25V13.25H2.75V2.75Z"
          stroke="currentColor"
          strokeWidth="1.25"
          rx="2"
        />
      </svg>
    </span>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4.5 6.25L8 9.75L11.5 6.25"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M6.25 4.5L9.75 8L6.25 11.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
