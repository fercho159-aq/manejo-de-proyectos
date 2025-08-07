"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Task, User, Project, ContentCreationDetails, AdCampaignDetails } from "@/types";
import { users, projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "../data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowDown, ArrowRight, ArrowUp, CheckCircle, ChevronDown, ChevronRight, Circle, Dot, HelpCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const statuses = [
  { value: "To Do", label: "Por Hacer", icon: Circle },
  { value: "In Progress", label: "En Progreso", icon: Dot },
  { value: "In Review", label: "En Revisión", icon: HelpCircle },
  { value: "Done", label: "Hecho", icon: CheckCircle },
];

const priorities = [
  { value: "Low", label: "Baja", icon: ArrowDown },
  { value: "Medium", label: "Media", icon: ArrowRight },
  { value: "High", label: "Alta", icon: ArrowUp },
];

type ColumnsProps = {
  onUpdateTask: (task: Task) => void;
  onAddTask: (task: Task) => void;
}

function ContentCreationExpandedContent({ data }: { data?: ContentCreationDetails }) {
    if (!data) return null;

    const detailItems = [
        { label: "Fecha de Corte", value: data.cutoffDateInfo },
        { label: "Videos grabados hasta", value: data.videosRecordedUntil ? format(new Date(data.videosRecordedUntil), 'PPP', { locale: es }) : '-' },
        { label: "Posts/Historias hasta", value: data.postsReadyUntil ? format(new Date(data.postsReadyUntil), 'PPP', { locale: es }) : '-' },
    ];
    
    const longTextItems = [
        { label: "¿Qué le publicamos al mes?", value: data.monthlyDeliverables },
        { label: "¿Cuándo le publicamos?", value: data.publishingSchedule },
    ]

    return (
        <div className="bg-muted/50 p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                {detailItems.map(item => (
                    <div key={item.label}>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{item.label}</h4>
                        <p className="text-sm">{item.value || '-'}</p>
                    </div>
                ))}
            </div>
             <div className="space-y-4">
                 {longTextItems.map(item => (
                    <div key={item.label}>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{item.label}</h4>
                        <pre className="text-sm whitespace-pre-wrap font-sans">{item.value || '-'}</pre>
                    </div>
                ))}
            </div>
        </div>
    );
}

function AdCampaignExpandedContent({ data }: { data?: AdCampaignDetails }) {
    if (!data) return null;

    const formatCurrency = (value?: number) => {
        if (value === undefined || value === null) return '-';
        return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
    }
    
    return (
        <div className="bg-muted/50 p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
                <h4 className="font-bold text-sm">Presupuestos</h4>
                <div className="space-y-2 text-sm">
                    { (data.meta?.interaction || data.meta?.messages) && (
                        <div>
                            <p className="font-semibold">META</p>
                            {data.meta?.interaction && <p className="text-muted-foreground">Interacción: {formatCurrency(data.meta.interaction)}</p>}
                            {data.meta?.messages && <p className="text-muted-foreground">Mensajes: {formatCurrency(data.meta.messages)}</p>}
                        </div>
                    )}
                    { (data.tiktok?.interaction || data.tiktok?.messages) && (
                        <div>
                            <p className="font-semibold">TikTok</p>
                            {data.tiktok?.interaction && <p className="text-muted-foreground">Interacción: {formatCurrency(data.tiktok.interaction)}</p>}
                            {data.tiktok?.messages && <p className="text-muted-foreground">Mensajes: {formatCurrency(data.tiktok.messages)}</p>}
                        </div>
                    )}
                    {data.googleAds?.budget && <p><span className="font-semibold">Google Ads:</span> {formatCurrency(data.googleAds.budget)}</p>}
                    {data.linkedin?.budget && <p><span className="font-semibold">LinkedIn:</span> {formatCurrency(data.linkedin.budget)}</p>}
                </div>
            </div>
             <div className="space-y-4">
                <h4 className="font-bold text-sm">Credenciales</h4>
                <div className="space-y-2 text-sm">
                    {data.meta?.credentials && <div><p className="font-semibold">META</p><pre className="whitespace-pre-wrap font-sans text-muted-foreground">{data.meta.credentials}</pre></div>}
                    {data.tiktok?.credentials && <div><p className="font-semibold">TikTok</p><pre className="whitespace-pre-wrap font-sans text-muted-foreground">{data.tiktok.credentials}</pre></div>}
                    {data.googleAds?.credentials && <div><p className="font-semibold">Google Ads</p><pre className="whitespace-pre-wrap font-sans text-muted-foreground">{data.googleAds.credentials}</pre></div>}
                    {data.linkedin?.credentials && <div><p className="font-semibold">LinkedIn</p><pre className="whitespace-pre-wrap font-sans text-muted-foreground">{data.linkedin.credentials}</pre></div>}
                </div>
            </div>
            <div className="space-y-2">
                 <h4 className="font-bold text-sm">Pendientes Pauta</h4>
                 <pre className="text-sm whitespace-pre-wrap font-sans text-muted-foreground">{data.pendingNotes || '-'}</pre>
            </div>
        </div>
    );
}


