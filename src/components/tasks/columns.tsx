"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task, User, Project } from "@/types";
import { users, projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowDown, ArrowRight, ArrowUp, CheckCircle, Circle, Dot, HelpCircle, XCircle } from "lucide-react";

const statuses = [
  { value: "To Do", label: "To Do", icon: Circle },
  { value: "In Progress", label: "In Progress", icon: Dot },
  { value: "In Review", label: "In Review", icon: HelpCircle },
  { value: "Done", label: "Done", icon: CheckCircle },
];

const priorities = [
  { value: "Low", label: "Low", icon: ArrowDown },
  { value: "Medium", label: "Medium", icon: ArrowRight },
  { value: "High", label: "High", icon: ArrowUp },
];

export const columns: ColumnDef<Task>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "assigneeId",
    header: "Assignee",
    cell: ({ row }) => {
      const user: User | undefined = users.find(u => u.id === row.original.assigneeId);
      if (!user) {
        return <span className="text-muted-foreground">Unassigned</span>;
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
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(s => s.value === row.getValue("status"));
      if (!status) return null;
      return (
        <div className="flex items-center">
          <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
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
      <DataTableColumnHeader column={column} title="Duration (h)" />
    ),
    cell: ({ row }) => `${row.original.estimatedDuration}h`,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
