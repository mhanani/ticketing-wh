import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { seasonLabel, ticketSections } from '@/mocks/ticketing'
import type { TicketStatus } from '@/shared/ticketing/types'
import {
  filterSections,
  getUpcomingMatchdays,
  sortSponsors,
} from '@/shared/ticketing/utils'

import { SectionGroupHeader } from '../components/SectionGroupHeader'
import { SponsorTableRow } from '../components/SponsorTableRow'
import { TicketDetailsDrawer } from '../components/TicketDetailsDrawer'
import { wehaveV2Theme } from '../theme'

type SortOption = 'season' | 'upcoming'

export function TicketingWehaveioV2Screen() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState<TicketStatus>('distributed')
  const [sectionId, setSectionId] = useState('all')
  const [sortBy, setSortBy] = useState<SortOption>('season')
  const [expandedSections, setExpandedSections] = useState<string[]>(
    ticketSections.map((section) => section.id),
  )

  const matchdays = getUpcomingMatchdays(ticketSections)
  const selectedMatchId = matchdays[0]?.matchId ?? ''

  const filteredSections = sortSponsors(
    filterSections(ticketSections, searchTerm, sectionId),
    sortBy,
    selectedMatchId,
    status,
  )

  const drawerSelection =
    searchParams.get('section') &&
    searchParams.get('sponsor') &&
    searchParams.get('match')
      ? {
          sectionId: searchParams.get('section') ?? '',
          sponsorId: searchParams.get('sponsor') ?? '',
          matchId: searchParams.get('match') ?? '',
        }
      : null

  function openDetails(
    nextSectionId: string,
    sponsorId: string,
    matchId: string,
  ) {
    setSearchParams({
      section: nextSectionId,
      sponsor: sponsorId,
      match: matchId,
    })
  }

  function closeDetails() {
    setSearchParams({})
  }

  function toggleSection(sectionIdToToggle: string) {
    setExpandedSections((current) =>
      current.includes(sectionIdToToggle)
        ? current.filter((item) => item !== sectionIdToToggle)
        : [...current, sectionIdToToggle],
    )
  }

  return (
    <div
      style={wehaveV2Theme}
      className="min-h-full bg-[var(--wehave-v2-bg)] text-[var(--wehave-v2-ink-soft)]"
    >
      <div className="flex min-h-full w-full">
        <main className="min-w-0 flex-1 px-3 py-3 sm:px-4 sm:py-4">
          <section className="min-h-[calc(100vh-4.5rem)] overflow-hidden rounded-[12px] border border-[var(--wehave-v2-border)] bg-[var(--wehave-v2-surface)] shadow-[var(--wehave-v2-shadow)]">
            <header className="border-b border-[var(--wehave-v2-border)] px-4 py-4 sm:px-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-[var(--wehave-v2-muted)]">
                  <span className="rounded-md border border-[var(--wehave-v2-primary-border)] bg-[var(--wehave-v2-primary-soft)] px-2.5 py-1 text-[var(--wehave-v2-primary-text)]">
                    {seasonLabel}
                  </span>
                </div>

                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <p className="min-w-0 text-sm text-[var(--wehave-v2-ink-soft)]">
                    Rights-page density adapted for multi-sponsor ticket allocations.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                    <ToolbarSelect
                      ariaLabel="Status"
                      value={status}
                      onChange={(value) => setStatus(value as TicketStatus)}
                      options={[
                        { value: 'distributed', label: 'Distributed' },
                        { value: 'allocated', label: 'Allocated' },
                        { value: 'pending', label: 'Pending' },
                      ]}
                    />
                    <ToolbarSelect
                      ariaLabel="Section"
                      value={sectionId}
                      onChange={setSectionId}
                      options={[
                        { value: 'all', label: 'All sections' },
                        ...ticketSections.map((section) => ({
                          value: section.id,
                          label: section.label,
                        })),
                      ]}
                    />
                    <ToolbarSelect
                      ariaLabel="Sort"
                      value={sortBy}
                      onChange={(value) => setSortBy(value as SortOption)}
                      options={[
                        { value: 'season', label: 'Season total' },
                        { value: 'upcoming', label: 'Next fixture' },
                      ]}
                    />

                    <label className="flex h-8 min-w-[220px] items-center gap-2 rounded-md border border-[var(--wehave-v2-border)] bg-white px-3 text-sm text-[var(--wehave-v2-ink)]">
                      <SearchIcon />
                      <input
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search sponsor..."
                        className="w-full border-none bg-transparent text-[var(--wehave-v2-ink)] outline-none placeholder:text-[var(--wehave-v2-muted)]"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </header>

            <div className="px-3 py-3 sm:px-4 sm:py-4">
              <div className="hidden rounded-[10px] border border-[var(--wehave-v2-border)] bg-[var(--wehave-v2-surface-soft)] px-4 py-3 lg:block">
                <div className="grid grid-cols-[minmax(240px,1.2fr)_minmax(110px,0.5fr)_minmax(220px,0.9fr)_minmax(110px,0.45fr)_minmax(420px,1.55fr)_48px] items-center gap-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--wehave-v2-muted)]">
                  <div className="text-left">Asset</div>
                  <div className="text-center">Total price</div>
                  <div className="text-center">Progress</div>
                  <div className="text-center">Season</div>
                  <div className="text-center">Upcoming matchdays</div>
                  <div />
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {filteredSections.length ? (
                  filteredSections.map(({ section, sponsors }) => {
                    const metricTotal = sponsors.reduce(
                      (sum, sponsor) =>
                        sum +
                        sponsor.matchdays.reduce(
                          (matchdaySum, matchday) =>
                            matchdaySum + matchday[status],
                          0,
                        ),
                      0,
                    )

                    const metricPercent = Math.min(
                      100,
                      Math.round(
                        (metricTotal / Math.max(section.capacity, 1)) * 100,
                      ),
                    )

                    return (
                      <section
                        key={section.id}
                        className="overflow-hidden rounded-[10px] border border-[var(--wehave-v2-border)] bg-[var(--wehave-v2-surface)]"
                      >
                        <SectionGroupHeader
                          section={section}
                          sponsorCount={sponsors.length}
                          metricLabel={status}
                          metricTotal={metricTotal}
                          metricCapacity={section.capacity}
                          metricPercent={metricPercent}
                          isExpanded={expandedSections.includes(section.id)}
                          onToggle={() => toggleSection(section.id)}
                        />

                        {expandedSections.includes(section.id) ? (
                          <div>
                            <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-[var(--wehave-v2-border)] bg-[var(--wehave-v2-surface-soft)] px-4 py-2 text-[11px] text-[var(--wehave-v2-muted)] sm:hidden">
                              <span>Sponsors</span>
                              <span>Upcoming</span>
                            </div>
                            {sponsors.map((sponsor) => (
                              <SponsorTableRow
                                key={`${section.id}-${sponsor.sponsor.id}`}
                                section={section}
                                sponsor={sponsor}
                                metricStatus={status}
                                onOpenDetails={openDetails}
                              />
                            ))}
                          </div>
                        ) : null}
                      </section>
                    )
                  })
                ) : (
                  <div className="rounded-[10px] border border-dashed border-[var(--wehave-v2-border-strong)] bg-[var(--wehave-v2-surface-soft)] px-6 py-16 text-center">
                    <p className="text-2xl font-semibold tracking-[-0.04em] text-[var(--wehave-v2-ink)]">
                      No sponsors match this view
                    </p>
                    <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--wehave-v2-ink-soft)]">
                      Try widening the search or removing the active filters.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <TicketDetailsDrawer
          sections={ticketSections}
          selection={drawerSelection}
          onClose={closeDetails}
        />
      </div>
    </div>
  )
}

interface ToolbarSelectProps {
  ariaLabel: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
}

function ToolbarSelect({
  ariaLabel,
  value,
  onChange,
  options,
}: ToolbarSelectProps) {
  return (
    <label className="relative">
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 appearance-none rounded-md border border-[var(--wehave-v2-border)] bg-white px-3 pr-8 text-sm text-[var(--wehave-v2-ink)] outline-none ring-0 transition focus:border-[var(--wehave-v2-ring)]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[var(--wehave-v2-muted)]">
        <ChevronDownIcon />
      </span>
    </label>
  )
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M11.75 11.75L14 14M7 12.25A5.25 5.25 0 107 1.75a5.25 5.25 0 000 10.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
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
