import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Hammer,
  Lightbulb,
  Users,
  Settings,
  Zap,
} from 'lucide-react'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/app-builder', icon: Hammer, label: 'App Builder' },
  { to: '/idea-researcher', icon: Lightbulb, label: 'Idea Researcher' },
  { to: '/community', icon: Users, label: 'Community' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar text-white flex flex-col min-h-screen">
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight leading-none">UNICUS</h1>
            <p className="text-[11px] text-slate-400 tracking-wide">AI OS for Solopreneurs</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar-active text-white'
                  : 'text-slate-400 hover:text-white hover:bg-sidebar-hover'
              }`
            }
          >
            <Icon className="w-[18px] h-[18px]" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-sm font-semibold">
            R
          </div>
          <div>
            <p className="text-sm font-medium leading-none">Rayan</p>
            <p className="text-xs text-slate-400 mt-0.5">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
