"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, FolderKanban, Home, ListTodo, Users } from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Button } from '../ui/button';

export function AppSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Panel', icon: Home },
    { href: '/tasks', label: 'Tareas', icon: ListTodo },
    { href: '/users', label: 'Usuarios', icon: Users },
    { href: '/projects', label: 'Proyectos', icon: FolderKanban },
  ];

  return (
    <Sidebar>
        <SidebarRail />
        <SidebarHeader className="p-4">
            <div className="flex items-center gap-2">
                <Bot className="h-8 w-8 text-primary" />
                <h1 className="text-xl font-semibold">Seguimiento Pendientes</h1>
            </div>
        </SidebarHeader>
        <SidebarMenu className="flex-1">
            {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref>
                <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                >
                    <item.icon />
                    <span>{item.label}</span>
                </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            ))}
        </SidebarMenu>
        <SidebarFooter className="p-4">
            
        </SidebarFooter>
    </Sidebar>
  );
}
