import type { TicketSection } from '@/shared/ticketing/types'

interface SectionGroupHeaderProps {
  section: TicketSection
  sponsorCount: number
  metricLabel: string
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
      className="flex w-full items-center justify-between gap-4 border-b border-[var(--wehave-v2-border)] bg-[var(--wehave-v2-surface)] px-4 py-3 text-left transition hover:bg-[var(--wehave-v2-surface-soft)] sm:px-5"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[var(--wehave-v2-muted)]">
            {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </span>
          <SectionGlyph />
          <span className="truncate text-[13px] font-semibold text-[var(--wehave-v2-ink)] sm:text-sm">
            {section.label}
          </span>
          <span className="rounded-md border border-[var(--wehave-v2-primary-border)] bg-[var(--wehave-v2-primary-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--wehave-v2-primary-text)]">
            {sponsorCount}
          </span>
          <div className="hidden h-[3px] w-18 overflow-hidden rounded-full bg-[var(--wehave-v2-surface-muted)] sm:block">
            <div
              className="h-full rounded-full bg-[var(--wehave-v2-ring)]"
              style={{ width: `${metricPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-3 sm:flex">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--wehave-v2-muted)]">
          {metricLabel}
        </span>
        <span className="rounded-md border border-[var(--wehave-v2-border)] bg-[var(--wehave-v2-surface-soft)] px-2 py-1 text-[11px] font-medium text-[var(--wehave-v2-ink-soft)]">
          {metricTotal}/{metricCapacity}
        </span>
      </div>
    </button>
  )
}

function SectionGlyph() {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center text-[var(--wehave-v2-muted)]">
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
