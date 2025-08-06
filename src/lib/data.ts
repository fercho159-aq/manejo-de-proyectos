import type { Project, User, Task } from '@/types';

export const users: User[] = [
  { id: 'user-1', name: 'Alejandro Hernández', email: 'alejandro@mawsoluciones.com', avatar: 'https://placehold.co/100x100.png', availability: 'Available' },
  { id: 'user-2', name: 'María García', email: 'maria@mawsoluciones.com', avatar: 'https://placehold.co/100x100.png', availability: 'Busy' },
  { id: 'user-3', name: 'Javier Rodríguez', email: 'javier@mawsoluciones.com', avatar: 'https://placehold.co/100x100.png', availability: 'Available' },
  { id: 'user-4', name: 'Sofía López', email: 'sofia@mawsoluciones.com', avatar: 'https://placehold.co/100x100.png', availability: 'Unavailable' },
];

export const projects: Project[] = [
  { id: 'proj-1', name: 'Plataforma E-commerce', client: 'MercadoMex', status: 'On Track', dueDate: '2024-09-15' },
  { id: 'proj-2', name: 'App de Banca Móvil', client: 'BancoSeguro', status: 'At Risk', dueDate: '2024-08-20' },
  { id: 'proj-3', name: 'Chatbot con IA', client: 'InnovaInteligencia', status: 'On Track', dueDate: '2024-10-01' },
  { id: 'proj-4', name: 'CRM de Salud', client: 'SaludTotal', status: 'Completed', dueDate: '2024-07-30' },
];

const today = new Date();

export const tasks: Task[] = [
  { id: 'task-1', title: 'Diseño de la página de inicio', projectId: 'proj-1', status: 'Done', priority: 'High', assigneeId: 'user-1', estimatedDuration: 16, actualDuration: 18, area: 'Diseño web', visitDate: new Date(today.getFullYear(), today.getMonth(), 5) },
  { id: 'task-2', title: 'Desarrollar pasarela de pago', projectId: 'proj-1', status: 'In Progress', priority: 'High', assigneeId: 'user-2', estimatedDuration: 24, area: 'Pautas' },
  { id: 'task-3', title: 'Flujo de autenticación de usuario', projectId: 'proj-2', status: 'In Review', priority: 'Medium', assigneeId: 'user-1', estimatedDuration: 12, area: 'Pautas', visitDate: new Date(today.getFullYear(), today.getMonth(), 12) },
  { id: 'task-4', title: 'Implementar historial de transacciones', projectId: 'proj-2', status: 'To Do', priority: 'Medium', assigneeId: null, estimatedDuration: 8, area: 'Pautas' },
  { id: 'task-5', title: 'Entrenar modelo de NLP', projectId: 'proj-3', status: 'In Progress', priority: 'High', assigneeId: 'user-3', estimatedDuration: 40, area: 'Creación de contenido', visitDate: new Date(today.getFullYear(), today.getMonth(), 21) },
  { id: 'task-6', title: 'Integrar interfaz de chat', projectId: 'proj-3', status: 'To Do', priority: 'Medium', assigneeId: null, estimatedDuration: 10, area: 'Diseño web' },
  { id: 'task-7', title: 'Gestión de expedientes de pacientes', projectId: 'proj-4', status: 'Done', priority: 'High', assigneeId: 'user-4', estimatedDuration: 30, actualDuration: 28, area: 'Pautas' },
  { id: 'task-8', title: 'Configurar pipeline de CI/CD', projectId: 'proj-1', status: 'In Progress', priority: 'Low', assigneeId: 'user-3', estimatedDuration: 8, area: 'Pautas', visitDate: new Date(today.getFullYear(), today.getMonth() + 1, 3) },
];
