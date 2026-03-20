import type { CSSProperties, ReactNode } from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { seasonLabel, ticketSections } from '@/mocks/ticketing'
import type { TicketStatus } from '@/shared/ticketing/types'
import {
  filterSections,
  getUpcomingMatchdays,
  sortSponsors,
} from '@/shared/ticketing/utils'

import { SectionHeader } from '../components/SectionHeader'
import { SponsorRow } from '../components/SponsorRow'
import { TicketDetailsDrawer } from '../components/TicketDetailsDrawer'

type SortOption = 'season' | 'upcoming'

const wehaveTheme: CSSProperties = {
  '--wehave-bg': '#f4f6fb',
  '--wehave-surface': '#ffffff',
  '--wehave-surface-alt': '#f8f9ff',
  '--wehave-line': '#e5e9f5',
  '--wehave-line-strong': '#d3daf0',
  '--wehave-ink': '#171b2a',
  '--wehave-soft': '#5c647d',
  '--wehave-muted': '#8f96ad',
  '--wehave-primary': '#5736F3',
  '--wehave-primary-strong': '#4628de',
  '--wehave-primary-soft': '#efebff',
  '--wehave-primary-tint': '#cdc3ff',
} as CSSProperties

export function TicketingWehaveioScreen() {
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
    <div
      style={wehaveTheme}
      className="min-h-screen bg-[var(--wehave-bg)] text-[var(--wehave-soft)]"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1760px]">
        <main className="min-w-0 flex-1 px-3 py-3 sm:px-5 lg:px-6">
          <section className="min-h-[calc(100vh-1.5rem)] overflow-hidden rounded-[22px] border border-[var(--wehave-line)] bg-[var(--wehave-surface)] shadow-[0_24px_80px_rgba(17,24,39,0.08)]">
            <header className="border-b border-[var(--wehave-line)] px-5 py-5 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[var(--wehave-primary-soft)] px-3 py-1 text-xs font-medium text-[var(--wehave-primary)]">
                        <SeasonIcon />
                        {seasonLabel}
                      </span>
                    </div>

                    <h1 className="text-3xl font-semibold tracking-[-0.05em] text-[var(--wehave-ink)] sm:text-[2.4rem]">
                      Ticketing Overview
                    </h1>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                    <ToolbarSelect
                      icon={<FilterIcon />}
                      ariaLabel="Filter"
                      value={status}
                      onChange={(value) => setStatus(value as TicketStatus)}
                      options={[
                        { value: 'distributed', label: 'Distributed' },
                        { value: 'allocated', label: 'Allocated' },
                        { value: 'pending', label: 'Pending' },
                      ]}
                    />
                    <ToolbarSelect
                      icon={<SortIcon />}
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
                      icon={<SortIcon />}
                      ariaLabel="Sort"
                      value={sortBy}
                      onChange={(value) => setSortBy(value as SortOption)}
                      options={[
                        { value: 'season', label: 'Season total' },
                        { value: 'upcoming', label: 'Next fixture' },
                      ]}
                    />
                    <label className="flex h-10 min-w-[230px] items-center gap-2 rounded-[10px] border border-[var(--wehave-line)] bg-[var(--wehave-surface)] px-3 text-sm text-[var(--wehave-ink)] shadow-[0_2px_6px_rgba(17,24,39,0.04)]">
                      <SearchSmallIcon />
                      <input
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search sponsor..."
                        className="w-full border-none bg-transparent text-[var(--wehave-ink)] outline-none placeholder:text-[var(--wehave-muted)]"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </header>

            <div className="px-5 py-5 sm:px-6 lg:px-8">
              <div className="hidden rounded-[14px] border border-[var(--wehave-line)] bg-[var(--wehave-surface-alt)] p-4 lg:block">
                <div className="grid grid-cols-[minmax(280px,1.45fr)_112px_220px_minmax(320px,1.2fr)_56px] items-center gap-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--wehave-muted)]">
                  <div>Allocation</div>
                  <div className="text-center">Season</div>
                  <div>Progress</div>
                  <div>Upcoming matchdays</div>
                  <div />
                </div>
              </div>

              <div className="mt-4 space-y-5">
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
                    const metricCapacity = section.capacity
                    const metricPercent = Math.min(
                      100,
                      Math.round((metricTotal / Math.max(metricCapacity, 1)) * 100),
                    )

                    return (
                      <section
                        key={section.id}
                        className="overflow-hidden rounded-[14px] border border-[var(--wehave-line)] bg-[var(--wehave-surface)] shadow-[0_10px_30px_rgba(20,24,40,0.04)]"
                      >
                        <SectionHeader
                          section={section}
                          sponsorCount={sponsors.length}
                          metricLabel={status}
                          metricTotal={metricTotal}
                          metricCapacity={metricCapacity}
                          metricPercent={metricPercent}
                          isExpanded={expandedSections.includes(section.id)}
                          onToggle={() => toggleSection(section.id)}
                        />

                        {expandedSections.includes(section.id) ? (
                          <div>
                            {sponsors.map((sponsor) => (
                              <SponsorRow
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
                  <div className="rounded-[14px] border border-dashed border-[var(--wehave-line-strong)] bg-[var(--wehave-surface-alt)] px-6 py-16 text-center">
                    <p className="text-3xl font-semibold tracking-[-0.04em] text-[var(--wehave-ink)]">
                      No sponsors match this view
                    </p>
                    <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--wehave-soft)]">
                      Try widening the search or removing the current filters.
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
  icon: ReactNode
  ariaLabel: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
}

function ToolbarSelect({
  icon,
  ariaLabel,
  value,
  onChange,
  options,
}: ToolbarSelectProps) {
  return (
    <label className="flex h-10 items-center gap-2 rounded-[10px] border border-[var(--wehave-line)] bg-[var(--wehave-surface)] px-3 text-sm font-medium text-[var(--wehave-ink)] shadow-[0_2px_6px_rgba(17,24,39,0.04)]">
      <span className="text-[var(--wehave-soft)]">{icon}</span>
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="max-w-[11rem] border-none bg-transparent text-[var(--wehave-ink)] outline-none"
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

function SeasonIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <rect
        x="3"
        y="4"
        width="14"
        height="12"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M6 2.75V5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 2.75V5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8H17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function SearchSmallIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="9" cy="9" r="5.75" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13.25 13.25L16.5 16.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M4 5.5H16L11 11V15L9 14V11L4 5.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SortIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M7 4.5V15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4.5 7L7 4.5L9.5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 15.5V4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10.5 13L13 15.5L15.5 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
