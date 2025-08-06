"use client";

import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { tasks, projects } from "@/lib/data";
import { es } from 'date-fns/locale';

export function VisitCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const visitDates = tasks.filter(t => t.visitDate).map(t => t.visitDate!);

    const tasksForSelectedDate = date 
        ? tasks.filter(t => t.visitDate && t.visitDate.toDateString() === date.toDateString())
        : [];

    const getClientName = (projectId: string) => {
        return projects.find(p => p.id === projectId)?.client || 'N/A';
    }

    return (
        <div className="flex flex-col gap-4 md:flex-row">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                locale={es}
                modifiers={{
                    visits: visitDates
                }}
                modifiersStyles={{
                    visits: {
                        color: 'hsl(var(--primary-foreground))',
                        backgroundColor: 'hsl(var(--primary))'
                    }
                }}
            />
            <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold">
                    Visitas para {date ? date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '...'}
                </h3>
                {tasksForSelectedDate.length > 0 ? (
                    <ul className="space-y-2">
                        {tasksForSelectedDate.map(task => (
                           <li key={task.id} className="rounded-md border p-2 text-sm">
                               <p className="font-semibold">{task.title}</p>
                               <p className="text-muted-foreground">Cliente: {getClientName(task.projectId)}</p>
                           </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">No hay visitas programadas para este día.</p>
                )}
            </div>
        </div>
    )
}
