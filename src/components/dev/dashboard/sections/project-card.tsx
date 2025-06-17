import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Calendar, CheckCircle2, Clock } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    company: string;
    sector: string;
    status: string;
    progress: number;
    nextMilestone: string;
    dueDate: string;
    description: string;
  };
  formatDate: (date: string) => string;
}

export function ProjectCard({ project, formatDate }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-500"
      case "in-progress":
        return "bg-blue-500/10 text-blue-500"
      case "planning":
        return "bg-amber-500/10 text-amber-500"
      default:
        return "bg-neutral-500/10 text-neutral-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "planning":
        return <Calendar className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído"
      case "in-progress":
        return "Em andamento"
      case "planning":
        return "Planejamento"
      default:
        return "Desconhecido"
    }
  }

  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-neutral-100">{project.title}</h3>
          <div className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusColor(project.status)}`}>
            {getStatusIcon(project.status)}
            <span>{getStatusText(project.status)}</span>
          </div>
        </div>
        <p className="text-sm text-neutral-400 mb-4">
          {project.company} • {project.sector}
        </p>
        <p className="text-sm text-neutral-400 mb-4">{project.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-neutral-300">
            <span>Progresso</span>
            <span>{project.progress}%</span>
          </div>
          <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-neutral-400">
          <span>Próximo marco: {project.nextMilestone}</span>
          <span>Data limite: {formatDate(project.dueDate)}</span>
        </div>
      </CardContent>
    </Card>
  );
}