"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { users, tasks } from '@/lib/data';

const workloadData = users.map(user => {
  const assignedTasks = tasks.filter(task => task.assigneeId === user.id && task.status !== 'Done');
  const totalHours = assignedTasks.reduce((sum, task) => sum + task.estimatedDuration, 0);
  return {
    name: user.name.split(' ')[0], // Use first name for brevity
    totalHours: totalHours,
  };
});

export function WorkloadChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={workloadData}>
        <XAxis
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}h`}
        />
        <Tooltip
            cursor={{ fill: 'hsl(var(--muted))' }}
            contentStyle={{ 
                background: 'hsl(var(--background))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
            }}
        />
        <Bar dataKey="totalHours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
