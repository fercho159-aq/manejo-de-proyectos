"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { DataTableFacetedFilter } from "../data-table-faceted-filter";
import { users, projects } from "@/lib/data";
import { taskAreas } from "@/types";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const statuses = [
  { value: "To Do", label: "To Do" },
  { value: "In Progress", label: "In Progress" },
  { value: "In Review", label: "In Review" },
  { value: "Done", label: "Done" },
];

const priorities = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

const clients = [...new Set(projects.map(p => p.client))].map(c => ({ value: c, label: c }));

const areas = taskAreas.map(a => ({ value: a, label: a }));

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
            }}
            className="h-9 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Button size="sm" className="h-9">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Task
      </Button>
    </div>
  );
}
