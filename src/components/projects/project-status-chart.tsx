"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { WebProject, WebProjectStatus } from '@/types';

interface ProjectStatusChartProps {
    projects: WebProject[];
}

export function ProjectStatusChart({ projects }: ProjectStatusChartProps) {
    const statusCounts: Record<WebProjectStatus, number> = {
        'En Desarrollo': 0,
        'Mantenimiento': 0,
        'Pausado': 0,
        'Finalizado': 0,
    };

    projects.forEach(project => {
        if (statusCounts[project.status] !== undefined) {
            statusCounts[project.status]++;
        }
    });

    const chartData = Object.entries(statusCounts).map(([name, total]) => ({ name, total }));


    return (
        <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} layout="vertical">
                <XAxis
                    type="number"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                />
                <YAxis
                    type="category"
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={90}
                />
                <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    contentStyle={{ 
                        background: 'hsl(var(--background))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: 'var(--radius)',
                    }}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
