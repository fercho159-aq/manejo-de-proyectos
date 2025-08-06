"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task, User, Project } from "@/types";
import { users, projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowDown, ArrowRight, ArrowUp, CheckCircle, ChevronDown, ChevronRight, Circle, Dot, HelpCircle, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const statuses = [
  { value: "To Do", label: "Por Hacer", icon: Circle },
  { value: "In Progress", label: "En Progreso", icon: Dot },
  { value: "In Review", label: "En Revisión", icon: HelpCircle },
  { value: "Done", label: "Hecho", icon: CheckCircle },
];

const priorities = [
  { value: "Low", label: "Baja", icon: ArrowDown },
  { value: "Medium", label: "Media", icon: ArrowRight },
  { value: "High", label: "Alta", icon: ArrowUp },
];

type ColumnsProps = {
  onUpdateTask: (task: Task) => void;
  onAddTask: (task: Task) => void;
}

export const columns = ({ onUpdateTask, onAddTask }: ColumnsProps): ColumnDef<Task>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Título" />
    ),
    cell: ({ row }) => {
      const canExpand = row.getCanExpand();
      const isExpanded = row.getIsExpanded();
      return (
        <div style={{ paddingLeft: `${row.depth * 2}rem` }} className="flex items-center gap-2">
          {canExpand && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => row.toggleExpanded()}
              className="h-6 w-6"
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
          <span>{row.original.title}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "area",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Área" />
    ),
    cell: ({ row }) => {
      const area = row.original.area;
      if (!area) {
        return <span className="text-muted-foreground">-</span>;
      }
      return (
        <Badge variant="outline">{area}</Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "assigneeId",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Asignado a" />
    ),
    cell: ({ row }) => {
      const user: User | undefined = users.find(u => u.id === row.original.assigneeId);
      if (!user) {
        return <span className="text-muted-foreground">Sin asignar</span>;
      }
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{user.name}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const user: User | undefined = users.find(u => u.id === row.getValue(id));
      return user ? user.name.toLowerCase().includes(String(value).toLowerCase()) : false;
    },
  },
  {
    accessorKey: "projectId",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cliente" />
    ),
    cell: ({ row }) => {
      const project: Project | undefined = projects.find(p => p.id === row.original.projectId);
      if (!project) {
        return <span className="text-muted-foreground">-</span>;
      }
      return (
        <div className="flex items-center gap-2">
          <span>{project.client}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const project: Project | undefined = projects.find(p => p.id === row.getValue(id));
      return project ? project.client.toLowerCase().includes(String(value).toLowerCase()) : false;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(s => s.value === row.getValue("status"));

      if (!status) return null;
      
      return (
        <Select 
          value={status.value} 
          onValueChange={(value) => {
            onUpdateTask({
              ...row.original,
              status: value as Task['status'],
            })
          }}
        >
          <SelectTrigger className="w-40 capitalize">
            <div className="flex items-center">
              <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Seleccionar estado" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {statuses.map(s => (
              <SelectItem key={s.value} value={s.value} className="capitalize">
                 <div className="flex items-center">
                  <s.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{s.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prioridad" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(p => p.value === row.getValue("priority"));
      if (!priority) return null;
      return (
        <div className="flex items-center">
          <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{priority.label}</span>
        </div>
      );
    },
     filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "estimatedDuration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duración (h)" />
    ),
    cell: ({ row }) => `${row.original.estimatedDuration}h`,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} onUpdateTask={onUpdateTask} onAddTask={onAddTask} />,
  },
];
