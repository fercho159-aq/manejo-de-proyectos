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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Progress } from "../ui/progress";

type ColumnsProps = {
  onUpdatePayment: (payment: Payment) => void;
}

const statuses = [
  { value: "Pagado", label: "Pagado", icon: CheckCircle, className: "text-green-600 border-green-300 focus:ring-green-500" },
  { value: "Pendiente", label: "Pendiente", icon: Circle, className: "text-yellow-600 border-yellow-300 focus:ring-yellow-500" },
  { value: "Vencido", label: "Vencido", icon: AlertTriangle, className: "text-red-600 border-red-300 focus:ring-red-500" },
];

const paymentPercentages = [
    { value: 25, label: "25%" },
    { value: 50, label: "50%" },
    { value: 75, label: "75%" },
    { value: 100, label: "100%" },
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
        <Select
            value={row.original.status}
            onValueChange={(value) => {
                onUpdatePayment({
                    ...row.original,
                    status: value as Payment['status'],
                });
            }}
        >
            <SelectTrigger className={cn("w-36 capitalize", status.className)}>
                <SelectValue asChild>
                    <div className="flex items-center gap-2">
                        <status.icon className="h-4 w-4" />
                        <span>{status.label}</span>
                    </div>
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                {statuses.map(s => (
                    <SelectItem key={s.value} value={s.value} className="capitalize">
                        <div className="flex items-center gap-2">
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
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "paymentPercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Progreso de Pago" />
    ),
    cell: ({ row }) => {
      const percentage = row.original.paymentPercentage;
      
      return (
          <div className="flex items-center gap-2 w-40">
            <Select
                value={percentage?.toString() ?? ""}
                onValueChange={(value) => {
                    const newPercentage = value ? parseInt(value, 10) as Payment['paymentPercentage'] : undefined;
                    onUpdatePayment({
                        ...row.original,
                        paymentPercentage: newPercentage,
                        status: newPercentage === 100 ? 'Pagado' : row.original.status,
                    });
                }}
            >
                <SelectTrigger className="w-24 capitalize">
                    <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="">-</SelectItem>
                    {paymentPercentages.map(p => (
                        <SelectItem key={p.value} value={p.value.toString()} className="capitalize">
                            {p.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Progress value={percentage} className="flex-1 h-2" />
        </div>
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
