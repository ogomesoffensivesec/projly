import OrganizationsSection from '@/components/dev/dashboard/sections/organizations-section'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dev/organizations')({
  component: OrganizationsSection,
}) 