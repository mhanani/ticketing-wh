import { createBrowserRouter } from 'react-router-dom'

import { TicketingOverviewScreen } from '@/features/ticketing/screens/TicketingOverviewScreen'
import { TicketingWehaveioScreen } from '@/features/ticketing-wehaveio/screens/TicketingWehaveioScreen'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TicketingOverviewScreen />,
  },
  {
    path: '/ticketing-wehaveio',
    element: <TicketingWehaveioScreen />,
  },
])
