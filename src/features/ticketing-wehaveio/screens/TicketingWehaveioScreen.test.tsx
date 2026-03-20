import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { TicketingWehaveioScreen } from './TicketingWehaveioScreen'

function renderScreen(initialEntries: string[] = ['/ticketing-wehaveio']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <TicketingWehaveioScreen />
    </MemoryRouter>,
  )
}

describe('TicketingWehaveioScreen', () => {
  it('renders the redesigned header and grouped rows', () => {
    renderScreen()

    expect(screen.getByText('Ticketing Overview')).toBeInTheDocument()
    expect(
      screen.queryByText(/wehave.io inspired workspace/i),
    ).not.toBeInTheDocument()
    expect(screen.getAllByText('Business Seats Section 136').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Munro').length).toBeGreaterThanOrEqual(2)
  })

  it('filters sponsors by search term', async () => {
    const user = userEvent.setup()
    renderScreen()

    await user.type(screen.getByPlaceholderText('Search sponsor...'), 'Globex')

    expect(screen.queryAllByText('TechCorp')).toHaveLength(0)
    expect(screen.getAllByText('Globex Corp').length).toBeGreaterThan(0)
  })

  it('switches matchday cells to the selected ticket status', async () => {
    const user = userEvent.setup()
    renderScreen()

    await user.selectOptions(screen.getByDisplayValue('Distributed'), 'allocated')

    expect(screen.getByDisplayValue('Allocated')).toBeInTheDocument()
    expect(screen.getAllByText('Allocated').length).toBeGreaterThan(0)
  })

  it('collapses and re-expands a section header', async () => {
    const user = userEvent.setup()
    renderScreen()

    const sectionToggle = screen.getByRole('button', {
      name: 'Business Seats Section 136 section',
    })

    expect(screen.getAllByText('TechCorp').length).toBeGreaterThan(0)

    await user.click(sectionToggle)
    expect(screen.queryAllByText('TechCorp')).toHaveLength(0)

    await user.click(sectionToggle)
    expect(screen.getAllByText('TechCorp').length).toBeGreaterThan(0)
  })

  it('opens the restyled details drawer from a matchday cell', async () => {
    const user = userEvent.setup()
    renderScreen()

    await user.click(
      screen.getAllByRole('button', { name: 'Munro Everton FC details' })[0]!,
    )

    expect(screen.getByText('Ticket details')).toBeInTheDocument()
    expect(screen.getAllByText('Matchday 24').length).toBeGreaterThan(0)
    expect(screen.getByText('Thomas Munro')).toBeInTheDocument()
  })
})
