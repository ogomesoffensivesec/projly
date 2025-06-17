import { createFileRoute } from '@tanstack/react-router'

interface Params {
  id: string
}

export const Route = createFileRoute<Params>('/projects/$id/tasks')({
  component: ProjectTasks,
})

function ProjectTasks({ params }: { params: Params }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Tarefas do Projeto: {params.id}</h2>
      <p>Lista e gerenciamento de tarefas aqui...</p>
    </div>
  )
} 