import { createFileRoute } from '@tanstack/react-router'

interface Params {
  id: string
}

export const Route = createFileRoute<Params>('/projects/$id/edit')({
  component: EditProject,
})

function EditProject({ params }: { params: Params }) {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Editar Projeto: {params.id}</h2>
      <form method="put">
        <input className="border p-2 w-full mb-2" name="name" type="text" placeholder="Nome do Projeto" required />
        <button className="bg-yellow-600 text-white px-4 py-2 rounded w-full" type="submit">Salvar Alterações</button>
      </form>
    </div>
  )
} 