import { Card, CardContent } from "@/components/ui/card";
import { Bell, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UpdateCardProps {
  update: {
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: string;
  };
  formatDate: (date: string) => string;
}

export function UpdateCard({ update, formatDate }: UpdateCardProps) {
  return (
    <Card className="bg-neutral-900/50 border-neutral-800">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-1">
            <Bell className="h-4 w-4 text-violet-400" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-neutral-100">{update.title}</p>
         
                <ExternalLink className="h-4 w-4 " />
            </div>
            <p className="text-xs text-neutral-400">{update.description}</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-neutral-500">{formatDate(update.timestamp)}</p>
              <div className="flex items-center rounded-full">
                <div className="flex -space-x-2">
                  <img
                    className="ring-neutral-800 rounded-full"
                    src="https://github.com/diego3g.png"
                    width={22}
                    height={22}
                    alt="Diego Fernandes"
                  />
                  <img
                    className="ring-neutral-800 rounded-full"
                    src="https://github.com/ogomesoffensivesec.png"
                    width={22}
                    height={22}
                    alt="Oscar Gomes"
                  />
                  <img
                    className="ring-neutral-800 rounded-full"
                    src="https://github.com/diogojhony.png"
                    width={22}
                    height={22}
                    alt="Diogo Jhony"
                  />
                  <img
                    className="ring-neutral-800 rounded-full"
                    src="https://github.com/josepholiveira.png"
                    width={22}
                    height={22}
                    alt="José Oliveira"
                  />
                </div>
                <Button
                  variant="secondary"
                  className="text-neutral-400 hover:text-neutral-300 flex items-center justify-center rounded-full bg-transparent px-2 text-xs shadow-none hover:bg-transparent"
                >
                  +3
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}