"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { DataTable } from "@/components/tasks/data-table";
import { columns } from "@/components/tasks/columns";
import { tasks as initialTasks, users } from "@/lib/data";
import { Task, taskAreas, TaskArea } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TaskBoard } from "@/components/tasks/task-board";
import { LayoutGrid, List } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState<"All" | TaskArea>("All");
  const [view, setView] = useState("table");

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

  const filteredTasksByArea = tasks.filter(task => activeTab === "All" || task.area === activeTab);
  
  const topLevelTasks = filteredTasksByArea.filter(task => !task.parentId);

  const tasksWithSubtasks = topLevelTasks.map(task => ({
    ...task,
    subRows: getSubtasks(task.id, tasks) // Pass all tasks to find subtasks recursively
  }));

  return (
    <div className="flex h-full flex-col">
      <Header title="Tareas" />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Tabs defaultValue="table" onValueChange={setView} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="table">
                <List className="mr-2 h-4 w-4" />
                Tabla
              </TabsTrigger>
              <TabsTrigger value="board">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Tablero
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="table" className="mt-4">
            <Tabs defaultValue="All" onValueChange={(value) => setActiveTab(value as "All" | TaskArea)} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="All">Todas</TabsTrigger>
                {taskAreas.map(area => (
                  <TabsTrigger key={area} value={area}>{area}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <DataTable columns={columns({ onUpdateTask, onAddTask })} data={tasksWithSubtasks} onUpdateTask={onUpdateTask} onAddTask={onAddTask} />
          </TabsContent>
          <TabsContent value="board" className="mt-4">
            <TaskBoard tasks={tasks} users={users} onUpdateTask={onUpdateTask} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}