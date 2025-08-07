"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { webProjects } from "@/lib/web-projects-data";

interface ProjectColumnProps {
    title: string;
    projects: string[];
}

function ProjectCard({ name }: { name: string }) {
    return (
        <Card>
            <CardContent className="p-3">
                <p className="font-medium text-sm">{name}</p>
            </CardContent>
        </Card>
    )
}

function ProjectColumn({ title, projects }: ProjectColumnProps) {
    return (
        <div className="flex flex-col gap-4 rounded-lg bg-muted/50 p-4">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            <div className="flex flex-col gap-3">
                {projects.map(project => (
                    <ProjectCard key={project} name={project} />
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
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProjectColumn title="Proyectos" projects={webProjects.projects} />
            <ProjectColumn title="Igualas" projects={webProjects.retainers} />
        </div>
    );
}
