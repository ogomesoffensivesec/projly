import UsersSection from '@/components/dev/dashboard/sections/users-section'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dev/users')({
  component: UsersSection,
}) 