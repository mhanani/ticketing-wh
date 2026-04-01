import { ArrowUp, ArrowUpDown, Check, Columns3, Funnel, Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { seasonLabel, ticketSections } from '@/mocks/ticketing'
import type { TicketStatus } from '@/shared/ticketing/types'
import {
  filterSections,
  getUpcomingMatchdays,
  sortSponsors,
} from '@/shared/ticketing/utils'

import { SectionGroupHeader } from '../components/SectionGroupHeader'
import {
  SponsorTableRow,
  type TicketingColumnKey,
} from '../components/SponsorTableRow'
import { TicketDetailsDrawer } from '../components/TicketDetailsDrawer'
import {
  ToolbarSelect,
  toolbarControlActiveClassName,
  toolbarControlBaseClassName,
  toolbarControlInactiveClassName,
} from '../components/ToolbarSelect'
import { wehaveV2Theme } from '../theme'

type SortOption = 'season' | 'upcoming'

const columnOptions: Array<{ key: TicketingColumnKey; label: string; width: string }> = [
  { key: 'seasonTotal', label: 'Season total', width: 'minmax(110px,0.5fr)' },
  { key: 'progress', label: 'Progress', width: 'minmax(220px,0.9fr)' },
  { key: 'season', label: 'Season', width: 'minmax(110px,0.45fr)' },
  { key: 'matchdays', label: 'Upcoming matchdays', width: 'minmax(420px,1.55fr)' },
]

export function TicketingWehaveioV2Screen() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState<TicketStatus>('distributed')
  const [sortBy, setSortBy] = useState<SortOption>('season')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isColumnsOpen, setIsColumnsOpen] = useState(false)
  const [visibleColumns, setVisibleColumns] = useState<TicketingColumnKey[]>(
    columnOptions.map((column) => column.key),
  )
  const [expandedSections, setExpandedSections] = useState<string[]>(
    ticketSections.map((section) => section.id),
  )
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const columnsMenuRef = useRef<HTMLDivElement | null>(null)

  const matchdays = getUpcomingMatchdays(ticketSections)
  const selectedMatchId = matchdays[0]?.matchId ?? ''

  const filteredSections = sortSponsors(
    filterSections(ticketSections, searchTerm, 'all'),
    sortBy,
    selectedMatchId,
    status,
  )

  const desktopGridTemplate = useMemo(() => {
    const template = ['minmax(240px,1.2fr)']

    for (const column of columnOptions) {
      if (visibleColumns.includes(column.key)) {
        template.push(column.width)
      }
    }

    template.push('48px')

    return template.join(' ')
  }, [visibleColumns])

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

  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus()
    }
  }, [isSearchOpen])

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!columnsMenuRef.current?.contains(event.target as Node)) {
        setIsColumnsOpen(false)
      }
    }

    if (isColumnsOpen) {
      document.addEventListener('mousedown', handlePointerDown)
    }

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [isColumnsOpen])

  function openSearch() {
    setIsSearchOpen(true)
  }

  function closeSearch() {
    if (!searchTerm) {
      setIsSearchOpen(false)
    }
  }

  function toggleColumn(column: TicketingColumnKey) {
    setVisibleColumns((current) => {
      if (current.includes(column)) {
        if (current.length === 1) {
          return current
        }

        return current.filter((item) => item !== column)
      }

      return columnOptions
        .map((option) => option.key)
        .filter((key) => current.includes(key) || key === column)
    })
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
                    Sponsor ticket allocations across upcoming matchdays.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                    <ToolbarSelect
                      ariaLabel="Status"
                      label="Filter"
                      icon={<Funnel className="h-4 w-4" strokeWidth={2} />}
                      isActive={status !== 'distributed'}
                      value={status}
                      onChange={(value) => setStatus(value as TicketStatus)}
                      options={[
                        { value: 'distributed', label: 'Distributed' },
                        { value: 'allocated', label: 'Allocated' },
                        { value: 'pending', label: 'Pending' },
                      ]}
                    />
                    <div className="relative" ref={columnsMenuRef}>
                      <button
                        type="button"
                        aria-label="Columns"
                        aria-expanded={isColumnsOpen}
                        onClick={() => setIsColumnsOpen((current) => !current)}
                        className={`${toolbarControlBaseClassName} ${
                          visibleColumns.length !== columnOptions.length
                            ? toolbarControlActiveClassName
                            : toolbarControlInactiveClassName
                        }`}
                      >
                        <span className="flex items-center justify-center">
                          <Columns3 className="h-4 w-4 shrink-0" strokeWidth={2} />
                        </span>
                        <span className="whitespace-nowrap">Columns</span>
                      </button>

                      {isColumnsOpen ? (
                        <div className="absolute right-0 z-10 mt-2 w-56 rounded-xl border border-[var(--wehave-v2-border)] bg-[var(--wehave-v2-surface)] p-1.5 shadow-[0_18px_50px_rgba(15,23,42,0.14)]">
                          {columnOptions.map((column) => {
                            const checked = visibleColumns.includes(column.key)

                            return (
                              <button
                                key={column.key}
                                type="button"
                                role="menuitemcheckbox"
                                aria-checked={checked}
                                onClick={() => toggleColumn(column.key)}
                                className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[13px] font-medium text-[var(--wehave-v2-ink)] transition hover:bg-[var(--wehave-v2-surface-soft)]"
                              >
                                <span>{column.label}</span>
                                <span
                                  className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                                    checked
                                      ? 'border-[var(--wehave-v2-primary)] bg-[var(--wehave-v2-primary)] text-white'
                                      : 'border-[var(--wehave-v2-border-strong)] bg-[var(--wehave-v2-surface)] text-transparent'
                                  }`}
                                >
                                  <Check className="h-3 w-3" strokeWidth={2.4} />
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      ) : null}
                    </div>
                    <ToolbarSelect
                      ariaLabel="Sort"
                      label="Sort"
                      icon={
                        sortBy === 'season' ? (
                          <ArrowUpDown className="h-4 w-4" strokeWidth={2} />
                        ) : (
                          <ArrowUp className="h-4 w-4" strokeWidth={2} />
                        )
                      }
                      isActive={sortBy !== 'season'}
                      value={sortBy}
                      onChange={(value) => setSortBy(value as SortOption)}
                      options={[
                        { value: 'season', label: 'Season total' },
                        { value: 'upcoming', label: 'Next fixture' },
                      ]}
                    />

                    {isSearchOpen || searchTerm ? (
                      <label className="relative min-w-[240px] shrink-0">
                        <span className="pointer-events-none absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center text-[var(--wehave-v2-muted)]">
                          <Search className="h-4 w-4 shrink-0" strokeWidth={2} />
                        </span>
                        <input
                          ref={searchInputRef}
                          aria-label="Search"
                          value={searchTerm}
                          onChange={(event) => setSearchTerm(event.target.value)}
                          onBlur={closeSearch}
                          placeholder="Search Assets..."
                          style={{ font: 'inherit' }}
                          className={`flex h-9 w-full rounded-[8.4px] border bg-[var(--wehave-v2-surface)] py-2 pr-3 pl-9 text-sm leading-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] outline-none transition-[color,box-shadow,border-color] placeholder:text-[var(--wehave-v2-muted)] focus-visible:ring-[3px] focus-visible:ring-[rgba(166,133,255,0.45)] ${
                            searchTerm
                              ? 'border-[var(--wehave-v2-primary)] text-[var(--wehave-v2-primary)]'
                              : 'border-[var(--wehave-v2-border)] text-[var(--wehave-v2-ink)]'
                          }`}
                        />
                      </label>
                    ) : (
                      <button
                        type="button"
                        aria-label="Search"
                        onClick={openSearch}
                        className={`${toolbarControlBaseClassName} ${toolbarControlInactiveClassName}`}
                      >
                        <span className="flex items-center justify-center">
                          <Search className="h-4 w-4 shrink-0" strokeWidth={2} />
                        </span>
                        <span className="whitespace-nowrap">Search</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </header>

            <div className="px-3 py-3 sm:px-4 sm:py-4">
              <div className="hidden rounded-[10px] border border-[var(--wehave-v2-border)] bg-[var(--wehave-v2-surface-soft)] px-4 py-3 lg:block">
                <div
                  data-testid="ticketing-columns-header"
                  className="grid items-center gap-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--wehave-v2-muted)]"
                  style={{ gridTemplateColumns: desktopGridTemplate }}
                >
                  <div className="text-left">Sponsor</div>
                  {visibleColumns.includes('seasonTotal') ? (
                    <div className="text-center">Season total</div>
                  ) : null}
                  {visibleColumns.includes('progress') ? (
                    <div className="text-center">Progress</div>
                  ) : null}
                  {visibleColumns.includes('season') ? (
                    <div className="text-center">Season</div>
                  ) : null}
                  {visibleColumns.includes('matchdays') ? (
                    <div className="text-center">Upcoming matchdays</div>
                  ) : null}
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
                                visibleColumns={visibleColumns}
                                desktopGridTemplate={desktopGridTemplate}
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
