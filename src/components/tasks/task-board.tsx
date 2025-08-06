
"use client";

import { Task, User } from "@/types";
import { projects } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Circle, Dot, HelpCircle, CheckCircle, ArrowUp, ArrowRight, ArrowDown, Pen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useState, useEffect } from "react";
import { EditTaskForm } from "./edit-task-form";


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


function TaskCard({ task, index, onUpdateTask }: { task: Task; index: number; onUpdateTask: (task: Task) => void }) {
    const status = getStatus(task.status);
    const priority = getPriority(task.priority);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    
    return (
        <Draggable draggableId={task.id} index={index} ignoreContainerClipping={false}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <Card className={cn(
                        "w-full",
                        snapshot.isDragging ? "bg-card/80 shadow-lg" : ""
                    )}>
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
                                        <DialogTrigger asChild>
                                            <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                                                <Pen className="mr-2 h-4 w-4" />
                                                Editar
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Eliminar</DropdownMenuItem>
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
                                    {task.assigneeId && users.find(u => u.id === task.assigneeId) ? (
                                        <Avatar className="h-5 w-5">
                                            <AvatarImage src={users.find(u => u.id === task.assigneeId)?.avatar} />
                                            <AvatarFallback>{users.find(u => u.id === task.assigneeId)?.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    ) : (
                                      <div className="h-5 w-5" />
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    {priority && <priority.icon className={cn("h-3.5 w-3.5", priority.color)} />}
                                </div>
                                <Badge variant="secondary">{task.estimatedDuration}h</Badge>
                            </div>
                        </CardContent>
                    </Card>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Editar Tarea</DialogTitle>
                        </DialogHeader>
                        <EditTaskForm
                        task={task}
                        onUpdateTask={onUpdateTask}
                        onClose={() => setIsEditDialogOpen(false)}
                        />
                    </DialogContent>
                  </Dialog>
                </div>
            )}
        </Draggable>
    )
}

export function TaskBoard({ tasks, users, onUpdateTask }: TaskBoardProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
    ) {
      return; 
    }

    const task = tasks.find(t => t.id === draggableId);
    if (task) {
      const newAssigneeId = destination.droppableId === 'unassigned' ? null : destination.droppableId;
      onUpdateTask({ ...task, assigneeId: newAssigneeId });
    }
  };

  const userColumns = [
    ...users,
    { id: "unassigned", name: "Sin asignar", avatar: "", email: "" },
  ];

  if (!isClient) {
    return null; // Don't render on the server
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid auto-cols-[minmax(280px,1fr)] grid-flow-col gap-4 overflow-x-auto pb-4">
        {userColumns.map(user => {
            const userTasks = tasks.filter(task => (user.id === 'unassigned' ? task.assigneeId === null : task.assigneeId === user.id)  && !task.parentId);
            return (
            <Droppable droppableId={user.id} key={user.id} isDropDisabled={false} isCombineEnabled={false}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={cn(
                            "flex flex-col gap-4 rounded-lg bg-muted/50 p-3 transition-colors",
                            snapshot.isDraggingOver ? "bg-muted" : "bg-muted/50"
                        )}
                    >
                        <div className="flex items-center gap-2">
                        {user.id !== 'unassigned' && (
                            <Avatar className="h-7 w-7 border">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <h3 className="font-semibold text-sm">{user.name}</h3>
                        <Badge variant="secondary" className="text-xs">{userTasks.length}</Badge>
                        </div>
                        <div className="flex flex-col gap-3 min-h-[100px]">
                            {userTasks.map((task, index) => (
                                <TaskCard key={task.id} task={task} index={index} onUpdateTask={onUpdateTask} />
                            ))}
                            {provided.placeholder}
                            {userTasks.length === 0 && !snapshot.isDraggingOver && (
                                <div className="flex h-24 items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/30">
                                    <p className="text-xs text-muted-foreground">Arrastra tareas aquí</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Droppable>
            );
        })}
        </div>
    </DragDropContext>
  );
}
