import type { TicketSection } from './types'

interface ExportRow {
  section: string
  sectionCapacity: number
  sponsor: string
  tier: string
  seasonTotal: number
  matchday: string
  date: string
  distributed: number
  allocated: number
  pending: number
  ticketId: string
  holderName: string
  seatLabel: string
  ticketStatus: string
  deliveryType: string
}

const HEADERS: Array<{ key: keyof ExportRow; label: string }> = [
  { key: 'section', label: 'Section' },
  { key: 'sectionCapacity', label: 'Section Capacity' },
  { key: 'sponsor', label: 'Sponsor' },
  { key: 'tier', label: 'Tier' },
  { key: 'seasonTotal', label: 'Season Total' },
  { key: 'matchday', label: 'Opponent' },
  { key: 'date', label: 'Date' },
  { key: 'distributed', label: 'Distributed' },
  { key: 'allocated', label: 'Allocated' },
  { key: 'pending', label: 'Pending' },
  { key: 'ticketId', label: 'Ticket ID' },
  { key: 'holderName', label: 'Holder Name' },
  { key: 'seatLabel', label: 'Seat' },
  { key: 'ticketStatus', label: 'Ticket Status' },
  { key: 'deliveryType', label: 'Delivery Type' },
]

function flattenSections(sections: TicketSection[]): ExportRow[] {
  const rows: ExportRow[] = []

  for (const section of sections) {
    for (const allocation of section.sponsors) {
      for (const matchday of allocation.matchdays) {
        const details = allocation.detailsByMatchday[matchday.matchId] ?? []

        if (details.length === 0) {
          rows.push({
            section: section.label,
            sectionCapacity: section.capacity,
            sponsor: allocation.sponsor.name,
            tier: allocation.sponsor.tier,
            seasonTotal: allocation.seasonTotal,
            matchday: matchday.opponent,
            date: matchday.date,
            distributed: matchday.distributed,
            allocated: matchday.allocated,
            pending: matchday.pending,
            ticketId: '',
            holderName: '',
            seatLabel: '',
            ticketStatus: '',
            deliveryType: '',
          })
        } else {
          for (const detail of details) {
            rows.push({
              section: section.label,
              sectionCapacity: section.capacity,
              sponsor: allocation.sponsor.name,
              tier: allocation.sponsor.tier,
              seasonTotal: allocation.seasonTotal,
              matchday: matchday.opponent,
              date: matchday.date,
              distributed: matchday.distributed,
              allocated: matchday.allocated,
              pending: matchday.pending,
              ticketId: detail.ticketId,
              holderName: detail.holderName,
              seatLabel: detail.seatLabel,
              ticketStatus: detail.status,
              deliveryType: detail.deliveryType,
            })
          }
        }
      }
    }
  }

  return rows
}

function escapeCsvField(value: string | number): string {
  const str = String(value)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function rowsToCsv(rows: ExportRow[]): string {
  const headerLine = HEADERS.map((h) => escapeCsvField(h.label)).join(',')
  const dataLines = rows.map((row) =>
    HEADERS.map((h) => escapeCsvField(row[h.key])).join(','),
  )
  return [headerLine, ...dataLines].join('\n')
}

function downloadBlob(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function exportTicketingCsv(
  sections: TicketSection[],
  season: string,
) {
  const rows = flattenSections(sections)
  const csv = rowsToCsv(rows)
  const filename = `ticketing-${season}.csv`
  downloadBlob(csv, filename)
}
