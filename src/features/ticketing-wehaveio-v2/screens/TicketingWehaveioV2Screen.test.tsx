import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { TicketingWehaveioV2Screen } from './TicketingWehaveioV2Screen'

function renderScreen(initialEntries: string[] = ['/ticketing-wehaveio-v2']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <TicketingWehaveioV2Screen />
    </MemoryRouter>,
  )
}

describe('TicketingWehaveioV2Screen', () => {
  it('renders the v2 grouped layout and table-style columns', () => {
    renderScreen()

    expect(
      screen.getByText(
        'Rights-page density adapted for multi-sponsor ticket allocations.',
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('Upcoming matchdays')).toBeInTheDocument()
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

  it('switches the status metric through the toolbar', async () => {
    const user = userEvent.setup()
    renderScreen()

    await user.selectOptions(screen.getByLabelText('Status'), 'allocated')

    expect(screen.getByDisplayValue('Allocated')).toBeInTheDocument()
    expect(screen.getAllByText('Allocated').length).toBeGreaterThan(0)
  })

  it('collapses and expands a section group', async () => {
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

  it('opens the v2 details drawer from a matchday cell and preserves selection state', async () => {
    const user = userEvent.setup()
    renderScreen()

    await user.click(
      screen.getAllByRole('button', { name: 'Munro Everton FC details' })[0]!,
    )

    expect(screen.getByText('Ticket details')).toBeInTheDocument()
    expect(screen.getByText('Assigned and reserved seats for the selected matchday.')).toBeInTheDocument()
    expect(screen.getByText('Thomas Munro')).toBeInTheDocument()
  })

  it('renders an empty state when the search removes all sponsors', async () => {
    const user = userEvent.setup()
    renderScreen()

    await user.type(screen.getByPlaceholderText('Search sponsor...'), 'NoMatch')

    expect(screen.getByText('No sponsors match this view')).toBeInTheDocument()
  })
})
