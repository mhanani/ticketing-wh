import { createBrowserRouter } from 'react-router-dom'

import { TicketingOverviewScreen } from '@/features/ticketing/screens/TicketingOverviewScreen'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TicketingOverviewScreen />,
  },
])
