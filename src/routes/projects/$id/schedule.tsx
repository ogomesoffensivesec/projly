import { createFileRoute } from '@tanstack/react-router'

interface Params {
  id: string
}

export const Route = createFileRoute<Params>('/projects/$id/schedule')({
  component: ProjectSchedule,
})

function ProjectSchedule({ params }: { params: Params }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Cronograma do Projeto: {params.id}</h2>
      <p>Visualização e edição do cronograma aqui...</p>
    </div>
  )
} 