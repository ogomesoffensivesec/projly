import { createFileRoute } from '@tanstack/react-router'
import { useId, useState } from 'react'
import { SendIcon, PhoneIcon, ChevronDownIcon, CheckIcon, MailIcon, MessageSquareIcon, AlertCircleIcon } from "lucide-react"
import * as RPNInput from "react-phone-number-input"
import flags from "react-phone-number-input/flags"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Stepper, StepperItem, StepperTrigger, StepperIndicator, StepperTitle } from "@/components/ui/stepper"
import { toast } from "sonner"
import { z } from "zod"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"

// Schema de validação
const formSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Telefone inválido'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'Você precisa aceitar os termos'
  }),
  verificationCode: z.string().length(6, 'Código deve ter 6 dígitos').optional(),
  verificationMethod: z.enum(['email', 'sms', '']).optional()
})

type FormData = z.infer<typeof formSchema>

export const Route = createFileRoute('/auth/request-access')({
  component: RequestAccess,
})

function RequestAccess() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    terms: false,
    verificationCode: '',
    verificationMethod: ''
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [value, setValue] = useState("")
  const [onRequestAccess, setOnRequestAccess] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [verificationAttempts, setVerificationAttempts] = useState(0)
  const id = useId()

  // Simular código de verificação (em produção isso viria do backend)
  const [verificationCode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString())

  const validateStep = (step: number) => {
    const fieldsToValidate: (keyof FormData)[] = step === 1 
      ? ['name', 'email', 'phone', 'terms']
      : ['verificationCode']

    const validationSchema = formSchema.pick(
      Object.fromEntries(fieldsToValidate.map(field => [field, true])) as {
        [K in typeof fieldsToValidate[number]]: true
      }
    )

    const validationResult = validationSchema.safeParse(formData)

    if (!validationResult.success) {
      const newErrors: Partial<Record<keyof FormData, string>> = {}
      validationResult.error.errors.forEach((error) => {
        const field = error.path[0] as keyof FormData
        newErrors[field] = error.message
      })
      setErrors(newErrors)
      return false
    }

    setErrors({})
    return true
  }

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(step)) return

    setIsSubmitting(true)
    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      toast.success('Solicitação enviada com sucesso! Em breve você receberá um email com mais informações.')
    } catch (error) {
      setSubmitStatus('error')
      toast.error('Erro ao enviar solicitação. Por favor, tente novamente mais tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendCode = async (method: 'email' | 'sms') => {
    setIsSendingCode(true)
    setFormData({ ...formData, verificationMethod: method })
    
    try {
      // Simular envio do código
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Em produção, aqui seria feita a chamada para o backend
      console.log(`Código de verificação: ${verificationCode}`)
      
      setCodeSent(true)
      setOnRequestAccess(true)
      toast.success(`Código enviado com sucesso via ${method === 'email' ? 'email' : 'SMS'}!`)
    } catch (error) {
      toast.error('Erro ao enviar código. Por favor, tente novamente.')
    } finally {
      setIsSendingCode(false)
    }
  }

  const handleVerificationCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setFormData({ ...formData, verificationCode: value })
    
    if (errors.verificationCode) {
      setErrors({ ...errors, verificationCode: undefined })
    }

    // Verificação automática quando o código estiver completo
    if (value.length === 6) {
      if (value === verificationCode) {
        toast.success('Código verificado com sucesso!')
        setTimeout(() => {
          handleSubmitFinal()
        }, 1000)
      } else {
        setVerificationAttempts(prev => prev + 1)
        if (verificationAttempts >= 2) {
          toast.error('Número máximo de tentativas excedido. Por favor, solicite um novo código.')
          setOnRequestAccess(false)
          setCodeSent(false)
          setValue('')
          setVerificationAttempts(0)
        } else {
          toast.error('Código inválido. Tente novamente.')
        }
      }
    }
  }

  // Nova função para submissão final
  const handleSubmitFinal = async () => {
    setIsSubmitting(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      toast.success('Solicitação enviada com sucesso! Em breve você receberá um email com mais informações.')
    } catch (error) {
      setSubmitStatus('error')
      toast.error('Erro ao enviar solicitação. Por favor, tente novamente mais tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendCode = async () => {
    if (!formData.verificationMethod) return
    
    setIsSendingCode(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setVerificationAttempts(0)
      toast.success(`Novo código enviado com sucesso via ${formData.verificationMethod === 'email' ? 'email' : 'SMS'}!`)
    } catch (error) {
      toast.error('Erro ao enviar código. Por favor, tente novamente.')
    } finally {
      setIsSendingCode(false)
    }
  }

  const steps = [
    { title: 'Informações Pessoais', description: 'Dados básicos' },
    { title: 'Verificação', description: 'Confirme seu código' },
    { title: 'Confirmação', description: 'Finalização' }
  ]

  return (
    <div className="min-h-screen bg-neutral-950 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-neutral-50">Solicitar Acesso</h1>
          <p className="text-neutral-400">Preencha os dados para solicitar acesso à plataforma</p>
        </div>

        <Stepper value={step} onValueChange={setStep} className="bg-neutral-900/50 py-6 rounded-lg mb-2">
          {steps.slice(0,2).map((stepItem, index) => (
            <StepperItem key={index} step={index + 1}>
              <StepperTrigger>
                <StepperIndicator className="bg-neutral-800 data-[state=active]:bg-violet-600 data-[state=completed]:bg-violet-600" />
                <div className="flex flex-col">
                  <StepperTitle className="text-neutral-200">{stepItem.title}</StepperTitle>
                  <span className="text-xs text-neutral-400">{stepItem.description}</span>
                </div>
              </StepperTrigger>
            </StepperItem>
          ))}
        </Stepper>

        {submitStatus === 'success' ? (
          <div className="bg-neutral-900/70 p-10 rounded-2xl flex flex-col items-center gap-6 shadow-lg">
            <h2 className="text-2xl font-bold text-violet-400 text-center">Solicitação enviada com sucesso!</h2>
            <p className="text-neutral-300 text-center max-w-md">Em breve você receberá um email com mais informações. Obrigado por solicitar acesso à plataforma!</p>
            <div className="flex gap-4 mt-4">
              <Button asChild  >
                <a href="/">Voltar para início</a>
              </Button>
              <Button asChild className="bg-violet-600 text-white hover:bg-violet-700">
                <a href="/auth/login">Entrar</a>
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-900/50 p-10 rounded-2xl flex flex-col justify-between shadow-lg">
            {step === 1 && (
              <div className="space-y-7">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-neutral-200">Nome Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value })
                      if (errors.name) setErrors({ ...errors, name: undefined })
                    }}
                    placeholder="Digite seu nome completo"
                    required
                    className={cn(
                      "bg-neutral-800 h-12 border-neutral-700 text-neutral-200 placeholder:text-neutral-500 focus:border-violet-600 focus:ring-violet-600/20 text-base",
                      errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    )}
                  />
                  {errors.name && (
                    <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400 mt-1">
                      <AlertCircleIcon className="h-4 w-4" />
                      <AlertDescription>{errors.name}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-200">Email</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        if (errors.email) setErrors({ ...errors, email: undefined })
                      }}
                      placeholder="seu@email.com"
                      className={cn(
                        "pe-9 h-12 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder:text-neutral-500 focus:border-violet-600 focus:ring-violet-600/20 text-base",
                        errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      )}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-neutral-400 hover:text-violet-400"
                    >
                      <SendIcon size={16} />
                    </button>
                  </div>
                  {errors.email && (
                    <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400 mt-1">
                      <AlertCircleIcon className="h-4 w-4" />
                      <AlertDescription>{errors.email}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="*:not-first:mt-2 text-white" dir="ltr">
                    <Label htmlFor={id}>Telefone</Label>
                    <RPNInput.default
                      className={cn(
                        "flex rounded-md shadow-xs h-12 text-base",
                        errors.phone && "border-red-500"
                      )}
                      international
                      flagComponent={FlagComponent}
                      countrySelectComponent={CountrySelect}
                      inputComponent={PhoneInput}
                      id={id}
                      placeholder="Digite seu telefone"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue ?? "")
                        setFormData({ ...formData, phone: newValue ?? "" })
                        if (errors.phone) setErrors({ ...errors, phone: undefined })
                      }}
                    />
                  </div>
                  {errors.phone && (
                    <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400 mt-1">
                      <AlertCircleIcon className="h-4 w-4" />
                      <AlertDescription>{errors.phone}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.terms}
                    onCheckedChange={(checked) => {
                      setFormData({ ...formData, terms: checked as boolean })
                      if (errors.terms) setErrors({ ...errors, terms: undefined })
                    }}
                    required
                    className="mt-1 border-neutral-700 data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                  />
                  <Label htmlFor="terms" className="text-sm text-neutral-300">
                    Li e concordo com os <a href="/terms" className="text-violet-400 hover:text-violet-300 underline">Termos de Uso</a> e{' '}
                    <a href="/privacy" className="text-violet-400 hover:text-violet-300 underline">Política de Privacidade</a>
                  </Label>
                </div>
                {errors.terms && (
                  <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400 mt-1">
                    <AlertCircleIcon className="h-4 w-4" />
                    <AlertDescription>{errors.terms}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                {!onRequestAccess && (
                  <div className="space-y-4">
                    <Label className="text-neutral-200">Escolha o método de verificação</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        disabled={isSendingCode}
                        onClick={() => handleSendCode('email')}
                        className={cn(
                          "flex items-center gap-2 h-12",
                          formData.verificationMethod === 'email'
                            ? "bg-violet-600 text-white hover:bg-violet-700"
                            : "border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-neutral-100"
                        )}
                      >
                        {isSendingCode ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        ) : (
                          <>
                            <MailIcon size={16} />
                            Email
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        disabled={isSendingCode}
                        onClick={() => handleSendCode('sms')}
                        className={cn(
                          "flex items-center gap-2 h-12",
                          formData.verificationMethod === 'sms'
                            ? "bg-violet-600 text-white hover:bg-violet-700"
                            : "border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-neutral-100"
                        )}
                      >
                        {isSendingCode ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        ) : (
                          <>
                            <MessageSquareIcon size={16} />
                            SMS
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {onRequestAccess && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="verificationCode" className="text-neutral-200">Código de Verificação</Label>
                      <Button
                        type="button"
                        variant="link"
                        onClick={handleResendCode}
                        disabled={isSendingCode}
                        className="text-violet-400 hover:text-violet-300 text-sm"
                      >
                        {isSendingCode ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-violet-400 border-t-transparent" />
                        ) : (
                          'Reenviar código'
                        )}
                      </Button>
                    </div>
                    <div className="relative flex items-center gap-2">
                      <Input
                        id="verificationCode"
                        value={formData.verificationCode}
                        onChange={handleVerificationCodeChange}
                        placeholder="Digite o código recebido"
                        className={cn(
                          "h-12 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder:text-neutral-500 focus:border-violet-600 focus:ring-violet-600/20",
                          errors.verificationCode && "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        )}
                        required
                        maxLength={6}
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        pattern="\d*"
                      />
                    </div>
                    {errors.verificationCode && (
                      <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertDescription>{errors.verificationCode}</AlertDescription>
                      </Alert>
                    )}
                    <p className="text-sm text-neutral-400">
                      Digite o código de 6 dígitos enviado para seu {formData.verificationMethod === 'email' ? 'email' : 'celular'}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-neutral-100"
                >
                  Voltar
                </Button>
              )}
              {step < 2 && (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="ml-auto bg-violet-600 text-white hover:bg-violet-700"
                >
                  Próximo
                </Button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

// Atualizando os componentes auxiliares com o tema dark
const PhoneInput = ({ className, ...props }: React.ComponentProps<"input">) => {
  return (
    <Input
      data-slot="phone-input"
      className={cn(
        "-ms-px h-12 rounded-s-none shadow-none focus-visible:z-10 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder:text-neutral-500 focus:border-violet-600 focus:ring-violet-600/20",
        className
      )}
      {...props}
    />
  )
}

// Atualizando a interface do CountrySelect
interface CountrySelectProps {
  disabled?: boolean
  value: RPNInput.Country
  onChange: (value: RPNInput.Country) => void
  options: Array<{
    label: string
    value: RPNInput.Country
  }>
}

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="rounded-r-none h-12 ">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          // Removido w-full para não ocupar toda a largura do campo
          className="bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700 hover:text-neutral-100 justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px] focus-visible:outline-violet-600"
        >
          <div className="flex items-center gap-2">
            <FlagComponent country={value} countryName={value} />
          </div>
          <ChevronDownIcon
            size={16}
            className="text-neutral-400 shrink-0"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        // Removido w-full para não forçar largura máxima
        className="border-neutral-700 bg-neutral-900 min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
      >
        <Command className="bg-neutral-900 ">
          <CommandInput
            placeholder="Buscar país..."
            className="border-neutral-700 text-neutral-200 placeholder:text-neutral-500"
          />
          <CommandList>
            <CommandEmpty className="text-neutral-400 p-2 text-sm font-normal">Nenhum país encontrado.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue as RPNInput.Country)
                    setOpen(false)
                  }}
                  className="text-neutral-200 hover:bg-neutral-800 hover:text-neutral-100 data-[selected=true]:bg-violet-600/20 data-[selected=true]:text-violet-400"
                >
                  <div className="flex items-center gap-2">
                    <FlagComponent country={option.value} countryName={option.label} />
                    <span>{option.label}</span>
                    {option.value && (
                      <span className="text-neutral-400 ml-1">
                        +{RPNInput.getCountryCallingCode(option.value)}
                      </span>
                    )}
                  </div>
                  {value === option.value && (
                    <CheckIcon size={16} className="ml-auto text-violet-400" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]
  return (
    <span className="w-5 overflow-hidden rounded-sm ">
      {Flag ? <Flag title={countryName} /> : <PhoneIcon size={16} />}
    </span>
  )
} 