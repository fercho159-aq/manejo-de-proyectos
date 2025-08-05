import { Header } from "@/components/layout/header";
import { DataTable } from "@/components/tasks/data-table";
import { columns } from "@/components/tasks/columns";
import { tasks } from "@/lib/data";

export default function TasksPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Tasks" />
      <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        <DataTable columns={columns} data={tasks} />
      </div>
    </div>
  );
}
