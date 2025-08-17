"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal, FileText, Download, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Payment } from "@/types";
import { EditPaymentForm } from "./edit-payment-form";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  onUpdatePayment: (payment: Payment) => void;
}

export function DataTableRowActions<TData>({
  row,
  onUpdatePayment,
}: DataTableRowActionsProps<TData>) {
  const payment = row.original as Payment;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleUpdate = (updatedPayment: Payment) => {
    onUpdatePayment(updatedPayment);
    setIsEditDialogOpen(false);
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Abrir menú</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={() => setIsEditDialogOpen(true)}>
            <Pen className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <FileText className="mr-2 h-4 w-4" />
            Ver Factura
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download className="mr-2 h-4 w-4" />
            Descargar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Pago</DialogTitle>
          </DialogHeader>
          <EditPaymentForm 
            payment={payment}
            onUpdatePayment={handleUpdate}
            onClose={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
