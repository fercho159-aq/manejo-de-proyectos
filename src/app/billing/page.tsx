"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { DataTable } from "@/components/billing/data-table";
import { columns } from "@/components/billing/columns";
import { payments as initialPayments } from "@/lib/data";
import { Payment, TaskArea, taskAreas } from "@/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function BillingPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [activeTab, setActiveTab] = useState<"All" | TaskArea>("All");

  const handleUpdatePayment = (updatedPayment: Payment) => {
    setPayments(prev => 
      prev.map(p => p.id === updatedPayment.id ? updatedPayment : p)
    );
  };

  const filteredPayments = payments.filter(payment => 
    activeTab === "All" || payment.area === activeTab
  );

  return (
    <div className="flex h-full flex-col">
      <Header title="Facturación" />
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Tabs defaultValue="All" onValueChange={(value) => setActiveTab(value as "All" | TaskArea)} className="w-full">
            <TabsList className="mb-4">
            <TabsTrigger value="All">Todas</TabsTrigger>
            {taskAreas.map(area => (
                <TabsTrigger key={area} value={area}>{area}</TabsTrigger>
            ))}
            </TabsList>
            <DataTable columns={columns({ onUpdatePayment: handleUpdatePayment })} data={filteredPayments} />
        </Tabs>
      </div>
    </div>
  );
}
