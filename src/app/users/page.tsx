"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { DataTable } from "@/components/users/data-table";
import { columns } from "@/components/users/columns";
import { users } from "@/lib/data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserBoard } from "@/components/users/user-board";
import { LayoutGrid, List } from "lucide-react";

export default function UsersPage() {
  const [view, setView] = useState("table");

  return (
    <div className="flex h-full flex-col">
      <Header title="Usuarios" />
      <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        <Tabs defaultValue="table" onValueChange={setView} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="table">
                <List className="mr-2 h-4 w-4" />
                Tabla
              </TabsTrigger>
              <TabsTrigger value="board">
                <LayoutGrid className="mr-2 h-4 w-4" />
                Tablero
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="table" className="mt-4">
             <DataTable columns={columns} data={users} />
          </TabsContent>
          <TabsContent value="board" className="mt-4">
            <UserBoard users={users} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
