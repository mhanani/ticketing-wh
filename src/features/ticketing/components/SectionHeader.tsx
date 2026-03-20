import type { TicketSection } from '../types'

interface SectionHeaderProps {
  section: TicketSection
  isExpanded: boolean
  onToggle: () => void
}

export function SectionHeader({
  section,
  isExpanded,
  onToggle,
}: SectionHeaderProps) {
  return (
    <div className="px-8 max-lg:hidden">
      <button
        type="button"
        onClick={onToggle}
        className="grid w-full grid-cols-[minmax(220px,1.4fr)_110px_repeat(3,minmax(140px,1fr))_40px] items-center gap-4 border-t border-[var(--color-line)] py-[1.15rem] text-sm"
        aria-expanded={isExpanded}
        aria-label={`${section.label} section`}
      >
        <div className="flex items-center gap-3 text-left">
          <span className="text-[var(--color-gold)]">
            {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
          </span>
          <span className="text-[var(--color-muted)]">
            <PinIcon />
          </span>
          <span className="font-medium text-[1.05rem] text-[var(--color-ink)]">
            {section.label}
          </span>
          <span className="pl-2 text-[11px] uppercase tracking-[0.26em] text-[var(--color-muted)]">
            {section.sponsors.length} sponsors
          </span>
        </div>
        <div />
        <div />
        <div />
        <div />
        <div className="justify-self-end text-right">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
            Capacity
          </span>
          <span className="ml-2 font-medium text-[var(--color-ink)]">
            {section.capacity}
          </span>
        </div>
      </button>
    </div>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
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
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 2L6.5 5L3.5 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 13C6 13 10 8.962 10 5.6C10 3.06 8.21 1 6 1C3.79 1 2 3.06 2 5.6C2 8.962 6 13 6 13Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="6" cy="5.4" r="1.4" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}
