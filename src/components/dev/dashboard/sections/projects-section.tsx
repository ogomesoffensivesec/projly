"use client"

import { useId, useMemo, useRef, useState } from "react";
import type {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  Row,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  Columns3Icon,
  EllipsisIcon,
  FilterIcon,
  ListFilterIcon, StarIcon,
  TrashIcon
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NewProjectDialog } from "../new-project";

type Project = {
  id: string
  title: string
  company: string
  sector: string
  status: "in-progress" | "planning" | "completed"
  progress: number
  nextMilestone: string
  dueDate: string
  description: string
  isFavorite: boolean
  members: {
    id: string
    name: string
    avatar: string
  }[]
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Sistema de Gestão de RH",
    company: "EmpresaBR",
    sector: "Recursos Humanos",
    status: "in-progress",
    progress: 65,
    nextMilestone: "Integração com Folha de Pagamento",
    dueDate: "2024-01-15",
    description: "Desenvolvimento de sistema interno para gestão de funcionários e processos de RH",
    isFavorite: true,
    members: [
      { id: "1", name: "Diego Fernandes", avatar: "https://github.com/diego3g.png" },
      { id: "2", name: "Oscar Gomes", avatar: "https://github.com/ogomesoffensivesec.png" },
    ]
  },
  {
    id: "2",
    title: "Portal do Colaborador",
    company: "TechBR",
    sector: "TI",
    status: "planning",
    progress: 25,
    nextMilestone: "Design da Interface",
    dueDate: "2024-02-01",
    description: "Portal interno para acesso a benefícios e informações corporativas",
    isFavorite: false,
    members: [
      { id: "3", name: "Diogo Jhony", avatar: "https://github.com/diogojhony.png" },
      { id: "4", name: "José Oliveira", avatar: "https://github.com/josepholiveira.png" },
    ]
  },
  {
    id: "3",
    title: "Dashboard de Vendas",
    company: "VendasBR",
    sector: "Comercial",
    status: "completed",
    progress: 100,
    nextMilestone: "Implantação",
    dueDate: "2023-12-20",
    description: "Painel de controle para acompanhamento de métricas de vendas",
    isFavorite: false,
    members: [
      { id: "1", name: "Diego Fernandes", avatar: "https://github.com/diego3g.png" },
      { id: "3", name: "Diogo Jhony", avatar: "https://github.com/diogojhony.png" },
    ]
  },
  {
    id: "4",
    title: "Aplicativo de Delivery",
    company: "FoodTech",
    sector: "Alimentação",
    status: "in-progress",
    progress: 80,
    nextMilestone: "Testes de Usabilidade",
    dueDate: "2024-03-10",
    description: "Desenvolvimento de aplicativo para entrega de alimentos",
    isFavorite: true,
    members: [
      { id: "5", name: "Ana Silva", avatar: "https://github.com/anasilva.png" },
      { id: "6", name: "Carlos Santos", avatar: "https://github.com/carlossantos.png" },
    ]
  },
  {
    id: "5",
    title: "Plataforma E-learning",
    company: "EduTech",
    sector: "Educação",
    status: "planning",
    progress: 15,
    nextMilestone: "Definição de Requisitos",
    dueDate: "2024-04-20",
    description: "Sistema de ensino a distância com recursos interativos",
    isFavorite: false,
    members: [
      { id: "7", name: "Maria Oliveira", avatar: "https://github.com/mariaoliveira.png" },
      { id: "8", name: "Pedro Costa", avatar: "https://github.com/pedrocosta.png" },
    ]
  },
  {
    id: "6",
    title: "Sistema de Gestão Financeira",
    company: "FinTech",
    sector: "Finanças",
    status: "in-progress",
    progress: 45,
    nextMilestone: "Implementação de Relatórios",
    dueDate: "2024-02-28",
    description: "Software para controle financeiro empresarial",
    isFavorite: true,
    members: [
      { id: "9", name: "Lucas Mendes", avatar: "https://github.com/lucasmendes.png" },
      { id: "10", name: "Juliana Lima", avatar: "https://github.com/julianalima.png" },
    ]
  },
  {
    id: "7",
    title: "Rede Social Corporativa",
    company: "SocialTech",
    sector: "Comunicação",
    status: "planning",
    progress: 30,
    nextMilestone: "Prototipação",
    dueDate: "2024-05-15",
    description: "Plataforma de networking profissional",
    isFavorite: false,
    members: [
      { id: "11", name: "Rafael Souza", avatar: "https://github.com/rafaelsouza.png" },
      { id: "12", name: "Camila Santos", avatar: "https://github.com/camilasantos.png" },
    ]
  },
  {
    id: "8",
    title: "Sistema de Gestão de Estoque",
    company: "LogTech",
    sector: "Logística",
    status: "completed",
    progress: 100,
    nextMilestone: "Treinamento",
    dueDate: "2024-01-30",
    description: "Controle de inventário e supply chain",
    isFavorite: false,
    members: [
      { id: "13", name: "Fernando Alves", avatar: "https://github.com/fernandoalves.png" },
      { id: "14", name: "Patrícia Costa", avatar: "https://github.com/patriciacosta.png" },
    ]
  },
  {
    id: "9",
    title: "Aplicativo de Saúde",
    company: "HealthTech",
    sector: "Saúde",
    status: "in-progress",
    progress: 70,
    nextMilestone: "Integração com APIs",
    dueDate: "2024-03-25",
    description: "App para monitoramento de saúde e bem-estar",
    isFavorite: true,
    members: [
      { id: "15", name: "Roberto Silva", avatar: "https://github.com/robertosilva.png" },
      { id: "16", name: "Amanda Santos", avatar: "https://github.com/amandasantos.png" },
    ]
  },
  {
    id: "10",
    title: "Plataforma de E-commerce",
    company: "ShopTech",
    sector: "Varejo",
    status: "planning",
    progress: 20,
    nextMilestone: "Análise de Mercado",
    dueDate: "2024-06-01",
    description: "Sistema de vendas online com múltiplas funcionalidades",
    isFavorite: false,
    members: [
      { id: "17", name: "Bruno Lima", avatar: "https://github.com/brunolima.png" },
      { id: "18", name: "Carla Oliveira", avatar: "https://github.com/carlaoliveira.png" },
    ]
  }
]

