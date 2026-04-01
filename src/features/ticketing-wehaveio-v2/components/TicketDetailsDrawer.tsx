import { useEffect } from 'react'

import type { TicketStatus, TicketSection } from '@/shared/ticketing/types'
import { getSelectedTicketSlice } from '@/shared/ticketing/utils'
import { seasonLabel } from '@/mocks/ticketing'

interface TicketDetailsDrawerProps {
  sections: TicketSection[]
  selection: {
    sectionId: string
    sponsorId: string
    matchId: string
  } | null
  onClose: () => void
}

const badgeTone: Record<TicketStatus, string> = {
  distributed:
    'border-[rgba(80,32,229,0.18)] bg-[rgba(80,32,229,0.08)] text-[rgba(80,32,229,0.92)]',
  allocated:
    'border-[rgba(14,116,144,0.18)] bg-[rgba(14,116,144,0.08)] text-[#0f766e]',
  pending:
    'border-[rgba(113,113,122,0.18)] bg-[rgba(113,113,122,0.08)] text-[#52525b]',
}

export function TicketDetailsDrawer({
  sections,
  selection,
  onClose,
}: TicketDetailsDrawerProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    if (selection) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selection, onClose])

  const selected = getSelectedTicketSlice(sections, selection)
  const entryCount =
    selected?.sponsor.detailsByMatchday[selected.matchday.matchId]?.length ?? 0

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-[rgba(9,9,11,0.12)] transition ${
          selected ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-[34rem] border-l border-[var(--wehave-v2-border)] bg-[rgba(255,255,255,0.98)] shadow-[-16px_0_40px_rgba(15,23,42,0.08)] backdrop-blur-sm transition ${
          selected ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={selected ? 'false' : 'true'}
      >
        {selected ? (
          <div className="flex h-full flex-col">
            <div className="border-b border-[var(--wehave-v2-border)] px-5 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--wehave-v2-muted)]">
                    Ticket details
                  </div>
                  <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[var(--wehave-v2-ink)]">
                    {selected.matchday.date}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--wehave-v2-ink-soft)]">
                    {selected.matchday.opponent} · {selected.section.label}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close ticket details"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--wehave-v2-border)] text-[var(--wehave-v2-muted)] transition hover:border-[var(--wehave-v2-primary-border)] hover:text-[var(--wehave-v2-primary)]"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <StatCell label="Distributed" value={selected.matchday.distributed} />
                <StatCell label="Allocated" value={selected.matchday.allocated} />
                <StatCell label="Pending" value={selected.matchday.pending} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="rounded-[var(--wehave-v2-radius)] border border-[var(--wehave-v2-border)] bg-[var(--wehave-v2-surface-soft)] px-4 py-4">
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--wehave-v2-muted)]">
                  Allocation context
                </div>
                <div className="mt-2 text-sm font-medium text-[var(--wehave-v2-ink)]">
                  {selected.sponsor.sponsor.name}
                </div>
                <div className="mt-1 text-sm text-[var(--wehave-v2-ink-soft)]">
                  {selected.sponsor.sponsor.tier} · {seasonLabel}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--wehave-v2-muted)]">
                    Ticket list
                  </div>
                  <p className="mt-1 text-sm text-[var(--wehave-v2-ink-soft)]">
                    Assigned and reserved seats for the selected matchday.
                  </p>
                </div>
                <div className="rounded-md border border-[var(--wehave-v2-primary-border)] bg-[var(--wehave-v2-primary-soft)] px-2 py-1 text-xs font-medium text-[var(--wehave-v2-primary-text)]">
                  {entryCount} entries
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {entryCount ? (
                  selected.sponsor.detailsByMatchday[selected.matchday.matchId].map(
                    (detail) => (
                      <div
                        key={detail.ticketId}
                        className="rounded-[var(--wehave-v2-radius)] border border-[var(--wehave-v2-border)] bg-white px-4 py-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-medium text-[var(--wehave-v2-ink)]">
                              {detail.holderName}
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--wehave-v2-muted)]">
                              {detail.ticketId}
                            </p>
                          </div>
                          <span
                            className={`rounded-md border px-2 py-1 text-xs font-medium ${badgeTone[detail.status]}`}
                          >
                            {capitalizeLabel(detail.status)}
                          </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-[var(--wehave-v2-ink-soft)]">
                          <span>{detail.seatLabel}</span>
                          <span>{detail.deliveryType}</span>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <div className="rounded-[var(--wehave-v2-radius)] border border-dashed border-[var(--wehave-v2-border-strong)] bg-[var(--wehave-v2-surface-soft)] px-5 py-10 text-center">
                    <p className="text-xl font-semibold tracking-[-0.03em] text-[var(--wehave-v2-ink)]">
                      No seats assigned yet
                    </p>
                    <p className="mt-2 text-sm text-[var(--wehave-v2-ink-soft)]">
                      This sponsor still has open capacity for the selected matchday.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </aside>
    </>
  )
}

function StatCell({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[var(--wehave-v2-radius)] border border-[var(--wehave-v2-border)] bg-[var(--wehave-v2-surface-soft)] px-3 py-3">
      <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--wehave-v2-muted)]">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[var(--wehave-v2-ink)]">
        {value}
      </div>
    </div>
  )
}

function capitalizeLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M5 5L15 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
