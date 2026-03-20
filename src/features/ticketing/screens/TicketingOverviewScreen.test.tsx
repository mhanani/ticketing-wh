import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { TicketingOverviewScreen } from './TicketingOverviewScreen'

function renderScreen(initialEntries: string[] = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <TicketingOverviewScreen />
    </MemoryRouter>,
  )
}

describe('TicketingOverviewScreen', () => {
  it('renders grouped sections and sponsor rows', () => {
    renderScreen()

    expect(screen.getByText('Ticketing Overview')).toBeInTheDocument()
    expect(
      screen.queryByText(
        /Sponsor ticket rights across the next three matchdays/i,
      ),
    ).not.toBeInTheDocument()
    expect(
      screen.getAllByText('Business Seats Section 136').length,
    ).toBeGreaterThan(0)
    expect(screen.getAllByText('Lounge 1880').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Munro').length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText('TechCorp').length).toBeGreaterThan(0)
  })

  it('opens the correct drawer content when a matchday cell is clicked', async () => {
    const user = userEvent.setup()
    renderScreen()

    await user.click(
      screen.getAllByRole('button', { name: 'Munro Everton FC details' })[0]!,
    )

    expect(screen.getByText('Ticket Details')).toBeInTheDocument()
    expect(screen.getAllByText('Matchday 24').length).toBeGreaterThan(0)
    expect(
      screen.getAllByText(/Business Seats Section 136/).length,
    ).toBeGreaterThan(0)
    expect(screen.getByText('Thomas Munro')).toBeInTheDocument()
    expect(screen.getByText('MU-EV-01')).toBeInTheDocument()
    expect(screen.getAllByText('Distributed').length).toBeGreaterThan(0)
  })

  it('filters sponsors by search term without breaking section grouping', async () => {
    const user = userEvent.setup()
    renderScreen()

    await user.type(screen.getByPlaceholderText('Search sponsor...'), 'Globex')

    expect(screen.getAllByText('Lounge 1880').length).toBeGreaterThan(0)
    expect(screen.queryAllByText('TechCorp')).toHaveLength(0)
    expect(screen.getAllByText('Globex Corp').length).toBeGreaterThan(0)
  })

  it('switches matchday cells to the selected ticket status', async () => {
    const user = userEvent.setup()
    renderScreen()

    expect(screen.getAllByText('Distributed').length).toBeGreaterThan(0)

    await user.selectOptions(
      screen.getByDisplayValue('Distributed'),
      'allocated',
    )

    expect(screen.getAllByText('Allocated').length).toBeGreaterThan(0)
    expect(screen.getByDisplayValue('Allocated')).toBeInTheDocument()
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

  it('shows exact desktop status labels from the reference', () => {
    renderScreen()

    expect(screen.getAllByText('Distributed').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Allocated').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0)
    expect(screen.queryByText(/mix/i)).not.toBeInTheDocument()
  })

  it('shows the empty detail state for a matchday without ticket entries', async () => {
    const user = userEvent.setup()
    renderScreen()

    await user.click(
      screen.getAllByRole('button', {
        name: 'TechCorp Chelsea FC details',
      })[0]!,
    )

    expect(screen.getByText('No seats assigned yet')).toBeInTheDocument()
  })
})
