import type {
  DrawerSelection,
  MatchdaySummary,
  SponsorAllocation,
  TicketSection,
  TicketStatus,
} from './types'

interface SectionRow {
  section: TicketSection
  sponsors: SponsorAllocation[]
}

export interface SelectedTicketSlice {
  section: TicketSection
  sponsor: SponsorAllocation
  matchday: MatchdaySummary
}

export function getUpcomingMatchdays(sections: TicketSection[]) {
  const [firstSection] = sections
  return firstSection?.sponsors[0]?.matchdays ?? []
}

export function filterSections(
  sections: TicketSection[],
  searchTerm: string,
  sectionId: string,
) {
  const normalizedSearch = searchTerm.trim().toLowerCase()

  return sections
    .filter((section) => sectionId === 'all' || section.id === sectionId)
    .map((section) => {
      const sponsors = section.sponsors.filter((allocation) => {
        const matchesSearch =
          normalizedSearch.length === 0 ||
          allocation.sponsor.name.toLowerCase().includes(normalizedSearch) ||
          allocation.sponsor.tier.toLowerCase().includes(normalizedSearch)

        return matchesSearch
      })

      return { section, sponsors }
    })
    .filter((row) => row.sponsors.length > 0)
}

export function sortSponsors(
  rows: SectionRow[],
  sortBy: 'season' | 'upcoming',
  selectedMatchId: string,
  selectedStatus: TicketStatus,
) {
  return rows.map((row) => ({
    ...row,
    sponsors: [...row.sponsors].sort((left, right) => {
      if (sortBy === 'season') {
        return right.seasonTotal - left.seasonTotal
      }

      return (
        getMatchdayMetric(right, selectedMatchId, selectedStatus) -
        getMatchdayMetric(left, selectedMatchId, selectedStatus)
      )
    }),
  }))
}

function getMatchdayMetric(
  sponsor: SponsorAllocation,
  matchId: string,
  status: TicketStatus,
) {
  const matchday = sponsor.matchdays.find((item) => item.matchId === matchId)
  if (!matchday) {
    return 0
  }

  return matchday[status]
}

export function getSelectedTicketSlice(
  sections: TicketSection[],
  selection: DrawerSelection | null,
): SelectedTicketSlice | null {
  if (!selection) {
    return null
  }

  const section = sections.find((item) => item.id === selection.sectionId)
  const sponsor = section?.sponsors.find(
    (item) => item.sponsor.id === selection.sponsorId,
  )
  const matchday = sponsor?.matchdays.find(
    (item) => item.matchId === selection.matchId,
  )

  if (!section || !sponsor || !matchday) {
    return null
  }

  return { section, sponsor, matchday }
}
