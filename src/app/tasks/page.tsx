"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { DataTable } from "@/components/tasks/data-table";
import { columns } from "@/components/tasks/columns";
import { tasks as initialTasks } from "@/lib/data";
import { Task } from "@/types";

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);

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

  const topLevelTasks = tasks.filter(task => !task.parentId);

  const tasksWithSubtasks = topLevelTasks.map(task => ({
    ...task,
    subRows: tasks.filter(subtask => subtask.parentId === task.id)
  }));


  return (
    <div className="flex h-full flex-col">
      <Header title="Tareas" />
      <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        <DataTable columns={columns({ onUpdateTask, onAddTask })} data={tasksWithSubtasks} onUpdateTask={onUpdateTask} onAddTask={onAddTask} />
      </div>
    </div>
  );
}
