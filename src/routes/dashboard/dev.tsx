import Header from '@/components/dev/dashboard/header'
import { createFileRoute, useNavigate, useRouter, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dev')({
  component: DevDashboard,
})

function DevDashboard() {
  const navigate = useNavigate()
  const router = useRouter()
  const pathname = router.state.location.pathname
  // Deriva a seção atual da rota para passar para o Header
  const sectionFromPath = () => {
    const path = pathname
    if (path.endsWith('/projects')) return 'Projects'
    if (path.endsWith('/organizations')) return 'Organizations'
    if (path.endsWith('/users')) return 'Users'
    if (path.endsWith('/settings')) return 'Settings'
    return 'Overview'
  }
  const currentSection = sectionFromPath()

  const handleNavigate = (section: string) => {
    switch (section) {
      case 'Overview':
        navigate({ to: '/dashboard/dev' })
        break
      case 'Projects':
        navigate({ to: '/dashboard/dev/projects' as any })
        break
      case 'Organizations':
        navigate({ to: '/dashboard/dev/organizations' as any })
        break
      case 'Users':
        navigate({ to: '/dashboard/dev/users' as any })
        break
      case 'Settings':
        navigate({ to: '/dashboard/dev/settings' as any })
        break
      default:
        navigate({ to: '/dashboard/dev' })
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header onNavigate={handleNavigate} currentSection={currentSection} pathname={pathname} />
      <main className="min-h-[calc(100vh-4rem)] overflow-auto bg-neutral-950">
        <Outlet />
      </main>
    </div>
  )
}