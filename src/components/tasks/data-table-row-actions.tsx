"use client";

import React, { useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Pen, Trash, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditTaskForm } from "./edit-task-form";
import { Task } from "@/types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onUpdateTask: (task: Task) => void;
  onAddTask: (task: Task) => void;
}

export function DataTableRowActions<TData>({
  row,
  onUpdateTask,
  onAddTask,
}: DataTableRowActionsProps<TData>) {
  const task = row.original as Task;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddSubtaskDialogOpen, setIsAddSubtaskDialogOpen] = useState(false);


  const handleAddSubtask = (subtask: Task) => {
    onAddTask(subtask);
  }

  const newSubtask: Task = {
      id: `task-${Date.now()}`,
      title: 'Nueva Subtarea',
      projectId: task.projectId,
      status: 'To Do',
      priority: 'Medium',
      assigneeId: null,
      estimatedDuration: 1,
      parentId: task.id,
  }

  return (
    <>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
                <Pen className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
            </DialogTrigger>
             <DropdownMenuItem onSelect={() => handleAddSubtask(newSubtask)}>
              <Plus className="mr-2 h-4 w-4" />
              Añadir Subtarea
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
              <Trash className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
    </>
  );
}
