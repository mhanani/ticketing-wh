import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('App routes', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/')
    vi.resetModules()
  })

  it('renders the existing ticketing overview on the default route', async () => {
    vi.doMock('@/features/ticketing/screens/TicketingOverviewScreen', () => ({
      TicketingOverviewScreen: () => <div>default-route-screen</div>,
    }))
    vi.doMock(
      '@/features/ticketing-wehaveio/screens/TicketingWehaveioScreen',
      () => ({
        TicketingWehaveioScreen: () => <div>wehaveio-route-screen</div>,
      }),
    )

    const { App } = await import('./App')

    render(<App />)

    expect(screen.getByText('default-route-screen')).toBeInTheDocument()
    expect(screen.queryByText('wehaveio-route-screen')).not.toBeInTheDocument()
  })

  it('renders the wehaveio ticketing feature on /ticketing-wehaveio', async () => {
    window.history.replaceState({}, '', '/ticketing-wehaveio')

    vi.doMock('@/features/ticketing/screens/TicketingOverviewScreen', () => ({
      TicketingOverviewScreen: () => <div>default-route-screen</div>,
    }))
    vi.doMock(
      '@/features/ticketing-wehaveio/screens/TicketingWehaveioScreen',
      () => ({
        TicketingWehaveioScreen: () => <div>wehaveio-route-screen</div>,
      }),
    )

    const { App } = await import('./App')

    render(<App />)

    expect(screen.getByText('wehaveio-route-screen')).toBeInTheDocument()
    expect(screen.queryByText('default-route-screen')).not.toBeInTheDocument()
  })
})
