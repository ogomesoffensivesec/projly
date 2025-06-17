import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { getProjectBySlug } from '@/lib/api'

interface Params {
  slug: string
}

export const Route = createFileRoute<Params>('/projects/$slug')({
  component: ProjectDetail,
})

function ProjectDetail({ params }: { params: Params }) {
  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', params.slug],
    queryFn: () => getProjectBySlug(params.slug)
  })

  if (isLoading) {
    return <div className="p-4">Carregando...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Erro ao carregar o projeto</div>
  }

  if (!project) {
    return <div className="p-4">Projeto não encontrado</div>
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
      <div className="grid gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Descrição</h3>
          <p>{project.description}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Status</h3>
          <p>{project.status}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Data de Criação</h3>
          <p>{new Date(project.createdAt).toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
    </div>
  )
} 