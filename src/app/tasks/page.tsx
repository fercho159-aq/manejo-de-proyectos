"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { DataTable } from "@/components/tasks/data-table";
import { columns } from "@/components/tasks/columns";
import { tasks as initialTasks } from "@/lib/data";
import { Task, taskAreas, TaskArea } from "@/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState<"All" | TaskArea>("All");

  const onUpdateTask = (updatedTask: Task) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => 
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      );
    });
  };

  const onAddTask = (newTask: Task) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  }

  const getSubtasks = (taskId: string, allTasks: Task[]): Task[] => {
    const subtasks = allTasks.filter(task => task.parentId === taskId);
    return subtasks.map(subtask => ({
      ...subtask,
      subRows: getSubtasks(subtask.id, allTasks)
    }));
  };

  const filteredTasks = tasks.filter(task => activeTab === "All" || task.area === activeTab);
  const topLevelTasks = filteredTasks.filter(task => !task.parentId);

  const tasksWithSubtasks = topLevelTasks.map(task => ({
    ...task,
    subRows: getSubtasks(task.id, tasks) // Pass all tasks to find subtasks recursively
  }));

  return (
    <div className="flex h-full flex-col">
      <Header title="Tareas" />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Tabs defaultValue="All" onValueChange={(value) => setActiveTab(value as "All" | TaskArea)} className="w-full">
          <TabsList>
            <TabsTrigger value="All">Todas</TabsTrigger>
            {taskAreas.map(area => (
              <TabsTrigger key={area} value={area}>{area}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <DataTable columns={columns({ onUpdateTask, onAddTask })} data={tasksWithSubtasks} onUpdateTask={onUpdateTask} onAddTask={onAddTask} />
      </div>
    </div>
  );
}
