"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User, Task } from "@/types";
import { tasks } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

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
];
