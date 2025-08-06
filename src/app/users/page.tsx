import { Header } from "@/components/layout/header";
import { DataTable } from "@/components/users/data-table";
import { columns } from "@/components/users/columns";
import { users } from "@/lib/data";

export default function UsersPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Usuarios" />
      <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
}
