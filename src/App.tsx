import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './modules/Dashboard'
import AppBuilder from './modules/AppBuilder'
import IdeaResearcher from './modules/IdeaResearcher'
import Community from './modules/Community'
import SettingsPage from './modules/Settings'

export default function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/app-builder" element={<AppBuilder />} />
          <Route path="/idea-researcher" element={<IdeaResearcher />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  )
}
