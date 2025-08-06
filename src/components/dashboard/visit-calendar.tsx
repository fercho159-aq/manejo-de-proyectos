
"use client";

import { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { tasks, projects } from "@/lib/data";
import { es } from 'date-fns/locale';

export function VisitCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const visitDates = tasks.filter(t => t.visitDate).map(t => t.visitDate!);

    const tasksForSelectedDate = date 
        ? tasks.filter(t => t.visitDate && t.visitDate.toDateString() === date.toDateString())
        : [];

    const getClientName = (projectId: string) => {
        return projects.find(p => p.id === projectId)?.client || 'N/A';
    }
    
    if (!isClient) {
        // Render a placeholder or nothing on the server to avoid hydration mismatch
        return null;
    }

    return (
        <div className="flex flex-col gap-4 lg:flex-row">
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border self-center"
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
                initialFocus
            />
            <div className="flex-1 min-w-0">
                <h3 className="mb-2 text-lg font-semibold truncate">
                    Visitas para {date ? date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '...'}
                </h3>
                {tasksForSelectedDate.length > 0 ? (
                    <ul className="space-y-2">
                        {tasksForSelectedDate.map(task => (
                           <li key={task.id} className="rounded-md border p-2 text-sm">
                               <p className="font-semibold truncate">{task.title}</p>
                               <p className="text-muted-foreground truncate">Cliente: {getClientName(task.projectId)}</p>
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
