import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/')({
  component: Projects,
})

function Projects() {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Projetos</h2>
      <p>Lista de projetos aqui...</p>
    </div>
  )
} 