import { useState } from 'react'
import {
  DollarSign,
  Users,
  FolderKanban,
  TrendingUp,
  Calendar,
  Hammer,
  Lightbulb,
  Send,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { revenueData, projects, calendarEvents } from '../../data/mockData'

const totalMRR = projects.reduce((sum, p) => sum + p.mrr, 0)
const totalUsers = projects.reduce((sum, p) => sum + p.users, 0)

function MetricCard({
  icon: Icon,
  label,
  value,
  change,
  positive,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  change: string
  positive: boolean
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span
          className={`text-xs font-medium flex items-center gap-0.5 ${
            positive ? 'text-emerald-600' : 'text-red-500'
          }`}
        >
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500 mt-0.5">{label}</p>
    </div>
  )
}

export default function Dashboard() {
  const [greeting] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  })

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{greeting}, Rayan</h1>
        <p className="text-slate-500 text-sm mt-1">
          MRR is up 18% this month. InvoiceFlow is your top earner — consider doubling down on its paid plan conversion.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard icon={DollarSign} label="Monthly Revenue" value={`$${totalMRR.toLocaleString()}`} change="18%" positive />
        <MetricCard icon={Users} label="Active Users" value={totalUsers.toString()} change="12%" positive />
        <MetricCard icon={FolderKanban} label="Active Projects" value={projects.length.toString()} change="1 new" positive />
        <MetricCard icon={TrendingUp} label="Growth Rate" value="18%" change="vs 14% last month" positive />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13 }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-slate-400" />
            <h2 className="text-base font-semibold text-slate-900">Upcoming</h2>
          </div>
          <div className="space-y-3">
            {calendarEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    event.type === 'launch'
                      ? 'bg-emerald-500'
                      : event.type === 'meeting'
                        ? 'bg-blue-500'
                        : event.type === 'billing'
                          ? 'bg-amber-500'
                          : 'bg-purple-500'
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-slate-900">{event.title}</p>
                  <p className="text-xs text-slate-400">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-900">{project.name}</p>
                  <p className="text-xs text-slate-400">{project.users} users</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">${project.mrr.toLocaleString()}/mo</p>
                  <span
                    className={`text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      project.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Hammer, label: 'Build an App', color: 'bg-indigo-50 text-indigo-600', to: '/app-builder' },
              { icon: Lightbulb, label: 'Research Ideas', color: 'bg-amber-50 text-amber-600', to: '/idea-researcher' },
              { icon: Send, label: 'Publish Project', color: 'bg-emerald-50 text-emerald-600', to: '/community' },
              { icon: TrendingUp, label: 'View Analytics', color: 'bg-purple-50 text-purple-600', to: '/' },
            ].map(({ icon: Icon, label, color }) => (
              <button
                key={label}
                className={`flex items-center gap-2.5 p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors text-left ${color}`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
