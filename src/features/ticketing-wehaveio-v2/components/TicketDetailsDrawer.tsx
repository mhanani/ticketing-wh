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
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-[#09090b]/15 backdrop-blur-[2px] transition-all duration-300 ease-out ${
          selected ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-[34rem] border-l border-border/60 bg-white shadow-[-20px_0_60px_rgba(87,54,243,0.06)] transition-transform duration-300 ease-out ${
          selected ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={selected ? 'false' : 'true'}
      >
        {selected ? (
          <div className="flex h-full flex-col">
            {/* Header — subtle purple gradient wash */}
            <div className="relative border-b border-border/60 px-5 py-5">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5736F3]/[0.03] via-transparent to-transparent" />
              <div className="relative flex items-start justify-between gap-4">
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
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Stat cells */}
              <div className="relative mt-5 grid grid-cols-3 gap-2">
                <StatCell label="Distributed" value={selected.matchday.distributed} accent />
                <StatCell label="Allocated" value={selected.matchday.allocated} />
                <StatCell label="Pending" value={selected.matchday.pending} />
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {/* Context card */}
              <div className="rounded-lg border border-border/60 bg-gradient-to-br from-[#fafafc] to-white px-4 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Allocation context
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded text-[9px] font-semibold text-white"
                    style={{ backgroundColor: selected.sponsor.sponsor.accent }}
                  >
                    {selected.sponsor.sponsor.badge}
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {selected.sponsor.sponsor.name}
                  </span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {selected.sponsor.sponsor.tier} · {seasonLabel}
                </div>
              </div>

              {/* Ticket list header */}
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

              {/* Ticket cards */}
              <div className="mt-4 space-y-2.5">
                {entryCount ? (
                  selected.sponsor.detailsByMatchday[selected.matchday.matchId].map(
                    (detail, index) => (
                      <div
                        key={detail.ticketId}
                        className="rounded-lg border border-border/60 bg-white px-4 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-border hover:shadow-[0_2px_8px_rgba(87,54,243,0.06)]"
                        style={{ animationDelay: `${index * 50}ms` }}
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

                        <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/40 pt-3 text-sm text-muted-foreground">
                          <span>{detail.seatLabel}</span>
                          <span className="text-[11px]">{detail.deliveryType}</span>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <div className="rounded-lg border border-dashed border-border bg-gradient-to-br from-[#fafafc] to-white px-5 py-10 text-center">
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

function StatCell({
  label,
  value,
  accent,
}: {
  label: string
  value: number
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-lg border px-3 py-3 transition-all duration-200 ${
        accent
          ? 'border-primary/12 bg-gradient-to-br from-[#EEEBFE] to-[#f8f7ff] shadow-[0_1px_4px_rgba(87,54,243,0.06)]'
          : 'border-border/60 bg-gradient-to-br from-[#fafafc] to-white shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
      }`}
    >
      <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <div
        className={`mt-1 text-2xl font-semibold tracking-[-0.03em] ${
          accent ? 'text-[#5736F3]' : 'text-foreground'
        }`}
      >
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
