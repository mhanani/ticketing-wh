import type { TicketSection } from '@/shared/ticketing/types'
import { getSelectedTicketSlice } from '@/shared/ticketing/utils'

interface TicketDetailsDrawerProps {
  sections: TicketSection[]
  selection: {
    sectionId: string
    sponsorId: string
    matchId: string
  } | null
  onClose: () => void
}

const badgeTone = {
  distributed:
    'bg-[rgba(87,54,243,0.10)] text-[var(--wehave-primary)] border-[rgba(87,54,243,0.14)]',
  allocated:
    'bg-[rgba(96,165,250,0.10)] text-[#2563eb] border-[rgba(96,165,250,0.18)]',
  pending:
    'bg-[rgba(148,163,184,0.12)] text-[#475569] border-[rgba(148,163,184,0.18)]',
}

export function TicketDetailsDrawer({
  sections,
  selection,
  onClose,
}: TicketDetailsDrawerProps) {
  const selected = getSelectedTicketSlice(sections, selection)

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-[rgba(18,24,40,0.18)] transition ${
          selected ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 right-0 z-30 w-full max-w-[32rem] border-l border-[var(--wehave-line)] bg-[rgba(255,255,255,0.96)] shadow-[-24px_0_80px_rgba(17,24,39,0.14)] backdrop-blur-xl transition ${
          selected ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={selected ? 'false' : 'true'}
      >
        {selected ? (
          <div className="flex h-full flex-col">
            <div className="border-b border-[var(--wehave-line)] px-6 py-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--wehave-muted)]">
                    Ticket details
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--wehave-ink)]">
                    {getMatchdayLabel(selected.matchday.matchId)}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--wehave-soft)]">
                    {selected.matchday.opponent} · {selected.matchday.date}
                  </p>
                </div>

                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-[var(--wehave-line)] text-[var(--wehave-soft)] transition hover:border-[var(--wehave-primary-tint)] hover:text-[var(--wehave-primary)]"
                  onClick={onClose}
                  aria-label="Close ticket details"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="mt-6 rounded-[14px] border border-[var(--wehave-line)] bg-[var(--wehave-surface-alt)] p-5">
                <div className="grid grid-cols-3 gap-3">
                  <StatCard
                    label="Distributed"
                    value={selected.matchday.distributed}
                  />
                  <StatCard
                    label="Allocated"
                    value={selected.matchday.allocated}
                  />
                  <StatCard label="Pending" value={selected.matchday.pending} />
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="rounded-[12px] border border-[var(--wehave-line)] bg-[var(--wehave-surface-alt)] px-4 py-4">
                <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--wehave-muted)]">
                  Allocation context
                </div>
                <div className="mt-3 text-sm font-semibold text-[var(--wehave-ink)]">
                  {selected.section.label}
                </div>
                <div className="mt-1 text-sm text-[var(--wehave-soft)]">
                  {selected.sponsor.sponsor.name} · {selected.sponsor.sponsor.tier}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--wehave-muted)]">
                    Ticket list
                  </p>
                  <p className="mt-1 text-sm text-[var(--wehave-soft)]">
                    Tickets currently assigned or reserved for this matchday.
                  </p>
                </div>
                <div className="rounded-full border border-[var(--wehave-line)] bg-white px-3 py-1 text-xs font-medium text-[var(--wehave-soft)]">
                  {selected.sponsor.detailsByMatchday[selected.matchday.matchId]
                    ?.length ?? 0}{' '}
                  entries
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {selected.sponsor.detailsByMatchday[selected.matchday.matchId]
                  ?.length ? (
                  selected.sponsor.detailsByMatchday[
                    selected.matchday.matchId
                  ].map((detail) => (
                    <div
                      key={detail.ticketId}
                      className="rounded-[12px] border border-[var(--wehave-line)] bg-white px-4 py-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-[var(--wehave-ink)]">
                            {detail.holderName}
                          </h3>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--wehave-muted)]">
                            {detail.ticketId}
                          </p>
                        </div>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-medium ${badgeTone[detail.status]}`}
                        >
                          {capitalizeLabel(detail.status)}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3 text-sm text-[var(--wehave-soft)]">
                        <span>{detail.seatLabel}</span>
                        <span>{detail.deliveryType}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[14px] border border-dashed border-[var(--wehave-line-strong)] bg-[var(--wehave-surface-alt)] px-5 py-10 text-center">
                    <p className="text-2xl font-semibold tracking-[-0.04em] text-[var(--wehave-ink)]">
                      No seats assigned yet
                    </p>
                    <p className="mt-2 text-sm text-[var(--wehave-soft)]">
                      This sponsor still has open capacity for the selected
                      matchday.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-[var(--wehave-line)] px-6 py-5">
              <button
                type="button"
                className="w-full rounded-[10px] bg-[var(--wehave-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--wehave-primary-strong)]"
                onClick={onClose}
              >
                Close panel
              </button>
            </div>
          </div>
        ) : null}
      </aside>
    </>
  )
}

interface StatCardProps {
  label: string
  value: number
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-[12px] border border-[var(--wehave-line)] bg-white px-4 py-4">
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--wehave-muted)]">
        {label}
      </div>
      <div className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--wehave-ink)]">
        {value}
      </div>
    </div>
  )
}

function getMatchdayLabel(matchId: string) {
  if (matchId === 'everton') {
    return 'Matchday 24'
  }

  if (matchId === 'arsenal') {
    return 'Matchday 25'
  }

  if (matchId === 'chelsea') {
    return 'Matchday 26'
  }

  return 'Matchday'
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
