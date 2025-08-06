import { OverviewCards } from '@/components/dashboard/overview-cards';
import { ProjectList } from '@/components/dashboard/project-list';
import { WorkloadChart } from '@/components/dashboard/workload-chart';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Panel de control" />
      <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        <OverviewCards />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Resumen de Proyectos</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectList />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Carga de Trabajo del Equipo</CardTitle>
            </CardHeader>
            <CardContent>
              <WorkloadChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
