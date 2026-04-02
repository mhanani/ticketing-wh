import {
  Boxes,
  Building2,
  Calendar,
  CalendarDays,
  ChartNoAxesGantt,
  CircleDollarSign,
  FileText,
  House,
  Package,
  Receipt,
  SquareCheckBig,
  Ticket,
  Trophy,
  Users,
} from 'lucide-react'
import { NavLink, Outlet, useLocation, useMatches } from 'react-router-dom'

interface NavItem {
  label: string
  to: string
  icon: string
  disabled?: boolean
}

interface NavGroup {
  label: string | null
  items: NavItem[]
}

const navigationGroups: NavGroup[] = [
  {
    label: null,
    items: [
      { label: 'Home', to: '/', icon: 'home' },
      { label: 'Planning', to: '/planning', icon: 'planning' },
      { label: 'Tasks', to: '/tasks', icon: 'tasks' },
    ],
  },
  {
    label: 'Sales',
    items: [
      { label: 'Contacts', to: '/contacts', icon: 'contacts' },
      { label: 'Partners', to: '/partners', icon: 'partners' },
      { label: 'Deals', to: '/deals', icon: 'deals' },
      { label: 'Contracts', to: '/contracts', icon: 'contracts' },
      { label: 'Invoices', to: '/invoices', icon: 'invoices' },
    ],
  },
  {
    label: 'Inventory',
    items: [
      { label: 'Assets', to: '/assets', icon: 'assets' },
      { label: 'Packages', to: '/packages', icon: 'packages' },
    ],
  },
  {
    label: 'Ticketing',
    items: [{ label: 'Tickets', to: '/ticketing-wehaveio', icon: 'tickets' }],
  },
  {
    label: 'Fixtures',
    items: [
      { label: 'Matchdays', to: '/matchdays', icon: 'matchdays' },
      { label: 'Seasons', to: '/seasons', icon: 'seasons' },
      { label: 'Events', to: '/events', icon: 'events', disabled: true },
    ],
  },
]

export function AppShell() {
  const location = useLocation()
  const matches = useMatches()
  const currentHandle =
    matches.at(-1)?.handle && typeof matches.at(-1)?.handle === 'object'
      ? (matches.at(-1)?.handle as { title?: string; hideShellHeader?: boolean })
      : null
  const currentTitle = currentHandle?.title ?? 'Workspace'
  const hideShellHeader =
    currentHandle?.hideShellHeader ?? location.pathname.startsWith('/ticketing-wehaveio')

  return (
    <div className="min-h-screen bg-[#f9f9fa] text-[#52525b]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-[#e4e4e7] bg-[#f9f9fa] lg:flex lg:flex-col">
          <div className="px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#7F22FE] text-white">
                <WorkspaceLogoIcon />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm leading-5 font-medium text-[#09090b]">
                  Daily
                </div>
                <div className="truncate text-xs leading-4 text-[#71717b]">Workspace</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-2 py-3">
            {navigationGroups.map((group) => (
              <div key={group.label ?? 'main'} className="mb-4 last:mb-0">
                {group.label ? (
                  <div className="px-2 pb-1 text-xs leading-4 font-medium text-[#a1a1aa]">
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
                        `flex h-8 items-center gap-2 rounded-md px-2 py-2 text-sm leading-5 transition ${
                          item.disabled
                            ? 'cursor-not-allowed text-[#a1a1aa] opacity-60'
                            : isActive
                              ? 'bg-[#f4f4f5] font-medium text-[#09090b]'
                              : 'font-normal text-[#27272a] hover:bg-[#f4f4f5]'
                        }`
                      }
                    >
                      <NavIcon name={item.icon} />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <div className="px-4 pt-3 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#8b735f] text-[11px] font-semibold text-white">
                T
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm leading-5 font-medium text-[#27272a]">
                  Test
                </div>
                <div className="truncate text-xs leading-4 text-[#71717b]">
                  test@gmail.com
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {hideShellHeader ? null : (
            <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm">
              <div className="flex items-center gap-4 px-4 py-3 sm:px-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#e4e4e7] bg-[#fafafa] text-[#71717b] lg:hidden">
                  <NavIcon name="planning" />
                </div>
                <h1 className="truncate text-3xl font-bold text-[#18181b]">
                  {currentTitle}
                </h1>
              </div>
            </header>
          )}

          <div className="min-h-0 flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

function NavIcon({ name }: { name: string }) {
  const cls = 'h-4 w-4'
  const props = {
    className: cls,
    strokeWidth: 2,
    'aria-hidden': true as const,
  }

  switch (name) {
    case 'home':
      return <House {...props} />
    case 'planning':
      return <ChartNoAxesGantt {...props} />
    case 'tasks':
      return <SquareCheckBig {...props} />
    case 'contacts':
      return <Users {...props} />
    case 'partners':
      return <Building2 {...props} />
    case 'deals':
      return <CircleDollarSign {...props} />
    case 'contracts':
      return <FileText {...props} />
    case 'invoices':
      return <Receipt {...props} />
    case 'assets':
      return <Package {...props} />
    case 'packages':
      return <Boxes {...props} />
    case 'tickets':
      return <Ticket {...props} />
    case 'matchdays':
      return <CalendarDays {...props} />
    case 'seasons':
      return <Trophy {...props} />
    case 'events':
      return <Calendar {...props} />
    default:
      return <House {...props} />
  }
}

function WorkspaceLogoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 10h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 14h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 6h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 10h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 14h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 6h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 10h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 14h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 6h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  )
}
