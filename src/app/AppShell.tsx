import { NavLink, Outlet, useMatches } from 'react-router-dom'

interface NavItem {
  label: string
  to: string
  disabled?: boolean
}

interface NavGroup {
  label: string | null
  items: NavItem[]
}

const navigationGroups: NavGroup[] = [
  {
    label: null,
    items: [{ label: 'Home', to: '/' }, { label: 'Planning', to: '/planning' }, { label: 'Tasks', to: '/tasks' }],
  },
  {
    label: 'Sales',
    items: [
      { label: 'Contacts', to: '/contacts' },
      { label: 'Partners', to: '/partners' },
      { label: 'Deals', to: '/deals' },
      { label: 'Contracts', to: '/contracts' },
      { label: 'Invoices', to: '/invoices' },
    ],
  },
  {
    label: 'Inventory',
    items: [
      { label: 'Assets', to: '/assets' },
      { label: 'Packages', to: '/packages' },
    ],
  },
  {
    label: 'Ticketing',
    items: [{ label: 'Tickets', to: '/ticketing-wehaveio' }],
  },
  {
    label: 'Fixtures',
    items: [
      { label: 'Matchdays', to: '/matchdays' },
      { label: 'Seasons', to: '/seasons' },
      { label: 'Events', to: '/events', disabled: true },
    ],
  },
]

export function AppShell() {
  const matches = useMatches()
  const currentTitle =
    matches.at(-1)?.handle && typeof matches.at(-1)?.handle === 'object'
      ? (matches.at(-1)?.handle as { title?: string }).title ?? 'Workspace'
      : 'Workspace'

  return (
    <div className="min-h-screen bg-[#f9f9fa] text-[#52525b]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[232px] shrink-0 border-r border-[#e4e4e7] bg-[#f9f9fa] lg:flex lg:flex-col">
          <div className="border-b border-[#e4e4e7] px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#5736f3] text-[11px] font-semibold text-white">
                D
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-[#09090b]">
                  Daily
                </div>
                <div className="truncate text-xs text-[#71717b]">Workspace</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-3">
            {navigationGroups.map((group) => (
              <div key={group.label ?? 'main'} className="mb-4 last:mb-0">
                {group.label ? (
                  <div className="px-2 pb-1 text-[11px] font-medium text-[#a1a1aa]">
                    {group.label}
                  </div>
                ) : null}
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.disabled ? '#' : item.to}
                      onClick={(event) => {
                        if (item.disabled) event.preventDefault()
                      }}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-[8px] px-2.5 py-2 text-sm transition ${
                          item.disabled
                            ? 'cursor-not-allowed text-[#a1a1aa] opacity-60'
                            : isActive
                              ? 'bg-[#f4f4f5] font-medium text-[#09090b]'
                              : 'text-[#27272a] hover:bg-[#f4f4f5]'
                        }`
                      }
                    >
                      <SidebarIcon />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="border-t border-[#e4e4e7] px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#8b735f] text-[11px] font-semibold text-white">
                D
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-[#27272a]">
                  DailyHook
                </div>
                <div className="truncate text-xs text-[#71717b]">
                  daily.hookies@gmail.com
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b border-[#e4e4e7] bg-white/95 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#e4e4e7] bg-[#fafafa] text-[#71717b] lg:hidden">
                  <SidebarIcon />
                </div>
                <h1 className="truncate text-xl font-semibold tracking-[-0.03em] text-[#18181b]">
                  {currentTitle}
                </h1>
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <TopbarChip label="By Company" />
                <TopbarChip label="By Category" />
                <TopbarChip label="Daily" />
                <TopbarChip label="Monthly" />
                <TopbarAction label="Filters" />
              </div>
            </div>
          </header>

          <div className="min-h-0 flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

function TopbarChip({ label }: { label: string }) {
  return (
    <span className="rounded-[8px] border border-[#e4e4e7] bg-white px-2.5 py-1 text-xs font-medium text-[#52525b]">
      {label}
    </span>
  )
}

function TopbarAction({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="rounded-[8px] border border-[#e4e4e7] bg-white px-2.5 py-1 text-xs font-medium text-[#27272a]"
    >
      {label}
    </button>
  )
}

function SidebarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M3.25 4.25H12.75M3.25 8H12.75M3.25 11.75H8.75"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}
