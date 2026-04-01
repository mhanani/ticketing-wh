import { createBrowserRouter } from 'react-router-dom'

import { AppShell } from '@/app/AppShell'
import { PlaceholderScreen } from '@/app/PlaceholderScreen'
import { TicketingWehaveioV2Screen } from '@/features/ticketing-wehaveio-v2/screens/TicketingWehaveioV2Screen'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <PlaceholderScreen title="Home" description="Starter workspace screen placeholder inside the simulated Wehave app shell." />,
        handle: { title: 'Home' },
      },
      {
        path: 'planning',
        element: <PlaceholderScreen title="Planning" description="Planning page shell placeholder to mirror the real product drawer/navigation structure." />,
        handle: { title: 'Planning' },
      },
      {
        path: 'tasks',
        element: <PlaceholderScreen title="Tasks" description="Tasks page placeholder for the simulated app OS workspace." />,
        handle: { title: 'Tasks' },
      },
      {
        path: 'contacts',
        element: <PlaceholderScreen title="Contacts" description="Contacts page placeholder for the simulated app OS workspace." />,
        handle: { title: 'Contacts' },
      },
      {
        path: 'partners',
        element: <PlaceholderScreen title="Partners" description="Partners page placeholder for the simulated app OS workspace." />,
        handle: { title: 'Partners' },
      },
      {
        path: 'deals',
        element: <PlaceholderScreen title="Deals" description="Deals page placeholder for the simulated app OS workspace." />,
        handle: { title: 'Deals' },
      },
      {
        path: 'contracts',
        element: <PlaceholderScreen title="Contracts" description="Contracts page placeholder for the simulated app OS workspace." />,
        handle: { title: 'Contracts' },
      },
      {
        path: 'invoices',
        element: <PlaceholderScreen title="Invoices" description="Invoices page placeholder for the simulated app OS workspace." />,
        handle: { title: 'Invoices' },
      },
      {
        path: 'assets',
        element: <PlaceholderScreen title="Assets" description="Assets page placeholder for the simulated app OS workspace." />,
        handle: { title: 'Assets' },
      },
      {
        path: 'packages',
        element: <PlaceholderScreen title="Packages" description="Packages page placeholder for the simulated app OS workspace." />,
        handle: { title: 'Packages' },
      },
      {
        path: 'matchdays',
        element: <PlaceholderScreen title="Matchdays" description="Matchdays page placeholder for the simulated app OS workspace." />,
        handle: { title: 'Matchdays' },
      },
      {
        path: 'seasons',
        element: <PlaceholderScreen title="Seasons" description="Seasons page placeholder for the simulated app OS workspace." />,
        handle: { title: 'Seasons' },
      },
      {
        path: 'events',
        element: <PlaceholderScreen title="Events" description="Events page placeholder for the simulated app OS workspace." />,
        handle: { title: 'Events' },
      },
      {
        path: 'ticketing-wehaveio',
        element: <TicketingWehaveioV2Screen />,
        handle: { title: 'Tickets' },
      },
    ],
  },
])
