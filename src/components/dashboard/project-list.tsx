
"use client";

import { projects, tasks, users } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Circle, Dot, HelpCircle, CheckCircle } from 'lucide-react';

const statuses = [
  { value: "To Do", label: "Por Hacer", icon: Circle },
  { value: "In Progress", label: "En Progreso", icon: Dot },
  { value: "In Review", label: "En Revisión", icon: HelpCircle },
  { value: "Done", label: "Hecho", icon: CheckCircle },
];


export function ProjectList() {
  const recentProjects = projects.slice(0, 5);

  return (
    <Accordion type="single" collapsible className="w-full">
      {recentProjects.map((project) => {
        const projectTasks = tasks.filter((task) => task.projectId === project.id);
        
        return (
          <AccordionItem value={project.id} key={project.id}>
            <AccordionTrigger className="hover:no-underline">
              <div className="grid flex-1 grid-cols-2 items-center gap-4 text-left md:grid-cols-4">
                <div className="font-medium">{project.name}</div>
                <div className="text-muted-foreground">{project.client}</div>
                <div>
                  <Badge
                    className={cn('text-xs', {
                      'border-transparent bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': project.status === 'On Track',
                      'border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': project.status === 'At Risk',
                      'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': project.status === 'Completed',
                    })}
                  >
                    {project.status === 'On Track' ? 'En Curso' : project.status === 'At Risk' ? 'En Riesgo' : 'Completado'}
                  </Badge>
                </div>
                <div className="text-right text-muted-foreground">
                  {project.dueDate ? format(new Date(project.dueDate), 'PPP') : '-'}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
                {projectTasks.length > 0 ? (
                <div className="px-4 py-2 border-t">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tarea</TableHead>
                        <TableHead>Asignado a</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projectTasks.map(task => {
                            const user = users.find(u => u.id === task.assigneeId);
                            const status = statuses.find(s => s.value === task.status);
                            return (
                                <TableRow key={task.id}>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>
                                    {user ? (
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span>{user.name}</span>
                                        </div>
                                        ) : (
                                        <span className="text-muted-foreground">Sin asignar</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {status && (
                                            <div className="flex items-center gap-2">
                                                <status.icon className="h-4 w-4 text-muted-foreground" />
                                                <span>{status.label}</span>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                  </Table>
                </div>
                ) : (
                    <div className="px-4 py-4 text-center text-muted-foreground">
                        No hay tareas para este proyecto.
                    </div>
                )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
