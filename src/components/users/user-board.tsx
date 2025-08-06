"use client";

import { User, Task } from "@/types";
import { users, tasks } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UserBoardProps {
    users: User[];
}

const availabilityStatuses = [
    { value: 'Available', label: 'Disponible' },
    { value: 'Busy', label: 'Ocupado' },
    { value: 'Unavailable', label: 'No disponible' },
] as const;


export function UserBoard({ users }: UserBoardProps) {

    const getWorkload = (userId: string) => {
        const userTasks = tasks.filter(t => t.assigneeId === userId && t.status !== 'Done');
        const totalHours = userTasks.reduce((acc, t) => acc + t.estimatedDuration, 0);
        return `${totalHours}h (${userTasks.length} tareas)`;
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {availabilityStatuses.map(status => (
                <div key={status.value} className="flex flex-col gap-4 rounded-lg bg-muted/50 p-4">
                    <h3 className="text-lg font-semibold">{status.label}</h3>
                    <div className="flex flex-col gap-4">
                        {users.filter(u => u.availability === status.value).map(user => (
                            <Card key={user.id}>
                                <CardHeader className="p-4">
                                    <div className="flex items-start gap-3">
                                        <Avatar className="h-10 w-10 border">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0 flex-1">
                                            <CardTitle className="text-base font-medium truncate">{user.name}</CardTitle>
                                            <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium text-muted-foreground">Carga</span>
                                        <Badge variant="secondary">{getWorkload(user.id)}</Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                         {users.filter(u => u.availability === status.value).length === 0 && (
                            <div className="flex h-24 items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/30">
                                <p className="text-sm text-muted-foreground">No hay usuarios</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
