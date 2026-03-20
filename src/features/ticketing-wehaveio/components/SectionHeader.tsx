import type { TicketSection } from '@/shared/ticketing/types'

interface SectionHeaderProps {
  section: TicketSection
  sponsorCount: number
  metricLabel: string
  metricTotal: number
  metricCapacity: number
  metricPercent: number
  isExpanded: boolean
  onToggle: () => void
}

export function SectionHeader({
  section,
  sponsorCount,
  metricLabel,
  metricTotal,
  metricCapacity,
  metricPercent,
  isExpanded,
  onToggle,
}: SectionHeaderProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 ${
        isExpanded ? 'border-b border-[var(--wehave-line)]' : ''
      }`}
      aria-expanded={isExpanded}
      aria-label={`${section.label} section`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[var(--wehave-primary)]">
            {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </span>
          <div className="min-w-0">
            <div className="truncate text-base font-semibold text-[var(--wehave-ink)]">
              {section.label}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[var(--wehave-muted)]">
              <span>{sponsorCount} sponsors</span>
              <span className="h-1 w-1 rounded-full bg-[var(--wehave-line-strong)]" />
              <span>Capacity {section.capacity}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="mb-1 text-right text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--wehave-muted)]">
          {metricLabel} {metricTotal} / {metricCapacity}
        </div>
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[var(--wehave-primary-soft)]">
          <div
            className="h-full rounded-full bg-[var(--wehave-primary)]"
            style={{ width: `${metricPercent}%` }}
          />
        </div>
      </div>
    </button>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4 6.25L8 10L12 6.25"
        stroke="currentColor"
        strokeWidth="1.6"
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
        d="M6.25 4L10 8L6.25 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
