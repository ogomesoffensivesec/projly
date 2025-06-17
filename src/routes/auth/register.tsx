import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
  component: Register,
})

function Register() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Registrar</h2>
      <form method="post">
        <input className="border p-2 w-full mb-2" name="email" type="email" placeholder="Email" required />
        <input className="border p-2 w-full mb-2" name="password" type="password" placeholder="Senha" required />
        <input className="border p-2 w-full mb-2" name="confirmPassword" type="password" placeholder="Confirmar Senha" required />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full" type="submit">Registrar</button>
      </form>
    </div>
  )
} 