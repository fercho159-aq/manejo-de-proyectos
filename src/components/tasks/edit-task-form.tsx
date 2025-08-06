"use client";

import { useForm } from "react-hook-form";
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
import { Task, User, taskAreas } from "@/types";
import { users } from "@/lib/data";
import { DialogFooter } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const formSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  status: z.enum(["To Do", "In Progress", "In Review", "Done"]),
  priority: z.enum(["Low", "Medium", "High"]),
  assigneeId: z.string().nullable(),
  estimatedDuration: z.coerce.number().min(0),
  area: z.enum(taskAreas).optional(),
  visitDate: z.date().nullable().optional(),
});

interface EditTaskFormProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onClose: () => void;
}

export function EditTaskForm({ task, onUpdateTask, onClose }: EditTaskFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      status: task.status,
      priority: task.priority,
      assigneeId: task.assigneeId,
      estimatedDuration: task.estimatedDuration,
      area: task.area,
      visitDate: task.visitDate,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdateTask({ ...task, ...values });
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <Select onValueChange={(value) => field.onChange(value === "null" ? null : value)} defaultValue={field.value ?? "null"}>
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
                        format(field.value, "PPP", { locale: es })
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
                    selected={field.value ?? undefined}
                    onSelect={(date) => field.onChange(date ?? null)}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0,0,0,0))
                    }
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Guardar cambios</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
