import { useEffect } from 'react'

import { Badge } from '@/components/ui/badge'
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

const statusVariant: Record<TicketStatus, 'distributed' | 'allocated' | 'pending'> = {
  distributed: 'distributed',
  allocated: 'allocated',
  pending: 'pending',
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
        className={`fixed inset-0 z-30 bg-[#09090b]/12 transition ${
          selected ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-[34rem] border-l border-border bg-white/98 shadow-[-16px_0_40px_rgba(15,23,42,0.08)] backdrop-blur-sm transition ${
          selected ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={selected ? 'false' : 'true'}
      >
        {selected ? (
          <div className="flex h-full flex-col">
            <div className="border-b border-border px-5 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Ticket details
                  </div>
                  <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-foreground">
                    {selected.matchday.date}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selected.matchday.opponent} · {selected.section.label}
                  </p>
                </div>

                <button
                  type="button"
                  aria-label="Close ticket details"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:border-primary/30 hover:text-primary"
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
              <div className="rounded-lg border border-border bg-secondary px-4 py-4">
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Allocation context
                </div>
                <div className="mt-2 text-sm font-medium text-foreground">
                  {selected.sponsor.sponsor.name}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {selected.sponsor.sponsor.tier} · {seasonLabel}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Ticket list
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Assigned and reserved seats for the selected matchday.
                  </p>
                </div>
                <Badge variant="primary-soft" className="px-2 py-1">
                  {entryCount} entries
                </Badge>
              </div>

              <div className="mt-4 space-y-3">
                {entryCount ? (
                  selected.sponsor.detailsByMatchday[selected.matchday.matchId].map(
                    (detail) => (
                      <div
                        key={detail.ticketId}
                        className="rounded-lg border border-border bg-white px-4 py-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-medium text-foreground">
                              {detail.holderName}
                            </h3>
                            <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                              {detail.ticketId}
                            </p>
                          </div>
                          <Badge variant={statusVariant[detail.status]} className="px-2 py-1">
                            {detail.status.charAt(0).toUpperCase() + detail.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-muted-foreground">
                          <span>{detail.seatLabel}</span>
                          <span>{detail.deliveryType}</span>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <div className="rounded-lg border border-dashed border-border bg-secondary px-5 py-10 text-center">
                    <p className="text-xl font-semibold tracking-[-0.03em] text-foreground">
                      No seats assigned yet
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
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
    <div className="rounded-lg border border-border bg-secondary px-3 py-3">
      <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-foreground">
        {value}
      </div>
    </div>
  )
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
