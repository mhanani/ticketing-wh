import type { ReactNode } from 'react'

export const toolbarControlBaseClassName =
  'inline-flex h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[8.4px] border px-3 py-2 text-sm font-medium leading-5 antialiased transition-all outline-none shadow-[0_1px_2px_rgba(0,0,0,0.05)] [font:inherit]'
export const toolbarControlInactiveClassName =
  'border-[var(--wehave-v2-border)] bg-[var(--wehave-v2-surface)] text-[var(--wehave-v2-ink)] hover:bg-[var(--wehave-v2-surface-muted)]'
export const toolbarControlActiveClassName =
  'border-[var(--wehave-v2-primary)] bg-[var(--wehave-v2-primary-soft)] text-[var(--wehave-v2-primary)] hover:bg-[rgba(87,54,243,0.14)]'

interface ToolbarSelectProps {
  ariaLabel: string
  label: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  icon: ReactNode
  isActive?: boolean
}

export function ToolbarSelect({
  ariaLabel,
  label,
  value,
  onChange,
  options,
  icon,
  isActive = false,
}: ToolbarSelectProps) {
  return (
    <label
      className={`relative ${toolbarControlBaseClassName} ${
        isActive
          ? toolbarControlActiveClassName
          : toolbarControlInactiveClassName
      }`}
    >
      <span className="pointer-events-none flex items-center justify-center">
        {icon}
      </span>
      <span className="pointer-events-none whitespace-nowrap">{label}</span>
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 appearance-none opacity-0 outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
