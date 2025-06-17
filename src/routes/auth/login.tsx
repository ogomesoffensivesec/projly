import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
  component: Login,
})

function Login() {
  return (
    <div className="h-screen bg-neutral-950 text-white flex justify-center items-center ">
      <div className='mx-auto flex w-full max-w-[350px] flex-col justify-center space-y-6'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-extrabold text-center'>proj.<span className='text-violet-500'>ly</span></h1>
          <span className='text-muted-foreground text-center text-sm'>
            Crie cronogramas e acompanhe o progresso em tempo real.
          </span>
        </div>
        <div className='flex flex-col gap-2'>
          <Button variant='ghost' className='w-full'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Entrar com Google
          </Button>
          <Button variant='ghost' className='w-full'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.41-1.09-.47-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.89 3.51-.84 1.54.07 2.7.61 3.44 1.57-3.14 1.88-2.29 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.31zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            Entrar com iCloud
          </Button>
        </div>
        <span className='text-muted-foreground text-xs text-center'>
          Ao clicar em continuar, você concorda com nossos <Link to='/terms' className='text-violet-500'>Termos de Serviço</Link> e <Link to='/privacy' className='text-violet-500'>Política de Privacidade</Link>.
        </span>
      </div>
    </div>
  )
} 