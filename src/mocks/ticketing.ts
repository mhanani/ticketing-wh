import type { TicketSection } from '@/shared/ticketing/types'

export const seasonLabel = 'Season 2025 / 26'

export const ticketSections: TicketSection[] = [
  {
    id: 'business-136',
    label: 'Business Seats Section 136',
    capacity: 200,
    sponsors: [
      {
        sponsor: {
          id: 'munro',
          name: 'Munro',
          tier: 'Partner',
          badge: 'MU',
          accent: '#5020E5',
        },
        seasonTotal: 45,
        matchdays: [
          {
            matchId: 'everton',
            opponent: 'Everton FC',
            date: 'Aug 24',
            distributed: 12,
            allocated: 7,
            pending: 6,
          },
          {
            matchId: 'arsenal',
            opponent: 'Arsenal FC',
            date: 'Sep 14',
            distributed: 8,
            allocated: 5,
            pending: 3,
          },
          {
            matchId: 'chelsea',
            opponent: 'Chelsea FC',
            date: 'Sep 27',
            distributed: 15,
            allocated: 5,
            pending: 4,
          },
        ],
        detailsByMatchday: {
          everton: [
            {
              ticketId: 'MU-EV-01',
              holderName: 'Thomas Munro',
              seatLabel: 'A-12',
              status: 'distributed',
              deliveryType: 'Mobile Pass',
            },
            {
              ticketId: 'MU-EV-02',
              holderName: 'Alicia Ford',
              seatLabel: 'A-13',
              status: 'distributed',
              deliveryType: 'Mobile Pass',
            },
            {
              ticketId: 'MU-EV-03',
              holderName: 'Nina Collins',
              seatLabel: 'A-14',
              status: 'allocated',
              deliveryType: 'PDF Invite',
            },
            {
              ticketId: 'MU-EV-04',
              holderName: 'Guest Hold',
              seatLabel: 'A-15',
              status: 'pending',
              deliveryType: 'Guest List',
            },
          ],
          arsenal: [
            {
              ticketId: 'MU-AR-01',
              holderName: 'Theo Parker',
              seatLabel: 'A-20',
              status: 'distributed',
              deliveryType: 'Mobile Pass',
            },
            {
              ticketId: 'MU-AR-02',
              holderName: 'Natalie Cruz',
              seatLabel: 'A-21',
              status: 'allocated',
              deliveryType: 'PDF Invite',
            },
            {
              ticketId: 'MU-AR-03',
              holderName: 'Open Guest',
              seatLabel: 'A-22',
              status: 'pending',
              deliveryType: 'Guest List',
            },
          ],
          chelsea: [
            {
              ticketId: 'MU-CH-01',
              holderName: 'Dylan Moore',
              seatLabel: 'A-31',
              status: 'distributed',
              deliveryType: 'Mobile Pass',
            },
            {
              ticketId: 'MU-CH-02',
              holderName: 'Lina Wells',
              seatLabel: 'A-32',
              status: 'distributed',
              deliveryType: 'Mobile Pass',
            },
            {
              ticketId: 'MU-CH-03',
              holderName: 'Event Pool',
              seatLabel: 'A-33',
              status: 'pending',
              deliveryType: 'Guest List',
            },
          ],
        },
      },
      {
        sponsor: {
          id: 'techcorp',
          name: 'TechCorp',
          tier: 'Partner',
          badge: 'TE',
          accent: '#A12CC8',
        },
        seasonTotal: 30,
        matchdays: [
          {
            matchId: 'everton',
            opponent: 'Everton FC',
            date: 'Aug 24',
            distributed: 10,
            allocated: 4,
            pending: 2,
          },
          {
            matchId: 'arsenal',
            opponent: 'Arsenal FC',
            date: 'Sep 14',
            distributed: 5,
            allocated: 4,
            pending: 2,
          },
          {
            matchId: 'chelsea',
            opponent: 'Chelsea FC',
            date: 'Sep 27',
            distributed: 10,
            allocated: 3,
            pending: 1,
          },
        ],
        detailsByMatchday: {
          everton: [
            {
              ticketId: 'TE-EV-01',
              holderName: 'Rachel Kim',
              seatLabel: 'B-03',
              status: 'distributed',
              deliveryType: 'Mobile Pass',
            },
            {
              ticketId: 'TE-EV-02',
              holderName: 'Open Invite',
              seatLabel: 'B-04',
              status: 'pending',
              deliveryType: 'Guest List',
            },
          ],
          arsenal: [
            {
              ticketId: 'TE-AR-01',
              holderName: 'Carlos Ng',
              seatLabel: 'B-08',
              status: 'allocated',
              deliveryType: 'PDF Invite',
            },
          ],
          chelsea: [],
        },
      },
    ],
  },
  {
    id: 'lounge-1880',
    label: 'Lounge 1880',
    capacity: 150,
    sponsors: [
      {
        sponsor: {
          id: 'munro-lounge',
          name: 'Munro',
          tier: 'Partner',
          badge: 'MU',
          accent: '#5020E5',
        },
        seasonTotal: 20,
        matchdays: [
          {
            matchId: 'everton',
            opponent: 'Everton FC',
            date: 'Aug 24',
            distributed: 5,
            allocated: 4,
            pending: 1,
          },
          {
            matchId: 'arsenal',
            opponent: 'Arsenal FC',
            date: 'Sep 14',
            distributed: 5,
            allocated: 5,
            pending: 0,
          },
          {
            matchId: 'chelsea',
            opponent: 'Chelsea FC',
            date: 'Sep 27',
            distributed: 5,
            allocated: 3,
            pending: 2,
          },
        ],
        detailsByMatchday: {
          everton: [
            {
              ticketId: 'ML-EV-01',
              holderName: 'Lea Martin',
              seatLabel: 'L-11',
              status: 'distributed',
              deliveryType: 'Mobile Pass',
            },
            {
              ticketId: 'ML-EV-02',
              holderName: 'James Hunt',
              seatLabel: 'L-12',
              status: 'allocated',
              deliveryType: 'PDF Invite',
            },
          ],
          arsenal: [
            {
              ticketId: 'ML-AR-01',
              holderName: 'Tessa Hill',
              seatLabel: 'L-16',
              status: 'distributed',
              deliveryType: 'Mobile Pass',
            },
          ],
          chelsea: [
            {
              ticketId: 'ML-CH-01',
              holderName: 'Flexible Allocation',
              seatLabel: 'L-22',
              status: 'pending',
              deliveryType: 'Guest List',
            },
          ],
        },
      },
      {
        sponsor: {
          id: 'globex',
          name: 'Globex Corp',
          tier: 'Strategic Sponsor',
          badge: 'GL',
          accent: '#E11D74',
        },
        seasonTotal: 25,
        matchdays: [
          {
            matchId: 'everton',
            opponent: 'Everton FC',
            date: 'Aug 24',
            distributed: 8,
            allocated: 4,
            pending: 3,
          },
          {
            matchId: 'arsenal',
            opponent: 'Arsenal FC',
            date: 'Sep 14',
            distributed: 4,
            allocated: 3,
            pending: 2,
          },
          {
            matchId: 'chelsea',
            opponent: 'Chelsea FC',
            date: 'Sep 27',
            distributed: 8,
            allocated: 2,
            pending: 1,
          },
        ],
        detailsByMatchday: {
          everton: [
            {
              ticketId: 'GL-EV-01',
              holderName: 'Clara West',
              seatLabel: 'G-02',
              status: 'distributed',
              deliveryType: 'Mobile Pass',
            },
            {
              ticketId: 'GL-EV-02',
              holderName: 'Sponsor Guest',
              seatLabel: 'G-03',
              status: 'pending',
              deliveryType: 'Guest List',
            },
          ],
          arsenal: [
            {
              ticketId: 'GL-AR-01',
              holderName: 'Noah Reed',
              seatLabel: 'G-07',
              status: 'allocated',
              deliveryType: 'PDF Invite',
            },
          ],
          chelsea: [
            {
              ticketId: 'GL-CH-01',
              holderName: 'Mina Shah',
              seatLabel: 'G-11',
              status: 'distributed',
              deliveryType: 'Mobile Pass',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'press-club',
    label: 'Press Club',
    capacity: 120,
    sponsors: [
      {
        sponsor: {
          id: 'munro-press',
          name: 'Munro',
          tier: 'Partner',
          badge: 'MU',
          accent: '#5020E5',
        },
        seasonTotal: 18,
        matchdays: [
          {
            matchId: 'everton',
            opponent: 'Everton FC',
            date: 'Aug 24',
            distributed: 6,
            allocated: 3,
            pending: 1,
          },
          {
            matchId: 'arsenal',
            opponent: 'Arsenal FC',
            date: 'Sep 14',
            distributed: 4,
            allocated: 4,
            pending: 0,
          },
          {
            matchId: 'chelsea',
            opponent: 'Chelsea FC',
            date: 'Sep 27',
            distributed: 5,
            allocated: 2,
            pending: 2,
          },
        ],
        detailsByMatchday: {
          everton: [
            {
              ticketId: 'MP-EV-01',
              holderName: 'Sophie Lane',
              seatLabel: 'P-04',
              status: 'distributed',
              deliveryType: 'Mobile Pass',
            },
            {
              ticketId: 'MP-EV-02',
              holderName: 'Owen Blake',
              seatLabel: 'P-05',
              status: 'allocated',
              deliveryType: 'PDF Invite',
            },
          ],
          arsenal: [
            {
              ticketId: 'MP-AR-01',
              holderName: 'Media Guest',
              seatLabel: 'P-09',
              status: 'allocated',
              deliveryType: 'Guest List',
            },
          ],
          chelsea: [
            {
              ticketId: 'MP-CH-01',
              holderName: 'Ava Turner',
              seatLabel: 'P-11',
              status: 'distributed',
              deliveryType: 'Mobile Pass',
            },
          ],
        },
      },
      {
        sponsor: {
          id: 'northstar',
          name: 'Northstar Media',
          tier: 'Media Partner',
          badge: 'NS',
          accent: '#0F8B8D',
        },
        seasonTotal: 14,
        matchdays: [
          {
            matchId: 'everton',
            opponent: 'Everton FC',
            date: 'Aug 24',
            distributed: 4,
            allocated: 2,
            pending: 1,
          },
          {
            matchId: 'arsenal',
            opponent: 'Arsenal FC',
            date: 'Sep 14',
            distributed: 3,
            allocated: 2,
            pending: 1,
          },
          {
            matchId: 'chelsea',
            opponent: 'Chelsea FC',
            date: 'Sep 27',
            distributed: 4,
            allocated: 1,
            pending: 1,
          },
        ],
        detailsByMatchday: {
          everton: [
            {
              ticketId: 'NS-EV-01',
              holderName: 'Luca Hayes',
              seatLabel: 'P-18',
              status: 'distributed',
              deliveryType: 'Mobile Pass',
            },
          ],
          arsenal: [
            {
              ticketId: 'NS-AR-01',
              holderName: 'Rhea Cole',
              seatLabel: 'P-20',
              status: 'allocated',
              deliveryType: 'PDF Invite',
            },
          ],
          chelsea: [],
        },
      },
    ],
  },
]
