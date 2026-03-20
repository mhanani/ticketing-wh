import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ticketSections, seasonLabel } from '../data/mockTicketingData'
import { SectionHeader } from '../components/SectionHeader'
import { SponsorRow } from '../components/SponsorRow'
import { TicketDetailsDrawer } from '../components/TicketDetailsDrawer'
import type { TicketStatus } from '../types'
import { filterSections, getUpcomingMatchdays, sortSponsors } from '../utils'

type SortOption = 'season' | 'upcoming'

export function TicketingOverviewScreen() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState<TicketStatus>('distributed')
  const [sectionId, setSectionId] = useState<string>('all')
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
    <div className="min-h-screen bg-[var(--color-shell)] text-[var(--color-ink-soft)]">
      <div className="relative flex min-h-screen w-full">
        <main className="flex-1 px-4 py-4 sm:px-6 lg:px-6 xl:px-8">
          <section className="overflow-hidden bg-[var(--color-surface)]">
            <header className="px-8 py-5 lg:py-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h1 className="font-serif text-4xl tracking-[-0.03em] text-[var(--color-ink)] sm:text-5xl">
                    Ticketing Overview
                  </h1>
                  <p className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[var(--color-muted)]">
                    <CalendarIcon />
                    {seasonLabel}
                  </p>
                </div>

                <div className="flex items-center gap-3 max-lg:flex-wrap lg:flex-nowrap">
                  <ToolbarSelect
                    label="Filter"
                    value={status}
                    onChange={(value) => setStatus(value as TicketStatus)}
                    options={[
                      { value: 'distributed', label: 'Distributed' },
                      { value: 'allocated', label: 'Allocated' },
                      { value: 'pending', label: 'Pending' },
                    ]}
                  />
                  <ToolbarSelect
                    label="Section"
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
                    label="Sort"
                    value={sortBy}
                    onChange={(value) => setSortBy(value as SortOption)}
                    options={[
                      { value: 'season', label: 'Season total' },
                      { value: 'upcoming', label: `Next matchday` },
                    ]}
                  />
                  <label className="flex min-w-[210px] items-center gap-2 rounded-xl border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-muted)] lg:w-[210px] lg:min-w-[210px] lg:shrink-0">
                    <span>⌕</span>
                    <input
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Search sponsor..."
                      className="w-full border-none bg-transparent text-[var(--color-ink)] outline-none placeholder:text-[var(--color-muted)]"
                    />
                  </label>
                </div>
              </div>
            </header>

            <div className="px-8 max-lg:hidden">
              <div className="grid grid-cols-[minmax(220px,1.4fr)_110px_repeat(3,minmax(140px,1fr))_40px] gap-4 border-b border-[var(--color-line)] py-4 text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                <div>Sponsor</div>
                <div className="text-center">Season</div>
                {matchdays.map((matchday) => (
                  <div key={matchday.matchId} className="text-center">
                    <div>{`Matchday ${matchday.matchId === 'everton' ? '24' : matchday.matchId === 'arsenal' ? '25' : '26'}`}</div>
                    <div className="mt-1 text-[var(--color-gold)]">
                      {matchday.opponent}
                    </div>
                  </div>
                ))}
                <div />
              </div>
            </div>

            <div>
              {filteredSections.length ? (
                filteredSections.map(({ section, sponsors }) => (
                  <section key={section.id}>
                    <div className="px-8 pt-5 lg:hidden">
                      <div className="rounded-[1.5rem] border border-[var(--color-line)] bg-white px-4 py-4">
                        <div className="text-sm font-medium text-[var(--color-ink)]">
                          {section.label}
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)]">
                          <span>{section.sponsors.length} sponsors</span>
                          <span>Capacity {section.capacity}</span>
                        </div>
                      </div>
                    </div>
                    <SectionHeader
                      section={section}
                      isExpanded={expandedSections.includes(section.id)}
                      onToggle={() => toggleSection(section.id)}
                    />
                    {expandedSections.includes(section.id)
                      ? sponsors.map((sponsor) => (
                          <SponsorRow
                            key={`${section.id}-${sponsor.sponsor.id}`}
                            section={section}
                            sponsor={sponsor}
                            metricStatus={status}
                            onOpenDetails={openDetails}
                          />
                        ))
                      : null}
                  </section>
                ))
              ) : (
                <div className="px-8 py-20 text-center">
                  <p className="font-serif text-4xl text-[var(--color-ink)]">
                    No sponsors match this view
                  </p>
                  <p className="mt-3 text-sm text-[var(--color-ink-soft)]">
                    Try widening the search or removing the current filters.
                  </p>
                </div>
              )}
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

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="text-[var(--color-gold)]"
    >
      <rect
        x="2"
        y="3"
        width="10"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M4.5 1.8V4.2"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M9.5 1.8V4.2"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path d="M2 5.2H12" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

interface ToolbarSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
}

function ToolbarSelect({
  label,
  value,
  onChange,
  options,
}: ToolbarSelectProps) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-[var(--color-line)] bg-white px-3 py-2 text-sm text-[var(--color-ink-soft)] shadow-[0_10px_20px_rgba(20,18,15,0.03)]">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-none bg-transparent pr-2 text-[var(--color-ink)] outline-none"
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
