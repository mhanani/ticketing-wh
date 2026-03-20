export type TicketStatus = 'allocated' | 'distributed' | 'pending'

export type DeliveryType = 'Mobile Pass' | 'PDF Invite' | 'Guest List'

export interface MatchdaySummary {
  matchId: string
  opponent: string
  date: string
  allocated: number
  distributed: number
  pending: number
}

export interface TicketDetail {
  ticketId: string
  holderName: string
  seatLabel: string
  status: TicketStatus
  deliveryType: DeliveryType
}

export interface SponsorIdentity {
  id: string
  name: string
  tier: string
  badge: string
  accent: string
}

export interface SponsorAllocation {
  sponsor: SponsorIdentity
  seasonTotal: number
  matchdays: MatchdaySummary[]
  detailsByMatchday: Record<string, TicketDetail[]>
}

export interface TicketSection {
  id: string
  label: string
  capacity: number
  sponsors: SponsorAllocation[]
}

export interface TicketingFilterState {
  searchTerm: string
  status?: TicketStatus | 'all'
  sectionId?: string | 'all'
}

export interface DrawerSelection {
  sectionId: string
  sponsorId: string
  matchId: string
}
