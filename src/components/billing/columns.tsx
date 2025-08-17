"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "@/types";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Circle, AlertTriangle, CheckCircle } from "lucide-react";

type ColumnsProps = {
  onUpdatePayment: (payment: Payment) => void;
}

const statuses = [
  { value: "Pagado", label: "Pagado", icon: CheckCircle, className: "text-green-600" },
  { value: "Pendiente", label: "Pendiente", icon: Circle, className: "text-yellow-600" },
  { value: "Vencido", label: "Vencido", icon: AlertTriangle, className: "text-red-600" },
];

export const columns = ({ onUpdatePayment }: ColumnsProps): ColumnDef<Payment>[] => [
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
    accessorKey: "invoiceId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Factura" />
    ),
    cell: ({ row }) => <div className="font-mono">{row.original.invoiceId}</div>,
  },
  {
    accessorKey: "projectId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cliente" />
    ),
    cell: ({ row }) => {
      const project = projects.find(p => p.id === row.original.projectId);
      return <span>{project?.client ?? 'N/A'}</span>;
    },
    filterFn: (row, id, value) => {
        const project = projects.find(p => p.id === row.getValue(id));
        return project?.client.toLowerCase().includes((value as string).toLowerCase()) ?? false;
    }
  },
  {
    accessorKey: "paymentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha de Pago" />
    ),
    cell: ({ row }) => format(row.original.paymentDate, "PPP", { locale: es }),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Monto" />
    ),
    cell: ({ row }) => {
      const formattedAmount = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(row.original.amount);
      return <div className="text-right font-medium">{formattedAmount}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(s => s.value === row.original.status);
      if (!status) return null;
      return (
        <Badge variant="outline" className={cn("capitalize", {
            'border-green-300 text-green-700': status.value === 'Pagado',
            'border-yellow-300 text-yellow-700': status.value === 'Pendiente',
            'border-red-300 text-red-700': status.value === 'Vencido',
        })}>
          <status.icon className="mr-2 h-4 w-4" />
          {status.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} onUpdatePayment={onUpdatePayment} />,
  },
];
