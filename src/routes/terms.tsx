import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/terms')({
  component: Terms,
})

function Terms() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className='container mx-auto p-12 flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <Link to="/">
            <h1 className='text-2xl font-extrabold'>proj.<span className='text-violet-500'>ly</span></h1>
          </Link>
        </div>
      </div>
      
      <div className='container mx-auto px-12 py-8 max-w-4xl'>
        <h1 className='text-4xl font-bold mb-8'>Termos de Serviço</h1>
        
        <div className='space-y-6 text-muted-foreground'>
          <section>
            <h2 className='text-2xl font-semibold text-white mb-4'>1. Aceitação dos Termos</h2>
            <p>Ao acessar e usar o proj.ly, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.</p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-4'>2. Uso do Serviço</h2>
            <p>O proj.ly é uma plataforma de gestão de projetos que permite criar cronogramas e acompanhar o progresso em tempo real. Você concorda em usar o serviço apenas para fins legais e de acordo com estes termos.</p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-4'>3. Contas de Usuário</h2>
            <p>Ao criar uma conta no proj.ly, você é responsável por manter a confidencialidade de sua conta e senha. Você concorda em aceitar a responsabilidade por todas as atividades que ocorram sob sua conta.</p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-4'>4. Propriedade Intelectual</h2>
            <p>O conteúdo, organização, gráficos, design e outros elementos do proj.ly são protegidos por leis de propriedade intelectual e são propriedade do proj.ly ou seus licenciadores.</p>
          </section>
        </div>

        <div className='mt-12 flex justify-center'>
          <Button variant='outline' onClick={() => window.history.back()}>
            Voltar
          </Button>
        </div>
      </div>
    </div>
  )
} 