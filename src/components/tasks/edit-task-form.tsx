"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Task, User, taskAreas, Project, ContentCreationDetails, AdCampaignDetails } from "@/types";
import { users, projects } from "@/lib/data";
import { DialogFooter } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { ContentCreationDetailsForm } from "./content-creation-details";
import { AdCampaignDetailsForm } from "./ad-campaign-details";


const contentDetailsSchema = z.object({
  cutoffDateInfo: z.string().optional(),
  videosRecordedUntil: z.date().nullable().optional(),
  postsReadyUntil: z.date().nullable().optional(),
  monthlyDeliverables: z.string().optional(),
  publishingSchedule: z.string().optional(),
}).optional();

const adCampaignDetailsSchema = z.object({
    meta: z.object({
        interaction: z.coerce.number().optional(),
        messages: z.coerce.number().optional(),
        credentials: z.string().optional(),
    }).optional(),
    tiktok: z.object({
        interaction: z.coerce.number().optional(),
        messages: z.coerce.number().optional(),
        credentials: z.string().optional(),
    }).optional(),
    googleAds: z.object({
        budget: z.coerce.number().optional(),
        credentials: z.string().optional(),
    }).optional(),
    linkedin: z.object({
        budget: z.coerce.number().optional(),
        credentials: z.string().optional(),
    }).optional(),
    pendingNotes: z.string().optional(),
}).optional();

const formSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  projectId: z.string().min(1, "El cliente es requerido"),
  status: z.enum(["To Do", "In Progress", "In Review", "Done"]),
  priority: z.enum(["Low", "Medium", "High"]),
  assigneeId: z.string().nullable(),
  estimatedDuration: z.coerce.number().min(0),
  area: z.enum(taskAreas).optional(),
  visitDate: z.date().nullable().optional(),
  contentDetails: contentDetailsSchema,
  adCampaignDetails: adCampaignDetailsSchema,
});

interface EditTaskFormProps {
  task: Task | Partial<Task>;
  onUpdateTask: (task: Task) => void;
  onClose: () => void;
  isAdding?: boolean;
}

export function EditTaskForm({ task, onUpdateTask, onClose, isAdding = false }: EditTaskFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title ?? '',
      projectId: task.projectId ?? '',
      status: task.status ?? 'To Do',
      priority: task.priority ?? 'Medium',
      assigneeId: task.assigneeId ?? null,
      estimatedDuration: task.estimatedDuration ?? 0,
      area: task.area,
      visitDate: task.visitDate,
      contentDetails: task.contentDetails ?? {},
      adCampaignDetails: task.adCampaignDetails ?? {},
    },
  });

  const watchedArea = useWatch({
    control: form.control,
    name: "area"
  });

  React.useEffect(() => {
    form.reset({
      title: task.title ?? '',
      projectId: task.projectId ?? '',
      status: task.status ?? 'To Do',
      priority: task.priority ?? 'Medium',
      assigneeId: task.assigneeId ?? null,
      estimatedDuration: task.estimatedDuration ?? 0,
      area: task.area,
      visitDate: task.visitDate,
      contentDetails: task.contentDetails ?? {},
      adCampaignDetails: task.adCampaignDetails ?? {},
    });
  }, [task, form]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    const taskToSave: Task = {
      ...(task as Task), // Cast to full task for existing properties
      ...values,
      id: task.id || `task-${Date.now()}` // Ensure ID exists
    };
    onUpdateTask(taskToSave);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projects.map((project: Project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="To Do">Por Hacer</SelectItem>
                    <SelectItem value="In Progress">En Progreso</SelectItem>
                    <SelectItem value="In Review">En Revisión</SelectItem>
                    <SelectItem value="Done">Hecho</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridad</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una prioridad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Low">Baja</SelectItem>
                    <SelectItem value="Medium">Media</SelectItem>
                    <SelectItem value="High">Alta</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Área</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un área" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {taskAreas.map(area => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="assigneeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asignado a</FormLabel>
              <Select onValueChange={(value) => field.onChange(value === "null" ? null : value)} value={field.value ?? "null"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un usuario" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="null">Sin asignar</SelectItem>
                  {users.map((user: User) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estimatedDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duración Estimada (horas)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visitDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de Visita</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP", { locale: es })
                      ) : (
                        <span>Seleccione una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date ?? null)}
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {watchedArea === 'Creación de contenido' && (
           <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="content-details">
              <AccordionTrigger className="text-sm font-semibold">
                Detalles de Creación de Contenido
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                 <ContentCreationDetailsForm form={form} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {watchedArea === 'Pautas' && (
           <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ad-campaign-details">
              <AccordionTrigger className="text-sm font-semibold">
                Detalles de Pauta
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                 <AdCampaignDetailsForm form={form} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        <DialogFooter className="sticky bottom-0 bg-background py-4">
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{isAdding ? 'Crear Tarea' : 'Guardar cambios'}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
