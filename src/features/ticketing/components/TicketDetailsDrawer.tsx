import type { TicketSection } from '../types'
import { getSelectedTicketSlice } from '../utils'

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
  distributed: 'bg-[rgba(112,133,103,0.14)] text-[var(--color-olive)]',
  allocated: 'bg-[rgba(197,143,44,0.12)] text-[var(--color-gold)]',
  pending: 'bg-[rgba(103,97,91,0.12)] text-[var(--color-stone)]',
}

export function TicketDetailsDrawer({
  sections,
  selection,
  onClose,
}: TicketDetailsDrawerProps) {
  const selected = getSelectedTicketSlice(sections, selection)

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-30 w-full max-w-[30rem] border-l border-[var(--color-line)] bg-[rgba(251,249,245,0.96)] shadow-[-20px_0_60px_rgba(28,21,16,0.08)] backdrop-blur-xl transition ${
        selected ? 'translate-x-0' : 'translate-x-full'
      }`}
      aria-hidden={selected ? 'false' : 'true'}
    >
      {selected ? (
        <div className="flex h-full flex-col">
          <div className="border-b border-[var(--color-line)] px-6 py-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                  Ticket Details
                </p>
                <h2 className="mt-2 font-serif text-4xl leading-none text-[var(--color-ink)]">
                  {getMatchdayLabel(selected.matchday.matchId)}
                </h2>
                <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
                  {selected.matchday.opponent} · {selected.matchday.date}
                </p>
              </div>

              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg leading-none text-[var(--color-muted)] transition hover:bg-white hover:text-[var(--color-ink)]"
                onClick={onClose}
                aria-label="Close ticket details"
              >
                ×
              </button>
            </div>

            <div className="mt-6 rounded-[1.35rem] border border-[var(--color-line)] bg-white/80 px-5 py-5">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    Home
                  </div>
                  <div className="mt-2 font-serif text-[1.8rem] leading-none text-[var(--color-ink)]">
                    Home Club
                  </div>
                </div>
                <div className="pt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                  VS
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    Away
                  </div>
                  <div className="mt-2 font-serif text-[1.8rem] leading-none text-[var(--color-ink)]">
                    {selected.matchday.opponent}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <StatCard
                label="Distributed"
                value={selected.matchday.distributed}
              />
              <StatCard label="Allocated" value={selected.matchday.allocated} />
              <StatCard label="Pending" value={selected.matchday.pending} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="mb-4 rounded-[1.15rem] border border-[var(--color-line)] bg-white/80 px-4 py-4">
              <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Seat Section
              </div>
              <div className="mt-2 text-sm font-medium text-[var(--color-ink)]">
                {selected.section.label}
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                  Ticket list
                </p>
                <p className="mt-1 text-sm text-[var(--color-ink-soft)]">
                  Access passes promised inside this sponsor allocation
                </p>
              </div>
              <div className="rounded-full border border-[var(--color-line)] px-3 py-1 text-xs uppercase tracking-[0.22em] whitespace-nowrap text-[var(--color-muted)]">
                {selected.sponsor.detailsByMatchday[selected.matchday.matchId]
                  ?.length ?? 0}{' '}
                entries
              </div>
            </div>

            <div className="space-y-3">
              {selected.sponsor.detailsByMatchday[selected.matchday.matchId]
                ?.length ? (
                selected.sponsor.detailsByMatchday[
                  selected.matchday.matchId
                ].map((detail) => (
                  <div
                    key={detail.ticketId}
                    className="rounded-[1.4rem] border border-[var(--color-line)] bg-white/90 px-4 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-[var(--color-ink)]">
                          {detail.holderName}
                        </h3>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">
                          {detail.ticketId}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${badgeTone[detail.status]}`}
                      >
                        {capitalizeLabel(detail.status)}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm text-[var(--color-ink-soft)]">
                      <span>{detail.seatLabel}</span>
                      <span>{detail.deliveryType}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.6rem] border border-dashed border-[var(--color-line-strong)] bg-white/70 px-5 py-10 text-center">
                  <p className="font-serif text-3xl text-[var(--color-ink)]">
                    No seats assigned yet
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
                    This sponsor has upcoming capacity for the selected
                    matchday, but the seat list has not been assigned yet.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-[var(--color-line)] px-6 py-5">
            <button
              type="button"
              className="w-full rounded-sm bg-[#1e1d1b] px-4 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-black"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </aside>
  )
}

interface StatCardProps {
  label: string
  value: number
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--color-line)] bg-white/80 px-4 py-4">
      <div className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
        {label}
      </div>
      <div className="mt-2 font-serif text-4xl leading-none text-[var(--color-ink)]">
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
