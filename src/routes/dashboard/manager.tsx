import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/manager')({
  component: ManagerDashboard,
})

function ManagerDashboard() {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Dashboard do Gestor</h2>
      <p>Visão consolidada e desempenho da equipe.</p>
    </div>
  )
} 