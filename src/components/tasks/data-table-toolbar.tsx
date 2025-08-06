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
  { value: "To Do", label: "Por Hacer" },
  { value: "In Progress", label: "En Progreso" },
  { value: "In Review", label: "En Revisión" },
  { value: "Done", label: "Hecho" },
];

const priorities = [
  { value: "Low", label: "Baja" },
  { value: "Medium", label: "Media" },
  { value: "High", label: "Alta" },
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
            Limpiar
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Button size="sm" className="h-9">
        <PlusCircle className="mr-2 h-4 w-4" />
        Añadir Tarea
      </Button>
    </div>
  );
}