export const columns = ({ onUpdateTask, onAddTask }: ColumnsProps): ColumnDef<Task>[] => [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Título" />
    ),
    cell: ({ row }) => {
      const canExpand = row.getCanExpand() || row.original.area === 'Creación de contenido' || row.original.area === 'Pautas';
      const isExpanded = row.getIsExpanded();
      return (
        <div style={{ paddingLeft: `${row.depth * 1.5}rem` }} className="flex items-center gap-2">
           {row.depth > 0 && <span className="text-muted-foreground">└─</span>}
           <div className="flex items-center gap-2">
            {canExpand && (
                <Button
                variant="ghost"
                size="icon"
                onClick={() => row.toggleExpanded()}
                className="h-6 w-6"
                >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
            )}
            {!canExpand && <div className="w-6 h-6"/>}
            <span>{row.original.title}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "area",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Área" />
    ),
    cell: ({ row }) => {
      const area = row.original.area;
      if (!area) {
        return <span className="text-muted-foreground">-</span>;
      }
      return (
        <Badge variant="outline">{area}</Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "assigneeId",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Asignado a" />
    ),
    cell: ({ row }) => {
      const user = users.find(u => u.id === row.original.assigneeId);
      
      return (
        <Select 
          value={row.original.assigneeId ?? 'null'} 
          onValueChange={(value) => {
            onUpdateTask({
              ...row.original,
              assigneeId: value === 'null' ? null : value,
            })
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue asChild>
                <div className="flex items-center gap-2">
                {user ? (
                    <>
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                    </>
                ) : (
                    <span className="text-muted-foreground">Sin asignar</span>
                )}
                </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">Sin asignar</SelectItem>
            {users.map(u => (
              <SelectItem key={u.id} value={u.id}>
                 <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={u.avatar} />
                        <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{u.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
    filterFn: (row, id, value) => {
      const user: User | undefined = users.find(u => u.id === row.getValue(id));
      const filterValue = value as string;
      return user ? user.name.toLowerCase().includes(filterValue.toLowerCase()) : false;
    },
  },
  {
    accessorKey: "projectId",
    header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Cliente" />
    ),
    cell: ({ row }) => {
      const project: Project | undefined = projects.find(p => p.id === row.original.projectId);
      if (!project) {
        return <span className="text-muted-foreground">-</span>;
      }
      return (
        <div className="flex items-center gap-2">
          <span>{project.client}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const project: Project | undefined = projects.find(p => p.id === row.getValue(id));
      const filterValue = value as string;
      return project ? project.client.toLowerCase().includes(filterValue.toLowerCase()) : false;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(s => s.value === row.getValue("status"));

      if (!status) return null;
      
      return (
        <Select 
          value={status.value} 
          onValueChange={(value) => {
            onUpdateTask({
              ...row.original,
              status: value as Task['status'],
            })
          }}
        >
          <SelectTrigger className={cn("w-40 capitalize", {
            'text-yellow-600 border-yellow-300 focus:ring-yellow-500': status.value === 'In Progress',
            'text-blue-600 border-blue-300 focus:ring-blue-500': status.value === 'In Review',
            'text-green-600 border-green-300 focus:ring-green-500': status.value === 'Done',
          })}>
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
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prioridad" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(p => p.value === row.getValue("priority"));
      if (!priority) return null;
      return (
        <div className="flex items-center">
          <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>{priority.label}</span>
        </div>
      );
    },
     filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "estimatedDuration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duración (h)" />
    ),
    cell: ({ row }) => `${row.original.estimatedDuration}h`,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} onUpdateTask={onUpdateTask} onAddTask={onAddTask} />,
  },
  {
    id: 'expanded-content',
    header: () => null,
    cell: ({ row }) => {
      const task = row.original;
      if (task.area === 'Creación de contenido' && task.contentDetails) {
        return <ContentCreationExpandedContent data={task.contentDetails} />;
      }
      if (task.area === 'Pautas' && task.adCampaignDetails) {
        return <AdCampaignExpandedContent data={task.adCampaignDetails} />;
      }
      return null;
    },
  },
];
