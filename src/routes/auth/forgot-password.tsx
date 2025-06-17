import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/forgot-password')({
  component: ForgotPassword,
})

function ForgotPassword() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Recuperar Senha</h2>
      <form method="post">
        <input className="border p-2 w-full mb-2" name="email" type="email" placeholder="Email" required />
        <button className="bg-yellow-600 text-white px-4 py-2 rounded w-full" type="submit">Enviar instruções</button>
      </form>
    </div>
  )
} 