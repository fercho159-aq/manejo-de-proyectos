"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, X } from "lucide-react";
import { DataTableFacetedFilter } from "../data-table-faceted-filter";

const statuses = [
  { value: "Pagado", label: "Pagado" },
  { value: "Pendiente", label: "Pendiente" },
  { value: "Vencido", label: "Vencido" },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar por cliente..."
          value={(table.getColumn("projectId")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("projectId")?.setFilterValue(event.target.value)
          }
          className="h-9 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Estado"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3"
          >
            Limpiar
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Button size="sm" className="h-9">
        <PlusCircle className="mr-2 h-4 w-4" />
        Añadir Pago
      </Button>
    </div>
  );
}
