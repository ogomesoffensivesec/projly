import SettingsSection from '@/components/dev/dashboard/sections/settings-section'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/dev/settings')({
  component: SettingsSection,
}) 