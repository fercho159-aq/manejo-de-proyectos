"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, CheckCircle, Construction, FolderKanban } from 'lucide-react';
import { WebProject } from '@/types';

interface WebProjectDashboardProps {
    projects: WebProject[];
}

export function WebProjectDashboard({ projects }: WebProjectDashboardProps) {
    const totalProjects = projects.filter(p => p.type === 'project').length;
    const totalRetainers = projects.filter(p => p.type === 'retainer').length;
    const inDevelopment = projects.filter(p => p.status === 'En Desarrollo').length;
    const completed = projects.filter(p => p.status === 'Finalizado').length;

    const cardData = [
        { title: 'Proyectos Totales', value: totalProjects, icon: FolderKanban },
        { title: 'Igualas (Retainers)', value: totalRetainers, icon: Briefcase },
        { title: 'En Desarrollo', value: inDevelopment, icon: Construction },
        { title: 'Finalizados', value: completed, icon: CheckCircle },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card, index) => (
            <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
            </Card>
        ))}
        </div>
    );
}
