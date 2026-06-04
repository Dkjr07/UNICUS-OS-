import { useState } from 'react'
import { Settings, User, CreditCard, Bell, Cpu, Check } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const [profile, setProfile] = useState({
    name: 'Rayan',
    email: 'rayan@unicus.app',
    timezone: 'Africa/Lagos',
  })

  const [aiModel, setAiModel] = useState('gpt-4o')
  const [notifications, setNotifications] = useState({
    email: true,
    revenue: true,
    community: false,
    weekly: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const tabs = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'ai', icon: Cpu, label: 'AI Model' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'billing', icon: CreditCard, label: 'Billing' },
  ]

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Settings
        </h1>
      </div>

      <div className="flex gap-6">
        <div className="w-48 space-y-1">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                activeTab === id
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-white rounded-xl border border-slate-200 p-6">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-base font-semibold text-slate-900 mb-4">Profile</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-1">Timezone</label>
                  <select
                    value={profile.timezone}
                    onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  >
                    <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                    <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                    <option value="Europe/Paris">Europe/Paris (CET)</option>
                    <option value="America/New_York">America/New York (EST)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div>
              <h2 className="text-base font-semibold text-slate-900 mb-4">AI Model Preference</h2>
              <div className="space-y-3">
                {[
                  { id: 'gpt-4o', name: 'GPT-4o', desc: 'Best quality, slower', badge: 'Recommended' },
                  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', desc: 'Fast and affordable', badge: null },
                  { id: 'claude-3.5', name: 'Claude 3.5 Sonnet', desc: 'Great for coding tasks', badge: null },
                  { id: 'llama-3', name: 'Llama 3 (Open)', desc: 'Self-hosted, no data leaves your infra', badge: 'Coming Soon' },
                ].map((model) => (
                  <button
                    key={model.id}
                    onClick={() => setAiModel(model.id)}
                    className={`w-full flex items-center justify-between p-4 border rounded-lg transition-colors text-left ${
                      aiModel === model.id
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">{model.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{model.desc}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {model.badge && (
                        <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {model.badge}
                        </span>
                      )}
                      {aiModel === model.id && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-base font-semibold text-slate-900 mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                {([
                  { key: 'email' as const, label: 'Email notifications', desc: 'Receive important updates via email' },
                  { key: 'revenue' as const, label: 'Revenue alerts', desc: 'Get notified of MRR changes and anomalies' },
                  { key: 'community' as const, label: 'Community activity', desc: 'New messages and project updates' },
                  { key: 'weekly' as const, label: 'Weekly digest', desc: 'Summary of your metrics every Monday' },
                ] as const).map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() =>
                        setNotifications({ ...notifications, [item.key]: !notifications[item.key] })
                      }
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        notifications[item.key] ? 'bg-primary' : 'bg-slate-200'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          notifications[item.key] ? 'translate-x-[22px]' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div>
              <h2 className="text-base font-semibold text-slate-900 mb-4">Billing & Plans</h2>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary">Pro Plan</p>
                    <p className="text-xs text-slate-500 mt-0.5">$19/month — renews June 15, 2026</p>
                  </div>
                  <button className="text-xs font-medium text-primary hover:underline">Manage</button>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-slate-900 mb-3">Plan Comparison</h3>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="text-left px-4 py-2.5 font-medium text-slate-500">Feature</th>
                      <th className="text-center px-4 py-2.5 font-medium text-slate-500">Free</th>
                      <th className="text-center px-4 py-2.5 font-medium text-primary">Pro</th>
                      <th className="text-center px-4 py-2.5 font-medium text-slate-500">Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Projects', free: '1', pro: 'Unlimited', team: 'Unlimited' },
                      { feature: 'App Builder', free: '5/mo', pro: 'Unlimited', team: 'Unlimited' },
                      { feature: 'Idea Research', free: '3/mo', pro: 'Unlimited', team: 'Unlimited' },
                      { feature: 'Community', free: 'Read only', pro: 'Full access', team: 'Full access' },
                      { feature: 'Team members', free: '—', pro: '—', team: 'Up to 5' },
                    ].map((row) => (
                      <tr key={row.feature} className="border-b border-slate-100 last:border-0">
                        <td className="px-4 py-2.5 text-slate-700">{row.feature}</td>
                        <td className="px-4 py-2.5 text-center text-slate-500">{row.free}</td>
                        <td className="px-4 py-2.5 text-center text-primary font-medium">{row.pro}</td>
                        <td className="px-4 py-2.5 text-center text-slate-500">{row.team}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" /> Saved
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
