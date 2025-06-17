import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy')({
  component: Privacy,
})

function Privacy() {
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
        <h1 className='text-4xl font-bold mb-8'>Política de Privacidade</h1>
        
        <div className='space-y-6 text-muted-foreground'>
          <section>
            <h2 className='text-2xl font-semibold text-white mb-4'>1. Coleta de Informações</h2>
            <p>Coletamos informações que você nos fornece diretamente, como nome, endereço de e-mail e informações de perfil quando você cria uma conta no proj.ly.</p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-4'>2. Uso das Informações</h2>
            <p>Utilizamos suas informações para fornecer, manter e melhorar nossos serviços, desenvolver novos recursos e proteger o proj.ly e nossos usuários.</p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-4'>3. Compartilhamento de Dados</h2>
            <p>Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para fornecer nossos serviços ou quando exigido por lei.</p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-4'>4. Segurança dos Dados</h2>
            <p>Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.</p>
          </section>

          <section>
            <h2 className='text-2xl font-semibold text-white mb-4'>5. Seus Direitos</h2>
            <p>Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Você também pode solicitar uma cópia dos seus dados ou retirar seu consentimento para o processamento de dados.</p>
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