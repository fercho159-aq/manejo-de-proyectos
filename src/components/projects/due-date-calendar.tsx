"use client";

import { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { WebProject } from "@/types";
import { es } from 'date-fns/locale';
import { format } from 'date-fns';

interface DueDateCalendarProps {
    projects: WebProject[];
}

export function DueDateCalendar({ projects }: DueDateCalendarProps) {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const dueDates = projects
        .filter(p => p.dueDate)
        .map(p => new Date(p.dueDate!.replace(/-/g, '/')));


    const projectsForSelectedDate = date 
        ? projects.filter(p => p.dueDate && new Date(p.dueDate.replace(/-/g, '/')).toDateString() === date.toDateString())
        : [];

    if (!isClient) {
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
                    due: dueDates
                }}
                modifiersStyles={{
                    due: {
                        color: 'hsl(var(--primary-foreground))',
                        backgroundColor: 'hsl(var(--primary))'
                    }
                }}
                initialFocus
            />
            <div className="flex-1 min-w-0">
                <h3 className="mb-2 text-lg font-semibold truncate">
                    Entregas para {date ? format(date, 'PPP', {locale: es}) : '...'}
                </h3>
                {projectsForSelectedDate.length > 0 ? (
                    <ul className="space-y-2">
                        {projectsForSelectedDate.map(project => (
                           <li key={project.id} className="rounded-md border p-2 text-sm">
                               <p className="font-semibold truncate">{project.name}</p>
                           </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground">No hay entregas para este día.</p>
                )}
            </div>
        </div>
    )
}
