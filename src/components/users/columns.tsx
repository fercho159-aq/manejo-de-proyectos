"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User, Task, Project } from "@/types";
import { tasks, projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronDown, ChevronRight, Circle, Dot, HelpCircle, CheckCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const statuses = [
  { value: "To Do", label: "Por Hacer", icon: Circle },
  { value: "In Progress", label: "En Progreso", icon: Dot },
  { value: "In Review", label: "En Revisión", icon: HelpCircle },
  { value: "Done", label: "Hecho", icon: CheckCircle },
];

const getClientName = (projectId: string) => {
    return projects.find(p => p.id === projectId)?.client || 'N/A';
}

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Usuario" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => row.toggleExpanded()}
          className="h-8 w-8"
        >
          {row.getIsExpanded() ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
            <span className="font-medium">{row.original.name}</span>
            <span className="text-xs text-muted-foreground">{row.original.email}</span>
        </div>
      </div>
    ),
  },
  {
    id: "workload",
    header: "Carga de Trabajo",
    cell: ({ row }) => {
        const userTasks = tasks.filter(t => t.assigneeId === row.original.id && t.status !== 'Done');
        const totalHours = userTasks.reduce((acc, t) => acc + t.estimatedDuration, 0);
        return `${totalHours}h (${userTasks.length} tareas)`;
    }
  },
  {
    accessorKey: "availability",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Disponibilidad" />
    ),
    cell: ({ row }) => {
        const availabilityText = row.original.availability === 'Available' ? 'Disponible' : row.original.availability === 'Busy' ? 'Ocupado' : 'No disponible';
        return (
            <Badge variant="outline" className={cn({
                'border-green-500 text-green-600': row.original.availability === 'Available',
                'border-yellow-500 text-yellow-600': row.original.availability === 'Busy',
                'border-red-500 text-red-600': row.original.availability === 'Unavailable',
            })}>
                {availabilityText}
            </Badge>
        )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
  {
    id: 'expanded-content',
    header: () => null,
    cell: ({ row }) => {
      if (!row.getIsExpanded()) {
        return null;
      }

      const userTasks = tasks.filter(t => t.assigneeId === row.original.id);
      
      return (
        <td colSpan={columns.length}>
            <div className="p-4 bg-muted/50">
                <h4 className="font-bold mb-2">Tareas Asignadas</h4>
                {userTasks.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tarea</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userTasks.map(task => {
                                const status = statuses.find(s => s.value === task.status);
                                return (
                                <TableRow key={task.id}>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{getClientName(task.projectId)}</TableCell>
                                    <TableCell>
                                        {status && (
                                            <div className="flex items-center gap-2">
                                                <status.icon className="h-4 w-4 text-muted-foreground" />
                                                <span>{status.label}</span>
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-sm text-muted-foreground">Este usuario no tiene tareas asignadas.</p>
                )}
            </div>
        </td>
      );
    },
  },
];