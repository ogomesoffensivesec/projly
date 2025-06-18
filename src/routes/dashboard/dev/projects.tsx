import ProjectsSection from '@/components/dev/dashboard/sections/projects-section'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dev/projects')({
  component: ProjectsSection,
}) 