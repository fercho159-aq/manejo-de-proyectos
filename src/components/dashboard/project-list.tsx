import { projects } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export function ProjectList() {
  const recentProjects = projects.slice(0, 5);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Proyecto</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Fecha de Entrega</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentProjects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>{project.client}</TableCell>
            <TableCell>
              <Badge
                className={cn({
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': project.status === 'On Track',
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': project.status === 'At Risk',
                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200': project.status === 'Completed',
                })}
              >
                {project.status === 'On Track' ? 'En Curso' : project.status === 'At Risk' ? 'En Riesgo' : 'Completado'}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {format(new Date(project.dueDate), 'PPP')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
