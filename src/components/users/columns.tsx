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
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
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
    header: "Workload",
    cell: ({ row }) => {
        const userTasks = tasks.filter(t => t.assigneeId === row.original.id && t.status !== 'Done');
        const totalHours = userTasks.reduce((acc, t) => acc + t.estimatedDuration, 0);
        return `${totalHours}h (${userTasks.length} tasks)`;
    }
  },
  {
    accessorKey: "availability",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Availability" />
    ),
    cell: ({ row }) => (
        <Badge variant="outline" className={cn({
            'border-green-500 text-green-600': row.original.availability === 'Available',
            'border-yellow-500 text-yellow-600': row.original.availability === 'Busy',
            'border-red-500 text-red-600': row.original.availability === 'Unavailable',
        })}>
            {row.original.availability}
        </Badge>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
