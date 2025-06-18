"use client"

import { useState, useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { differenceInDays } from "date-fns"
import { PlusIcon, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Stepper,
    StepperItem,
    StepperTrigger,
    StepperIndicator,
    StepperTitle,
    StepperDescription,
    StepperSeparator,
} from "@/components/ui/stepper"

type FormValues = {
    name: string
    description: string
    category: "web" | "mobile" | "desktop" | "other"
    priority: "low" | "medium" | "high" | "urgent"
    startDate: Date
    endDate: Date
    team: string[]
    budget?: number
    tags: string[]
}

const formSchema = z.object({
    // Etapa 1: Informações Básicas
    name: z.string().min(1, { message: "Nome obrigatório" }),
    description: z.string().min(1, { message: "Descrição obrigatória" }),
    category: z.enum(["web", "mobile", "desktop", "other"]),
    priority: z.enum(["low", "medium", "high", "urgent"]),
    
    // Etapa 2: Cronograma
    startDate: z.date({ required_error: "Data de início obrigatória" }),
    endDate: z.date({ required_error: "Data prevista obrigatória" }),
    
    // Etapa 3: Configurações
    team: z.array(z.string()).min(1, "Selecione pelo menos um membro"),
    budget: z.number().min(0, "Orçamento inválido").optional(),
    tags: z.array(z.string()),
}).strict()

export function NewProjectDialog() {
    const [open, setOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            category: "web",
            priority: "medium",
            startDate: new Date(),
            endDate: new Date(),
            team: [],
            budget: undefined,
            tags: [],
        },
    })

    const start = form.watch("startDate")
    const end = form.watch("endDate")
    const formValues = form.watch()

    const durationBadge = useMemo(() => {
        if (start && end) {
            const days = differenceInDays(end, start)
            return days >= 0
                ? `${days} dias de desenvolvimento`
                : `Vencido há ${Math.abs(days)} dias`
        }
        return null
    }, [start, end])

    function onSubmit(data: FormValues) {
        console.log("Criando projeto:", data)
        setOpen(false)
    }

    const validateStep = async (nextStep: number) => {
        // Valida os campos do step atual, não do próximo
        const fields = {
            0: ["name", "description", "category", "priority"],
            1: ["startDate", "endDate"],
            2: ["team"]
        }[currentStep] || []

        const result = await form.trigger(fields as any)
        if (result) {
            setCurrentStep(nextStep)
        } else {
            // Adiciona feedback visual para campos inválidos
            const errors = form.formState.errors
            const invalidFields = Object.keys(errors)
            if (invalidFields.length > 0) {
                const firstError = invalidFields[0]
                const element = document.querySelector(`[name="${firstError}"]`)
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" })
                }
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="ml-auto bg-neutral-900 border-neutral-800 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-50"
                >
                    <PlusIcon className="-ms-1 opacity-60" size={16} aria-hidden />
                    Novo projeto
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-neutral-900 border-neutral-800" size="xl">
                <DialogHeader className="space-y-4 pb-6 border-b border-neutral-800">
                    <DialogTitle className="text-2xl font-semibold text-neutral-100">
                        Criar novo projeto
                    </DialogTitle>
                    <DialogDescription className="text-base text-neutral-400">
                        Preencha as informações do projeto em etapas.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6">
                    <Stepper value={currentStep} onValueChange={validateStep} className="mb-8">
                        <StepperItem step={0} className="text-white">
                            <StepperTrigger>
                                <StepperIndicator />
                                <div>
                                    <StepperTitle>Informações Básicas</StepperTitle>
                                    <StepperDescription>Nome, descrição e categoria</StepperDescription>
                                </div>
                            </StepperTrigger>
                        </StepperItem>
                        
                        <StepperSeparator />
                        
                        <StepperItem step={1} className="text-white">
                            <StepperTrigger>
                                <StepperIndicator />
                                <div>
                                    <StepperTitle>Cronograma</StepperTitle>
                                    <StepperDescription>Datas e marcos</StepperDescription>
                                </div>
                            </StepperTrigger>
                        </StepperItem>
                        
                        <StepperSeparator />
                        
                        <StepperItem step={2} className="text-white">
                            <StepperTrigger>
                                <StepperIndicator />
                                <div>
                                    <StepperTitle>Configurações</StepperTitle>
                                    <StepperDescription>Equipe e preferências</StepperDescription>
                                </div>
                            </StepperTrigger>
                        </StepperItem>
                    </Stepper>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    {currentStep === 0 && (
                                        <div className="space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium text-neutral-100">
                                                            Nome do Projeto
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Digite o nome do projeto"
                                                                {...field}
                                                                className="h-10 bg-neutral-800 border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:border-violet-500"
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-500" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="description"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium text-neutral-100">
                                                            Descrição
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Descreva o objetivo do projeto"
                                                                {...field}
                                                                className="min-h-[100px] bg-neutral-800 border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:border-violet-500"
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-500" />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="flex gap-2 w-full">
                                                <FormField
                                                    control={form.control}
                                                    name="category"
                                                    render={({ field }) => (
                                                        <FormItem className="w-full">
                                                            <FormLabel className="text-sm font-medium text-neutral-100">
                                                                Categoria
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    value={field.value}
                                                                >
                                                                    <SelectTrigger className="h-10 w-full text-white bg-neutral-800 border-neutral-700 focus:border-violet-500 hover:bg-neutral-700">
                                                                        <SelectValue placeholder="Selecione uma categoria" className="text-white" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-neutral-800 border-neutral-700">
                                                                        <SelectItem value="web" className="text-white hover:bg-neutral-700">Web</SelectItem>
                                                                        <SelectItem value="mobile" className="text-white hover:bg-neutral-700">Mobile</SelectItem>
                                                                        <SelectItem value="desktop" className="text-white hover:bg-neutral-700">Desktop</SelectItem>
                                                                        <SelectItem value="other" className="text-white hover:bg-neutral-700">Outro</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage className="text-red-500" />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="priority"
                                                    render={({ field }) => (
                                                        <FormItem className="w-full">
                                                            <FormLabel className="text-sm font-medium text-neutral-100">
                                                                Prioridade
                                                            </FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    onValueChange={field.onChange}
                                                                    value={field.value}
                                                                > 
                                                                    <SelectTrigger className="h-10 w-full text-white bg-neutral-800 border-neutral-700 focus:border-violet-500 hover:bg-neutral-700">
                                                                        <SelectValue placeholder="Selecione a prioridade" className="text-white" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="bg-neutral-800 border-neutral-700">
                                                                        <SelectItem value="low" className="text-white hover:bg-neutral-700">Baixa</SelectItem>
                                                                        <SelectItem value="medium" className="text-white hover:bg-neutral-700">Média</SelectItem>
                                                                        <SelectItem value="high" className="text-white hover:bg-neutral-700">Alta</SelectItem>
                                                                        <SelectItem value="urgent" className="text-white hover:bg-neutral-700">Urgente</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormControl>
                                                            <FormMessage className="text-red-500" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 1 && (
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="startDate"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm font-medium text-neutral-100 ">
                                                                Data de Início
                                                            </FormLabel>
                                                            <FormControl>
                                                                <DatePicker
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    label="Data de início"
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-500" />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="endDate"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-sm font-medium text-neutral-100">
                                                                Data Prevista
                                                            </FormLabel>
                                                            <FormControl>
                                                                <DatePicker
                                                                    value={field.value}
                                                                    onChange={field.onChange}
                                                                    label="Data prevista"
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-red-500" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {currentStep === 2 && (
                                        <div className="space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="team"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium text-neutral-100">
                                                            Equipe <span className="text-red-500">*</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Command className="bg-neutral-800 border border-neutral-700 rounded-md">
                                                                <CommandInput placeholder="Buscar membros..." className="h-10 text-neutral-100" />
                                                                <CommandList>
                                                                    <CommandEmpty>Nenhum membro encontrado.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        <CommandItem
                                                                            value="1"
                                                                            onSelect={() => {
                                                                                const currentValue = Array.isArray(field.value) ? field.value : []
                                                                                const newValue = currentValue.includes("1") 
                                                                                    ? currentValue.filter(id => id !== "1")
                                                                                    : [...currentValue, "1"]
                                                                                field.onChange(newValue)
                                                                            }}
                                                                            className="text-white hover:bg-neutral-700"
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    Array.isArray(field.value) && field.value.includes("1") ? "opacity-100" : "opacity-0"
                                                                                )}
                                                                            />
                                                                            João Silva
                                                                        </CommandItem>
                                                                        <CommandItem
                                                                            value="2"
                                                                            onSelect={() => {
                                                                                const currentValue = Array.isArray(field.value) ? field.value : []
                                                                                const newValue = currentValue.includes("2")
                                                                                    ? currentValue.filter(id => id !== "2")
                                                                                    : [...currentValue, "2"]
                                                                                field.onChange(newValue)
                                                                            }}
                                                                            className="text-white hover:bg-neutral-700"
                                                                        >
                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    Array.isArray(field.value) && field.value.includes("2") ? "opacity-100" : "opacity-0"
                                                                                )}
                                                                            />
                                                                            Maria Santos
                                                                        </CommandItem>
                                                                    </CommandGroup>
                                                                </CommandList>
                                                            </Command>
                                                        </FormControl>
                                                        <FormMessage className="text-red-500" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="budget"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium text-neutral-100">
                                                            Orçamento Previsto <span className="text-neutral-400">(opcional)</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                placeholder="R$ 0,00"
                                                                {...field}
                                                                onChange={(e) => field.onChange(e.target.valueAsNumber || undefined)}
                                                                className="h-10 bg-neutral-800 border-neutral-700 text-neutral-100 placeholder:text-neutral-500 focus:border-violet-500"
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-red-500" />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="tags"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium text-neutral-100">
                                                            Tags <span className="text-neutral-400">(opcional)</span>
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div className="flex flex-wrap gap-2">
                                                                {["Frontend", "Backend", "Mobile", "UI/UX"].map((tag) => (
                                                                    <Badge
                                                                        key={tag}
                                                                        variant={(field.value || []).includes(tag) ? "default" : "outline"}
                                                                        className={cn(
                                                                            "cursor-pointer",
                                                                            (field.value || []).includes(tag)
                                                                                ? "bg-violet-600 text-white"
                                                                                : "bg-neutral-800 text-neutral-100 border-neutral-700"
                                                                        )}
                                                                        onClick={() => {
                                                                            const currentTags = field.value || []
                                                                            const newValue = currentTags.includes(tag)
                                                                                ? currentTags.filter((t) => t !== tag)
                                                                                : [...currentTags, tag]
                                                                            field.onChange(newValue)
                                                                        }}
                                                                    >
                                                                        {tag}
                                                                    </Badge>
                                                                ))}
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage className="text-red-500" />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )}

                                    <DialogFooter className="pt-6 border-t border-neutral-800">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setOpen(false)}
                                            className="h-10 bg-neutral-800 text-neutral-100 hover:bg-neutral-700"
                                        >
                                            Cancelar
                                        </Button>

                                        {currentStep > 0 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setCurrentStep(currentStep - 1)}
                                                className="h-10 bg-neutral-800 text-neutral-100 hover:bg-neutral-700"
                                            >
                                                Voltar
                                            </Button>
                                        )}
                                        
                                        {currentStep < 2 ? (
                                            <Button
                                                type="button"
                                                onClick={() => validateStep(currentStep + 1)}
                                                className="h-10 bg-violet-600 text-white hover:bg-violet-700"
                                            >
                                                Próximo
                                            </Button>
                                        ) : (
                                            <Button
                                                type="submit"
                                                className="h-10 bg-violet-600 text-white hover:bg-violet-700"
                                            >
                                                Criar projeto
                                            </Button>
                                        )}
                                    </DialogFooter>
                                </form>
                            </Form>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-neutral-100">Preview do Projeto</h3>
                                <Badge variant="outline" className="bg-neutral-800 text-neutral-400 border-neutral-700">
                                    {currentStep === 0 && "Etapa 1/3"}
                                    {currentStep === 1 && "Etapa 2/3"}
                                    {currentStep === 2 && "Etapa 3/3"}
                                </Badge>
                            </div>
                            <div className="bg-neutral-800 p-6 rounded-lg space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium text-neutral-400 mb-2">Nome</h4>
                                    <p className="text-neutral-100">{formValues.name || "Não definido"}</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-medium text-neutral-400 mb-2">Categoria</h4>
                                    <Badge className="bg-violet-600 text-white">
                                        {formValues.category === "web" && "Web"}
                                        {formValues.category === "mobile" && "Mobile"}
                                        {formValues.category === "desktop" && "Desktop"}
                                        {formValues.category === "other" && "Outro"}
                                    </Badge>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-medium text-neutral-400 mb-2">Prioridade</h4>
                                    <Badge
                                        className={cn(
                                            "text-white",
                                            formValues.priority === "low" && "bg-green-600",
                                            formValues.priority === "medium" && "bg-yellow-600",
                                            formValues.priority === "high" && "bg-orange-600",
                                            formValues.priority === "urgent" && "bg-red-600"
                                        )}
                                    >
                                        {formValues.priority === "low" && "Baixa"}
                                        {formValues.priority === "medium" && "Média"}
                                        {formValues.priority === "high" && "Alta"}
                                        {formValues.priority === "urgent" && "Urgente"}
                                    </Badge>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-medium text-neutral-400 mb-2">Duração</h4>
                                    <p className="text-neutral-100">{durationBadge || "Não definido"}</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-medium text-neutral-400 mb-2">Equipe</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(formValues.team || []).map((memberId) => (
                                            <Badge
                                                key={memberId}
                                                variant="secondary"
                                                className="bg-neutral-700 text-neutral-100"
                                            >
                                                {memberId === "1" ? "João Silva" : "Maria Santos"}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-medium text-neutral-400 mb-2">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(formValues.tags || []).map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="bg-neutral-800 text-neutral-100 border-neutral-700"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
