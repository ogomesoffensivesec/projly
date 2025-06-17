import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/new')({
  component: NewProject,
})

function NewProject() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Novo Projeto</h2>
      <form method="post">
        <input className="border p-2 w-full mb-2" name="name" type="text" placeholder="Nome do Projeto" required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full" type="submit">Criar Projeto</button>
      </form>
    </div>
  )
} 