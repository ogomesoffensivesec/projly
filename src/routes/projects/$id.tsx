import { createFileRoute } from '@tanstack/react-router'

interface Params {
  id: string
}

export const Route = createFileRoute<Params>('/projects/$id')({
  component: ProjectDetail,
})

function ProjectDetail({ params }: { params: Params }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Projeto: {params.id}</h2>
      <p>Detalhes do projeto aqui...</p>
    </div>
  )
} 