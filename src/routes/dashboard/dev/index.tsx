import DashboardSection from '@/components/dev/dashboard/sections/dashboard-section'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dev/')({
  component: DashboardSection,
}) 