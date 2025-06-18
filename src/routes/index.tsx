import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const navigate = useNavigate()
  return (
    <div className="h-screen bg-neutral-950 text-white  ">
      <div className='container mx-auto p-12 flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl font-extrabold'>proj.ly</h1>
          <Badge className='text-muted-foreground'>
            BETA
          </Badge>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' onClick={() => navigate({ to: '/auth/login' })} className='hover:bg-neutral-800 hover:text-white '>
            Entrar
          </Button>
          <Button>
            Solicitar acesso
          </Button>
        </div>
      </div>
      <div className='container mx-auto px-56 py-12 flex flex-col gap-2'>
        <h2 className='text-6xl font-extrabold text-center leading-tight'>
          Do <span className='text-violet-300'>planejamento</span> <br /> Ao <span className='text-violet-500'>lançamento</span>
        </h2>
        <p className='text-muted-foreground text-center text-lg'>
          Proj.ly é a plataforma completa de gestão de projetos que torna tudo mais ágil e transparente.
        </p>
        <Button className='w-fit mx-auto mt-4 px-8' size='lg' onClick={() => navigate({ to: '/auth/request-access' })}>
          Solicitar acesso
        </Button>
      </div>
    </div>
  )
}