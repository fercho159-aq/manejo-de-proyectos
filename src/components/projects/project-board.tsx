"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { webProjects } from "@/lib/web-projects-data";
import { WebProject, WebProjectStatus, WebProjectType } from "@/types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { users } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Building, Code, ExternalLink, HardHat, Rocket } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ProjectColumnProps {
    title: string;
    projects: WebProject[];
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


function ProjectCard({ project }: { project: WebProject }) {
    const statusInfo = statusConfig[project.status];
    const assignee = users.find(u => u.id === project.assigneeId);

    return (
        <Card>
            <CardHeader className="p-4 pb-2">
                 <div className="flex items-start justify-between">
                    <CardTitle className="text-base font-semibold">{project.name}</CardTitle>
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    )}
                </div>
                 <Badge variant="outline" className={cn("text-xs w-fit", statusInfo.className)}>{statusInfo.label}</Badge>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
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

                    {assignee && (
                        <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={assignee.avatar} />
                                    <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{assignee.name}</p>
                            </TooltipContent>
                        </Tooltip>
                        </TooltipProvider>
                    )}
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
    )
}

function ProjectColumn({ title, projects }: ProjectColumnProps) {
    return (
        <div className="flex flex-col gap-4 rounded-lg bg-muted/50 p-4">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <div className="flex flex-col gap-3">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
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


export function ProjectBoard() {
    const projectsList = webProjects.filter(p => p.type === 'project');
    const retainersList = webProjects.filter(p => p.type === 'retainer');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProjectColumn title="Proyectos" projects={projectsList} />
            <ProjectColumn title="Igualas" projects={retainersList} />
        </div>
    );
}
