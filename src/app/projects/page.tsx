"use client";

import { Header } from "@/components/layout/header";
import { ProjectBoard } from "@/components/projects/project-board";

export default function ProjectsPage() {

  return (
    <div className="flex h-full flex-col">
      <Header title="Proyectos Web" />
      <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        <ProjectBoard />
      </div>
    </div>
  );
}
