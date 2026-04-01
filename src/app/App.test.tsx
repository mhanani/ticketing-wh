import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('App routes', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/')
    vi.resetModules()
  })

  it('renders the simulated home screen on the default route', async () => {
    const { App } = await import('./App')

    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Home', level: 1 }),
    ).toBeInTheDocument()
  })

  it('renders the wehaveio ticketing feature on /ticketing-wehaveio', async () => {
    window.history.replaceState({}, '', '/ticketing-wehaveio')

    vi.doMock(
      '@/features/ticketing-wehaveio-v2/screens/TicketingWehaveioV2Screen',
      () => ({
        TicketingWehaveioV2Screen: () => <div>wehaveio-v2-route-screen</div>,
      }),
    )

    const { App } = await import('./App')

    render(<App />)

    expect(screen.getByText('wehaveio-v2-route-screen')).toBeInTheDocument()
  })
})
