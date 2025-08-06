import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CheckCircle, FolderKanban, ListTodo } from 'lucide-react';
import { projects, tasks } from '@/lib/data';

export function OverviewCards() {
  const pendingTasks = tasks.filter(t => t.status !== 'Done').length;
  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status !== 'Completed').length;

  const cardData = [
    { title: 'Proyectos Totales', value: totalProjects, icon: FolderKanban },
    { title: 'Tareas Pendientes', value: pendingTasks, icon: ListTodo },
    { title: 'Tareas Completadas', value: completedTasks, icon: CheckCircle },
    { title: 'Proyectos Activos', value: activeProjects, icon: Activity },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
