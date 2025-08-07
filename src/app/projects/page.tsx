"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { ProjectBoard } from "@/components/projects/project-board";
import { WebProjectDashboard } from "@/components/projects/web-project-dashboard";
import { webProjects as initialWebProjects } from "@/lib/web-projects-data";
import { tasks as initialTasks } from "@/lib/data";
import { WebProject, Task } from "@/types";

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
        <ProjectBoard 
          projects={webProjects} 
          onUpdateProject={handleUpdateWebProject}
          onAddTask={handleAddTask}
        />
      </div>
    </div>
  );
}
