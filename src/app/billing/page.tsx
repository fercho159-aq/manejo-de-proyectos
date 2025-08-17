"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { DataTable } from "@/components/billing/data-table";
import { columns } from "@/components/billing/columns";
import { payments as initialPayments } from "@/lib/data";
import { Payment } from "@/types";

export default function BillingPage() {
  const [payments, setPayments] = useState(initialPayments);

  const handleUpdatePayment = (updatedPayment: Payment) => {
    setPayments(prev => 
      prev.map(p => p.id === updatedPayment.id ? updatedPayment : p)
    );
  };

  return (
    <div className="flex h-full flex-col">
      <Header title="Facturación" />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <DataTable columns={columns({ onUpdatePayment: handleUpdatePayment })} data={payments} />
      </div>
    </div>
  );
}
