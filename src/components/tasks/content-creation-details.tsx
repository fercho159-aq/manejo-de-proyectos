"use client"

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Textarea } from "../ui/textarea";

const contentDetailsSchema = z.object({
  cutoffDateInfo: z.string().optional(),
  videosRecordedUntil: z.date().nullable().optional(),
  postsReadyUntil: z.date().nullable().optional(),
  monthlyDeliverables: z.string().optional(),
  publishingSchedule: z.string().optional(),
}).optional();

const formSchema = z.object({
    contentDetails: contentDetailsSchema,
});


interface ContentCreationDetailsFormProps {
    form: UseFormReturn<any>; // Accept form control from parent
}

export function ContentCreationDetailsForm({ form }: ContentCreationDetailsFormProps) {
  return (
    <>
        <FormField
            control={form.control}
            name="contentDetails.cutoffDateInfo"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Fecha de Corte</FormLabel>
                <FormControl>
                    <Input {...field} placeholder="Ej: Cada 30 del mes" />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="contentDetails.videosRecordedUntil"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Videos grabados hasta</FormLabel>
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
            <FormField
            control={form.control}
            name="contentDetails.postsReadyUntil"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                <FormLabel>Posts/Historias hasta</FormLabel>
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
        </div>
        <FormField
            control={form.control}
            name="contentDetails.monthlyDeliverables"
            render={({ field }) => (
                <FormItem>
                <FormLabel>¿Qué le publicamos al mes?</FormLabel>
                <FormControl>
                    <Textarea {...field} placeholder="12 videos..." rows={4}/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="contentDetails.publishingSchedule"
            render={({ field }) => (
                <FormItem>
                <FormLabel>¿Cuándo le publicamos?</FormLabel>
                <FormControl>
                    <Textarea {...field} placeholder="Lunes: Video..." rows={8}/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
    </>
  )
}
