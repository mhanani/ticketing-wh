import {
  ArrowUp,
  ArrowUpDown,
  ChevronDown,
  Columns3,
  Download,
  Funnel,
  Search,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { seasonOptions, ticketSectionsBySeason } from '@/mocks/ticketing'
import { exportTicketingCsv } from '@/shared/ticketing/export'
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

type SortOption = 'season' | 'upcoming'

const columnOptions: Array<{
  key: TicketingColumnKey
  label: string
  width: string
}> = [
  { key: 'seasonTotal', label: 'Season total', width: 'minmax(110px,0.5fr)' },
  { key: 'progress', label: 'Progress', width: 'minmax(220px,0.9fr)' },
  {
    key: 'matchdays',
    label: 'Upcoming matchdays',
    width: 'minmax(420px,1.55fr)',
  },
]

export function TicketingWehaveioV2Screen() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [status, setStatus] = useState<TicketStatus>('distributed')
  const [sortBy, setSortBy] = useState<SortOption>('season')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [visibleColumns, setVisibleColumns] = useState<TicketingColumnKey[]>(
    columnOptions.map((column) => column.key),
  )
  const [season, setSeason] = useState(seasonOptions[0].value)
  const sections = ticketSectionsBySeason[season] ?? []
  const [expandedSections, setExpandedSections] = useState<string[]>(
    sections.map((s) => s.id),
  )
  const [prevSeason, setPrevSeason] = useState(season)
  if (prevSeason !== season) {
    setPrevSeason(season)
    setExpandedSections(sections.map((s) => s.id))
  }
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const matchdays = getUpcomingMatchdays(sections)
  const selectedMatchId = matchdays[0]?.matchId ?? ''

  const filteredSections = sortSponsors(
    filterSections(sections, searchTerm, 'all'),
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

  const isSortActive = sortBy !== 'season'
  const isFilterActive = status !== 'distributed'
  const isColumnsActive = visibleColumns.length !== columnOptions.length

  return (
    <div className="min-h-full bg-background text-muted-foreground">
      <div className="flex min-h-full w-full">
        <main className="min-w-0 flex-1">
          <section className="min-h-[calc(100vh-4.5rem)] overflow-hidden bg-background">
            <header className="px-4 py-4 sm:px-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0 space-y-4">
                    <h1 className="truncate text-3xl font-bold text-foreground">
                      Tickets
                    </h1>
                    <div className="flex flex-wrap items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-primary/18 bg-primary/8 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/12"
                        >
                          {seasonOptions.find((o) => o.value === season)?.label}
                          <ChevronDown className="h-3 w-3" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                          <DropdownMenuRadioGroup
                            value={season}
                            onValueChange={setSeason}
                          >
                            {seasonOptions.map((option) => (
                              <DropdownMenuRadioItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </DropdownMenuRadioItem>
                            ))}
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="min-w-0 text-sm text-muted-foreground">
                      Sponsor ticket allocations across upcoming matchdays.
                    </p>
                  </div>

                  {/* Toolbar — matches wehave.io button bar */}
                  <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                    {/* Search */}
                    {isSearchOpen || searchTerm ? (
                      <label
                        className={buttonVariants({
                          variant: searchTerm ? 'active' : 'outline',
                          className:
                            'relative min-w-[240px] cursor-text ring-[3px] ring-primary/25 border-primary',
                        })}
                      >
                        <Search
                          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#70717b]"
                          aria-hidden="true"
                        />
                        <input
                          ref={searchInputRef}
                          aria-label="Search"
                          value={searchTerm}
                          onChange={(event) =>
                            setSearchTerm(event.target.value)
                          }
                          onBlur={closeSearch}
                          placeholder="Search sponsors..."
                          className="h-full w-full bg-transparent pl-7 text-sm outline-none placeholder:text-muted-foreground"
                        />
                      </label>
                    ) : (
                      <Button
                        variant="outline"
                        size="default"
                        aria-label="Search"
                        onClick={openSearch}
                      >
                        <Search className="h-4 w-4" />
                        Search
                      </Button>
                    )}

                    {/* Sort */}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className={buttonVariants({
                          variant: isSortActive ? 'active' : 'outline',
                        })}
                      >
                        {isSortActive ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="h-4 w-4" />
                        )}
                        Sort
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={sortBy}
                            onValueChange={(value) =>
                              setSortBy(value as SortOption)
                            }
                          >
                            <DropdownMenuRadioItem value="season">
                              Season total
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="upcoming">
                              Next fixture
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Filter */}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className={buttonVariants({
                          variant: isFilterActive ? 'active' : 'outline',
                        })}
                      >
                        <Funnel className="h-4 w-4" />
                        Filter
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={status}
                            onValueChange={(value) =>
                              setStatus(value as TicketStatus)
                            }
                          >
                            <DropdownMenuRadioItem value="distributed">
                              Distributed
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="allocated">
                              Allocated
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="pending">
                              Pending
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Columns */}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className={buttonVariants({
                          variant: isColumnsActive ? 'active' : 'outline',
                        })}
                      >
                        <Columns3 className="h-4 w-4" />
                        Columns
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52">
                        {columnOptions.map((column) => (
                          <DropdownMenuCheckboxItem
                            key={column.key}
                            checked={visibleColumns.includes(column.key)}
                            onCheckedChange={() => toggleColumn(column.key)}
                          >
                            {column.label}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Export CTA */}
                    <Button
                      className="bg-[#5736F3] text-white hover:bg-[#4829E6]"
                      onClick={() => exportTicketingCsv(sections, season)}
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            <div className="px-3 py-3 sm:px-4 sm:py-4">
              <div className="hidden rounded-[10px] border border-border/60 bg-gradient-to-br from-[#fafafc] to-white px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] lg:block">
                <div
                  data-testid="ticketing-columns-header"
                  className="grid items-center gap-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
                  style={{ gridTemplateColumns: desktopGridTemplate }}
                >
                  <div className="text-left">Sponsor</div>
                  {visibleColumns.includes('seasonTotal') ? (
                    <div className="text-center">Season total</div>
                  ) : null}
                  {visibleColumns.includes('progress') ? (
                    <div className="text-center">Progress</div>
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
                      <section key={section.id}>
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
                          <div className="relative ml-5 pl-5 sm:ml-6 sm:pl-6">
                            {/* Tree line */}
                            <div className="absolute bottom-4 left-0 top-0 w-px bg-border/80" />

                            <div className="grid grid-cols-[1fr_auto] gap-4 bg-[#fafafc] px-4 py-2 text-[11px] text-muted-foreground sm:hidden">
                              <span>Sponsors</span>
                              <span>Upcoming</span>
                            </div>
                            {sponsors.map((sponsor, index) => (
                              <div key={`${section.id}-${sponsor.sponsor.id}`} className="relative">
                                {/* Tree branch */}
                                <div className="absolute left-[-20px] top-1/2 h-px w-4 bg-border/80 sm:left-[-24px] sm:w-5" />
                                {index > 0 ? (
                                  <div className="border-t border-border/40" />
                                ) : null}
                                <SponsorTableRow
                                  section={section}
                                  sponsor={sponsor}
                                  metricStatus={status}
                                  visibleColumns={visibleColumns}
                                  desktopGridTemplate={desktopGridTemplate}
                                  onOpenDetails={openDetails}
                                />
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </section>
                    )
                  })
                ) : (
                  <div className="rounded-[10px] border border-dashed border-border/60 bg-gradient-to-br from-[#fafafc] to-white px-6 py-16 text-center shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                    <p className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                      No sponsors match this view
                    </p>
                    <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
                      Try widening the search or removing the active filters.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>

        <TicketDetailsDrawer
          sections={sections}
          selection={drawerSelection}
          onClose={closeDetails}
        />
      </div>
    </div>
  )
}
