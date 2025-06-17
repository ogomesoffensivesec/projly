import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ProjectCard } from "./project-card";
import { UpdateCard } from "./update-card";

const mockProjects = [
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
  },
];

const mockUpdates = [
  {
    id: "1",
    type: "project",
    title: "Sistema de Gestão de RH",
    description: "Nova funcionalidade de relatórios implementada",
    timestamp: "2024-03-20T10:30:00",
  },
  {
    id: "2",
    type: "task",
    title: "Portal do Colaborador",
    description: "Tarefa 'Autenticação SSO' concluída",
    timestamp: "2024-03-20T09:15:00",
  },
  {
    id: "3",
    type: "comment",
    title: "Dashboard de Vendas",
    description: "Novo comentário em 'Relatório de Performance'",
    timestamp: "2024-03-19T16:45:00",
  },
];

export default function DashboardSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const totalPages = Math.ceil(mockProjects.length / itemsPerPage);

  const getCurrentProjects = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return mockProjects.slice(startIndex, endIndex);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return (
    <div className= " bg-neutral-950 container p-6 mx-auto space-y-8 h-[calc(100vh-4rem)] ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-neutral-100">Visão Geral</h2>
        <Button variant="outline" className="bg-neutral-900/50 border-neutral-800 hover:bg-neutral-800 hover:text-white">
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-neutral-400 mb-2">Tarefas Pendentes</h3>
            <p className="text-4xl font-bold text-violet-400">12</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-neutral-400 mb-2">Projetos Ativos</h3>
            <p className="text-4xl font-bold text-violet-400">8</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-neutral-400 mb-2">Departamentos</h3>
            <p className="text-4xl font-bold text-violet-400">3</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-neutral-400 mb-2">Colaboradores</h3>
            <p className="text-4xl font-bold text-violet-400">24</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between gap-8">
        <div className="flex-1 space-y-4 h-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-neutral-100">Projetos</h2>
            <Badge className="bg-violet-400/10 text-xs font-normal p-2 rounded-lg text-violet-300">
              Última atualização {formatDate(new Date().toISOString())}
            </Badge>
          </div>

          <div className="h-full">
            <div className="space-y-4">
              {getCurrentProjects().map((project) => (
                <ProjectCard key={project.id} project={project} formatDate={formatDate} />
              ))}
            </div>

            <div className="flex items-center justify-between mt-6 pb-4">
              <div className="text-sm text-neutral-400">
                Mostrando {getCurrentProjects().length} de {mockProjects.length} projetos
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="bg-neutral-900/50 border-neutral-800 hover:bg-neutral-800"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm text-neutral-400">
                  Página {currentPage} de {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="bg-neutral-900/50 border-neutral-800 hover:bg-neutral-800"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-96 space-y-4 h-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-neutral-100">Últimas Atualizações</h2>
            <Bell className="h-5 w-5 text-neutral-400" />
          </div>

          <div className="space-y-4">
            {mockUpdates.map((update) => (
              <UpdateCard key={update.id} update={update} formatDate={formatDate} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}