"use client";

import { Task, User, Project } from "@/types";
import { projects } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Circle, Dot, HelpCircle, CheckCircle, ArrowUp, ArrowRight, ArrowDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskBoardProps {
  tasks: Task[];
  users: User[];
  onUpdateTask: (task: Task) => void;
}

const statuses = [
  { value: "To Do", label: "Por Hacer", icon: Circle },
  { value: "In Progress", label: "En Progreso", icon: Dot },
  { value: "In Review", label: "En Revisión", icon: HelpCircle },
  { value: "Done", label: "Hecho", icon: CheckCircle },
];

const priorities = [
  { value: "Low", label: "Baja", icon: ArrowDown, color: "text-green-500" },
  { value: "Medium", label: "Media", icon: ArrowRight, color: "text-yellow-500" },
  { value: "High", label: "Alta", icon: ArrowUp, color: "text-red-500" },
];

const getClientName = (projectId: string) => projects.find(p => p.id === projectId)?.client ?? "N/A";
const getStatus = (statusValue: Task['status']) => statuses.find(s => s.value === statusValue);
const getPriority = (priorityValue: Task['priority']) => priorities.find(p => p.value === priorityValue);


function TaskCard({ task }: { task: Task }) {
    const status = getStatus(task.status);
    const priority = getPriority(task.priority);
    
    return (
        <Card>
            <CardHeader className="p-3 pb-2">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium leading-tight">{task.title}</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="text-muted-foreground hover:text-foreground -mr-2 -mt-2 flex h-6 w-6 items-center justify-center rounded-md">
                                <MoreHorizontal className="h-4 w-4" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <p className="text-xs text-muted-foreground">
                    Cliente: {getClientName(task.projectId)}
                </p>
            </CardHeader>
            <CardContent className="p-3 pt-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        {status && <status.icon className="h-3.5 w-3.5" />}
                        <span>{status?.label}</span>
                    </div>
                     <div className="flex items-center gap-1">
                        {priority && <priority.icon className={cn("h-3.5 w-3.5", priority.color)} />}
                        <span>{priority?.label}</span>
                    </div>
                    <Badge variant="secondary">{task.estimatedDuration}h</Badge>
                </div>
            </CardContent>
        </Card>
    )
}

export function TaskBoard({ tasks, users, onUpdateTask }: TaskBoardProps) {
  const userColumns = [
    ...users,
    { id: "null", name: "Sin asignar", avatar: "", email: "" },
  ];

  return (
    <div className="grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-4 overflow-x-auto pb-4">
      {userColumns.map(user => {
        const userTasks = tasks.filter(task => (user.id === 'null' ? task.assigneeId === null : task.assigneeId === user.id));
        return (
          <div key={user.id} className="flex flex-col gap-4 rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2">
              {user.id !== 'null' && (
                <Avatar className="h-7 w-7 border">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <h3 className="font-semibold text-sm">{user.name}</h3>
              <Badge variant="secondary" className="text-xs">{userTasks.length}</Badge>
            </div>
            <div className="flex flex-col gap-3">
                {userTasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
                 {userTasks.length === 0 && (
                    <div className="flex h-24 items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/30">
                        <p className="text-xs text-muted-foreground">No hay tareas asignadas</p>
                    </div>
                )}
            </div>
          </div>
        );
      })}
    </div>
  );
}