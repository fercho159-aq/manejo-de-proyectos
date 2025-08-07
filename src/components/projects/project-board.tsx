"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { WebProject, WebProjectStatus, WebProjectType, Task } from "@/types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Building, Code, ExternalLink, HardHat, Rocket, MoreHorizontal, Edit, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { EditWebProjectForm } from "./edit-web-project-form";
import { EditTaskForm } from "../tasks/edit-task-form";

interface ProjectBoardProps {
    projects: WebProject[];
    onUpdateProject: (project: WebProject) => void;
    onAddTask: (task: Task) => void;
}

interface ProjectColumnProps {
    title: string;
    projects: WebProject[];
    onUpdateProject: (project: WebProject) => void;
    onAddTask: (task: Task) => void;
}

const statusConfig: Record<WebProjectStatus, { label: string; className: string }> = {
    'En Desarrollo': { label: 'En Desarrollo', className: 'bg-blue-100 text-blue-800' },
    'Mantenimiento': { label: 'Mantenimiento', className: 'bg-yellow-100 text-yellow-800' },
    'Pausado': { label: 'Pausado', className: 'bg-gray-100 text-gray-800' },
    'Finalizado': { label: 'Finalizado', className: 'bg-green-100 text-green-800' },
};

const techIcons: Record<string, React.ReactNode> = {
    'Next.js': <Rocket className="h-4 w-4" />,
    'React': <Code className="h-4 w-4" />,
    'Firebase': <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.1 8.4c.3-1.5-.5-2.5-2-3-1.5-.7-3.1-.1-3.5 1.4-.4 1.5.5 2.5 2 3 1.5.5 3 .1 3.5-1.4zM5.9 15.6c-.3 1.5.5 2.5 2 3 1.5.5 3 .1 3.5-1.4.4-1.5-.5-2.5-2-3-1.5-.6-3.1-.1-3.5 1.4z"/><path d="M12 11.4c-1.5-.5-2.5.5-3 2s.1 3.1 1.4 3.5c1.5.4 2.5-.5 3-2s-.1-3-1.4-3.5z"/><path d="M12.6 3.4L6 18.2"/><path d="M17.8 4.3L8.2 13.9"/></svg>,
    'TailwindCSS': <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 14l-4 4-4-4"/><path d="M12 2v16"/></svg>,
    'Wordpress': <HardHat className="h-4 w-4" />,
    'Shopify': <Building className="h-4 w-4" />,
    'HTML': <Code className="h-4 w-4" />,
    'CSS': <Code className="h-4 w-4" />,
}


function ProjectCard({ project, onUpdateProject, onAddTask }: { project: WebProject; onUpdateProject: (project: WebProject) => void; onAddTask: (task: Task) => void; }) {
    const statusInfo = statusConfig[project.status];
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

    const defaultNewTask: Partial<Task> = {
        title: '',
        projectId: project.id, // Pre-fill project
        status: 'To Do',
        priority: 'Medium',
        assigneeId: null,
        estimatedDuration: 1,
    };

    return (
        <Dialog open={isEditOpen || isAddTaskOpen} onOpenChange={(open) => {
            if (isEditOpen) setIsEditOpen(open);
            if (isAddTaskOpen) setIsAddTaskOpen(open);
        }}>
            <Card>
                <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between">
                        <CardTitle className="text-base font-semibold">{project.name}</CardTitle>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="text-muted-foreground hover:text-foreground -mr-2 -mt-2 flex h-7 w-7 items-center justify-center rounded-md">
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => setIsEditOpen(true)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Editar Proyecto
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setIsAddTaskOpen(true)}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Crear Tarea
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-4">
                        <Badge variant="outline" className={cn("text-xs w-fit", statusInfo.className)}>{statusInfo.label}</Badge>
                         {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs">
                                <ExternalLink className="h-3 w-3" />
                                Ver en vivo
                            </a>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                    <div className="flex items-center justify-start text-sm text-muted-foreground">
                        <TooltipProvider>
                        <div className="flex items-center gap-2">
                            {project.technologies.map(tech => (
                            <Tooltip key={tech}>
                                <TooltipTrigger asChild>
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                                    {techIcons[tech] || <Code className="h-4 w-4" />}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{tech}</p>
                                </TooltipContent>
                            </Tooltip>
                            ))}
                        </div>
                        </TooltipProvider>
                    </div>
                </CardContent>
                {project.dueDate && (
                    <CardFooter className="p-4 pt-0">
                        <div className="text-xs text-muted-foreground">
                            Fecha de entrega: {format(new Date(project.dueDate), 'PPP', { locale: es })}
                        </div>
                    </CardFooter>
                )}
            </Card>

             <DialogContent>
                 {isEditOpen && (
                    <>
                    <DialogHeader>
                        <DialogTitle>Editar Proyecto Web</DialogTitle>
                    </DialogHeader>
                    <EditWebProjectForm 
                        project={project} 
                        onUpdateProject={(updatedProject) => {
                            onUpdateProject(updatedProject);
                            setIsEditOpen(false);
                        }} 
                        onClose={() => setIsEditOpen(false)} 
                    />
                    </>
                 )}
                 {isAddTaskOpen && (
                     <>
                     <DialogHeader>
                         <DialogTitle>Crear Tarea para {project.name}</DialogTitle>
                     </DialogHeader>
                      <EditTaskForm 
                        task={defaultNewTask} 
                        onUpdateTask={(newTask) => {
                            onAddTask(newTask as Task);
                            setIsAddTaskOpen(false);
                        }}
                        onClose={() => setIsAddTaskOpen(false)}
                        isAdding
                      />
                     </>
                 )}
            </DialogContent>
        </Dialog>
    )
}

function ProjectColumn({ title, projects, onUpdateProject, onAddTask }: ProjectColumnProps) {
    return (
        <div className="flex flex-col gap-4 rounded-lg bg-muted/50 p-4">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <div className="flex flex-col gap-3">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} onUpdateProject={onUpdateProject} onAddTask={onAddTask} />
                ))}
                 {projects.length === 0 && (
                    <div className="flex h-24 items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/30">
                        <p className="text-sm text-muted-foreground">No hay proyectos</p>
                    </div>
                )}
            </div>
        </div>
    )
}


export function ProjectBoard({ projects, onUpdateProject, onAddTask }: ProjectBoardProps) {
    const projectsList = projects.filter(p => p.type === 'project');
    const retainersList = projects.filter(p => p.type === 'retainer');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProjectColumn title="Proyectos" projects={projectsList} onUpdateProject={onUpdateProject} onAddTask={onAddTask} />
            <ProjectColumn title="Igualas" projects={retainersList} onUpdateProject={onUpdateProject} onAddTask={onAddTask} />
        </div>
    );
}