const multiColumnFilterFn: FilterFn<Project> = (row, filterValue) => {
  const searchableRowContent =
    `${row.original.title} ${row.original.company} ${row.original.sector}`.toLowerCase()
  const searchTerm = (filterValue ?? "").toLowerCase()
  return searchableRowContent.includes(searchTerm)
}

const statusFilterFn: FilterFn<Project> = (
  row,
  columnId,
  filterValue: string[]
) => {
  if (!filterValue?.length) return true
  const status = row.getValue(columnId) as string
  return filterValue.includes(status)
}

export default function ProjectsSection() {
  const id = useId()
  const [data, setData] = useState<Project[]>(mockProjects)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const inputRef = useRef<HTMLInputElement>(null)

  const columns: ColumnDef<Project>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Selecionar todos"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
          aria-label="Selecionar linha"
        />
      ),
      size: 28,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "favorite",
      header: () => <span className="sr-only">Favorito</span>,
      cell: ({ row }) => {
        const project = row.original
        return (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={() => {
              const updatedData = data.map((p: Project) =>
                p.id === project.id ? { ...p, isFavorite: !p.isFavorite } : p
              )
              setData(updatedData)
            }}
          >
            <StarIcon
              size={16}
              className={cn(
                "transition-colors",
                project.isFavorite
                  ? "fill-violet-500 text-violet-500"
                  : "text-neutral-400 hover:text-violet-500"
              )}
            />
          </Button>
        )
      },
      size: 40,
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "Título",
      accessorKey: "title",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("title")}</div>
      ),
      size: 200,
      filterFn: multiColumnFilterFn,
      enableHiding: false,
    },
    {
      header: "Empresa",
      accessorKey: "company",
      size: 150,
    },
    {
      header: "Setor",
      accessorKey: "sector",
      size: 150,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const statusMap = {
          "in-progress": { label: "Em Progresso", className: "bg-violet-500/20 text-violet-500" },
          "planning": { label: "Planejamento", className: "bg-violet-300/20 text-violet-300" },
          "completed": { label: "Concluído", className: "bg-violet-950/20 text-violet-300" },
        }
        const { label, className } = statusMap[status as keyof typeof statusMap]
        return <Badge className={className}>{label}</Badge>
      },
      size: 120,
      filterFn: statusFilterFn,
    },
    {
      header: "Progresso",
      accessorKey: "progress",
      cell: ({ row }) => {
        const progress = row.getValue("progress") as number
        return (
          <div className="flex items-center gap-2 w-full">
            <div className="h-2 w-full rounded-full bg-neutral-800">
              <div
                className="h-full rounded-full bg-violet-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm text-neutral-400">{progress}%</span>
          </div>
        )
      },
      size: 200,
    },
    {
      header: "Membros",
      accessorKey: "members",
      cell: ({ row }) => {
        const members = row.original.members
        return (
          <div className="flex -space-x-2">
            {members.map((member) => (
              <img
                key={member.id}
                className="ring-neutral-800 rounded-full"
                src={member.avatar}
                width={22}
                height={22}
                alt={member.name}
              />
            ))}
          </div>
        )
      },
      size: 120,
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Ações</span>,
      cell: ({ row }) => <RowActions row={row} />,
      size: 60,
      enableHiding: false,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  })

  const uniqueStatusValues = useMemo(() => {
    const statusColumn = table.getColumn("status")
    if (!statusColumn) return []
    const values = Array.from(statusColumn.getFacetedUniqueValues().keys())
    return values.sort()
  }, [table.getColumn("status")?.getFacetedUniqueValues()])

  const statusCounts = useMemo(() => {
    const statusColumn = table.getColumn("status")
    if (!statusColumn) return new Map()
    return statusColumn.getFacetedUniqueValues()
  }, [table.getColumn("status")?.getFacetedUniqueValues()])

  const selectedStatuses = useMemo(() => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[]
    return filterValue ?? []
  }, [table.getColumn("status")?.getFilterValue()])

  const handleStatusChange = (checked: boolean, value: string) => {
    const filterValue = table.getColumn("status")?.getFilterValue() as string[]
    const newFilterValue = filterValue ? [...filterValue] : []

    if (checked) {
      newFilterValue.push(value)
    } else {
      const index = newFilterValue.indexOf(value)
      if (index > -1) {
        newFilterValue.splice(index, 1)
      }
    }

    table
      .getColumn("status")
      ?.setFilterValue(newFilterValue.length ? newFilterValue : undefined)
  }

  return (
    <div className="bg-neutral-950 container p-6 mx-auto space-y-8 h-[calc(100vh-4rem)]">
      {/* Filtros */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Filtro por título, empresa ou setor */}
          <div className="relative">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer min-w-60 ps-9 bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500",
                Boolean(table.getColumn("title")?.getFilterValue()) && "pe-9"
              )}
              value={
                (table.getColumn("title")?.getFilterValue() ?? "") as string
              }
              onChange={(e) =>
                table.getColumn("title")?.setFilterValue(e.target.value)
              }
              placeholder="Filtrar por título, empresa ou setor..."
              type="text"
              aria-label="Filtrar por título, empresa ou setor"
            />
            <div className="text-neutral-500 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <ListFilterIcon size={16} aria-hidden="true" />
            </div>
            {Boolean(table.getColumn("title")?.getFilterValue()) && (
              <button
                className="text-neutral-500 hover:text-neutral-300 focus-visible:border-neutral-700 focus-visible:ring-neutral-700/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Limpar filtro"
                onClick={() => {
                  table.getColumn("title")?.setFilterValue("")
                  if (inputRef.current) {
                    inputRef.current.focus()
                  }
                }}
              >
                <CircleXIcon size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          {/* Filtro por status */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-neutral-900 border-neutral-800 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-50">
                <FilterIcon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Status
                {selectedStatuses.length > 0 && (
                  <span className="bg-neutral-800 text-neutral-400 -me-1 inline-flex h-5 max-h-full items-center rounded border border-neutral-700 px-1 font-[inherit] text-[0.625rem] font-medium">
                    {selectedStatuses.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto min-w-36 p-3 bg-neutral-900 border-neutral-800" align="start">
              <div className="space-y-3">
                <div className="text-neutral-400 text-xs font-medium">
                  Filtros
                </div>
                <div className="space-y-3">
                  {uniqueStatusValues.map((value, i) => (
                    <div key={value} className="flex items-center gap-2">
                      <Checkbox
                        id={`${id}-${i}`}
                        checked={selectedStatuses.includes(value)}
                        onCheckedChange={(checked: boolean) =>
                          handleStatusChange(checked, value)
                        }
                        className="border-neutral-700 data-[state=checked]:bg-neutral-700 data-[state=checked]:text-neutral-100"
                      />
                      <Label
                        htmlFor={`${id}-${i}`}
                        className="flex grow justify-between gap-2 font-normal text-neutral-100"
                      >
                        {value}{" "}
                        <span className="text-neutral-400 ms-2 text-xs">
                          {statusCounts.get(value)}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {/* Alternar visibilidade das colunas */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-neutral-900 border-neutral-800 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-50">
                <Columns3Icon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Visualização
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800">
              <DropdownMenuLabel className="text-neutral-100">Alternar colunas</DropdownMenuLabel>
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize text-neutral-100 focus:bg-neutral-800 focus:text-neutral-50"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                      onSelect={(event) => event.preventDefault()}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3">
          {/* Botão de exclusão */}
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto bg-neutral-900 border-neutral-800 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-50" variant="outline">
                  <TrashIcon
                    className="-ms-1 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Excluir
                  <span className="bg-neutral-800 text-neutral-400 -me-1 inline-flex h-5 max-h-full items-center rounded border border-neutral-700 px-1 font-[inherit] text-[0.625rem] font-medium">
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-neutral-900 border-neutral-800">
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-neutral-700"
                    aria-hidden="true"
                  >
                    <CircleAlertIcon className="opacity-80 text-neutral-100" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-neutral-100">
                      Tem certeza absoluta?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-neutral-400">
                      Esta ação não pode ser desfeita. Isso excluirá permanentemente{" "}
                      {table.getSelectedRowModel().rows.length} projeto(s)
                      selecionado(s).
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel className="bg-neutral-800 text-neutral-100 hover:bg-neutral-700">Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={() => {
                    const updatedData = data.filter(
                      (item) => !table.getSelectedRowModel().rows.some((row) => row.original.id === item.id)
                    )
                    setData(updatedData)
                    table.resetRowSelection()
                  }} className="bg-red-600 text-white hover:bg-red-700">
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          {/* Botão de adicionar projeto */}
       <NewProjectDialog/>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-neutral-900 overflow-hidden rounded-md border border-neutral-800">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-neutral-800 border-neutral-800">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11 text-neutral-100"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                            "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault()
                              header.column.getToggleSortingHandler()?.(e)
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "border-neutral-800 hover:bg-neutral-800",
                    row.getIsSelected() && "bg-neutral-800",
                    "[&[data-state=selected]]:!bg-neutral-800"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="last:py-0 text-neutral-100">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-neutral-400"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between gap-8">
        {/* Resultados por página */}
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only text-neutral-100">
            Linhas por página
          </Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value: string) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap bg-neutral-900 border-neutral-800 text-neutral-100">
              <SelectValue placeholder="Selecione o número de resultados" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900 border-neutral-800 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()} className="text-neutral-100 focus:bg-neutral-800 focus:text-neutral-50">
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Informações de página */}
        <div className="text-neutral-400 flex grow justify-end text-sm whitespace-nowrap">
          <p
            className="text-neutral-400 text-sm whitespace-nowrap"
            aria-live="polite"
          >
            <span className="text-neutral-100">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
              -
              {Math.min(
                Math.max(
                  table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  table.getState().pagination.pageSize,
                  0
                ),
                table.getRowCount()
              )}
            </span>{" "}
            de{" "}
            <span className="text-neutral-100">
              {table.getRowCount().toString()}
            </span>
          </p>
        </div>

        {/* Botões de paginação */}
        <div>
          <Pagination>
            <PaginationContent>
              {/* Botão primeira página */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50 bg-neutral-900 border-neutral-800 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-50"
                  onClick={() => table.firstPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Ir para primeira página"
                >
                  <ChevronFirstIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Botão página anterior */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50 bg-neutral-900 border-neutral-800 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-50"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  aria-label="Ir para página anterior"
                >
                  <ChevronLeftIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Botão próxima página */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50 bg-neutral-900 border-neutral-800 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-50"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Ir para próxima página"
                >
                  <ChevronRightIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
              {/* Botão última página */}
              <PaginationItem>
                <Button
                  size="icon"
                  variant="outline"
                  className="disabled:pointer-events-none disabled:opacity-50 bg-neutral-900 border-neutral-800 text-neutral-100 hover:bg-neutral-800 hover:text-neutral-50"
                  onClick={() => table.lastPage()}
                  disabled={!table.getCanNextPage()}
                  aria-label="Ir para última página"
                >
                  <ChevronLastIcon size={16} aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Seção de favoritos */}
      {data.some((p) => p.isFavorite) && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-100 mb-3">Favoritos</h2>
          <ScrollArea className="pb-4">
            <div className="flex gap-4 max-w-full pb-2">
              <AnimatePresence initial={false}>
                {data.filter((p) => p.isFavorite).map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="w-[400px] flex-shrink-0 bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex flex-col gap-3 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <StarIcon size={18} className="text-violet-500 fill-violet-500" />
                      <span className="font-bold text-neutral-100 text-base truncate">{project.title}</span>
                    </div>
                    <div className="text-neutral-400 text-sm truncate">{project.company} • {project.sector}</div>
                    <div className="flex items-center gap-2">
                      <Badge className={
                        project.status === "in-progress"
                          ? "bg-violet-500/20 text-violet-500"
                          : project.status === "planning"
                            ? "bg-violet-300/20 text-violet-300"
                            : "bg-violet-950/20 text-violet-950"
                      }>
                        {project.status === "in-progress"
                          ? "Em Progresso"
                          : project.status === "planning"
                            ? "Planejamento"
                            : "Concluído"}
                      </Badge>
                      <span className="text-xs text-neutral-400">{project.progress}%</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex -space-x-2">
                        {project.members.map((member) => (
                          <img
                            key={member.id}
                            className="ring-neutral-800 rounded-full"
                            src={member.avatar}
                            width={22}
                            height={22}
                            alt={member.name}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-neutral-400 ms-2">{project.members.length} membro(s)</span>
                    </div>
                    <div className="text-xs text-neutral-500 mt-2 truncate">Próxima entrega: {project.nextMilestone}</div>
                    <div className="text-xs text-neutral-500 truncate">Data limite: {new Date(project.dueDate).toLocaleDateString("pt-BR")}</div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

function RowActions({ row }: { row: Row<Project> }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-end">
            <Button
              size="icon"
              variant="ghost"
              className="shadow-none text-neutral-100 hover:bg-neutral-800 hover:text-neutral-50"
              aria-label="Editar item"
            >
              <EllipsisIcon size={16} aria-hidden="true" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800">
          <DropdownMenuGroup>
            <DropdownMenuItem className="text-neutral-100 focus:bg-neutral-800 focus:text-neutral-50">
              <span>Editar</span>
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-neutral-100 focus:bg-neutral-800 focus:text-neutral-50">
              <span>Duplicar</span>
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-neutral-800" />
          <DropdownMenuGroup>
            <DropdownMenuItem className="text-neutral-100 focus:bg-neutral-800 focus:text-neutral-50">
              <span>Arquivar</span>
              <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-neutral-100 focus:bg-neutral-800 focus:text-neutral-50">Mais</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="bg-neutral-900 border-neutral-800">
                  <DropdownMenuItem className="text-neutral-100 focus:bg-neutral-800 focus:text-neutral-50">Mover para projeto</DropdownMenuItem>
                  <DropdownMenuItem className="text-neutral-100 focus:bg-neutral-800 focus:text-neutral-50">Mover para pasta</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-neutral-800" />
                  <DropdownMenuItem className="text-neutral-100 focus:bg-neutral-800 focus:text-neutral-50">Opções avançadas</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-neutral-800" />
          <DropdownMenuGroup>
            <DropdownMenuItem className="text-neutral-100 focus:bg-neutral-800 focus:text-neutral-50">Compartilhar</DropdownMenuItem>
            <DropdownMenuItem className="text-neutral-100 focus:bg-neutral-800 focus:text-neutral-50">Adicionar aos favoritos</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator className="bg-neutral-800" />
          <DropdownMenuItem
            className="text-red-500 focus:text-red-500 focus:bg-neutral-800"
            onClick={() => setShowDeleteDialog(true)}
          >
            <span>Excluir</span>
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-neutral-900 border-neutral-800">
          <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-neutral-700"
              aria-hidden="true"
            >
              <CircleAlertIcon className="opacity-80 text-neutral-100" size={16} />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-neutral-100">
                Tem certeza absoluta?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-neutral-400">
                Esta ação não pode ser desfeita. Isso excluirá permanentemente o projeto "{row.original.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-neutral-800 text-neutral-100 hover:bg-neutral-700">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                // Implementar lógica de exclusão aqui
                setShowDeleteDialog(false)
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
} 