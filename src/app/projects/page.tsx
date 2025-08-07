"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { ProjectBoard } from "@/components/projects/project-board";
import { WebProjectDashboard } from "@/components/projects/web-project-dashboard";
import { webProjects as initialWebProjects } from "@/lib/web-projects-data";
import { tasks as initialTasks } from "@/lib/data";
import { WebProject, Task } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DueDateCalendar } from "@/components/projects/due-date-calendar";
import { ProjectStatusChart } from "@/components/projects/project-status-chart";

export default function ProjectsPage() {
  const [webProjects, setWebProjects] = useState<WebProject[]>(initialWebProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleUpdateWebProject = (updatedProject: WebProject) => {
    setWebProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };
  
  const handleAddTask = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
    // Note: This adds the task to the state of this page,
    // but won't be reflected in the main /tasks page unless state is global.
    alert(`Tarea "${newTask.title}" creada para el proyecto.`);
  };

  return (
    <div className="flex h-full flex-col">
      <Header title="Proyectos Web" />
      <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        <WebProjectDashboard projects={webProjects} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
             <ProjectBoard 
                projects={webProjects} 
                onUpdateProject={handleUpdateWebProject}
                onAddTask={handleAddTask}
            />
          </div>
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Fechas de Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <DueDateCalendar projects={webProjects} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Estado de Proyectos</CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectStatusChart projects={webProjects} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
