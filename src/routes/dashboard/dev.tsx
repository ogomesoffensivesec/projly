import Header from '@/components/dev/dashboard/header'
import DashboardSection from '@/components/dev/dashboard/sections/dashboard-section'
import OrganizationsSection from '@/components/dev/dashboard/sections/organizations-section'
import ProjectsSection from '@/components/dev/dashboard/sections/projects-section'
import SettingsSection from '@/components/dev/dashboard/sections/settings-section'
import UsersSection from '@/components/dev/dashboard/sections/users-section'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/dev')({
  component: DevDashboard,
})

function DevDashboard() {
  const [currentSection, setCurrentSection] = useState('Overview')

  const renderContent = () => {
    switch (currentSection) {
      case 'Overview':
        return <DashboardSection />
      case 'Projects':
        return <ProjectsSection />
      case 'Organizations':
        return <OrganizationsSection />
      case 'Users':
        return <UsersSection />
      case 'Settings':
        return <SettingsSection />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header onNavigate={setCurrentSection} currentSection={currentSection} />
      <main className="min-h-[calc(100vh-4rem)] overflow-auto bg-neutral-950">
        {renderContent()}
      </main>
    </div>
  )
}