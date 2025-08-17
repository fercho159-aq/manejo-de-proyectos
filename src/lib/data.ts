import type { Project, User, Task, Payment } from '@/types';

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
  { 
    id: 'task-2', 
    title: 'Desarrollar pasarela de pago', 
    projectId: 'proj-1', 
    status: 'In Progress', 
    priority: 'High', 
    assigneeId: 'user-2', 
    estimatedDuration: 24, 
    area: 'Pautas',
    adCampaignDetails: {
      meta: {
        interaction: 1000,
        messages: 0,
        credentials: "soluciones.maw.access@gmail.com\n$oluciones.access\nVerificado"
      },
      googleAds: {
        budget: 2000,
        credentials: "aldotrejomawsol@gmail.com\nAldotrejo2025."
      },
      pendingNotes: "1- rembolso deasa MAESTROS - 769 | Aun no desvloquea envio manual |\n2- Rembolso nuevo deasa antes h clean - MAESTROS - 864 | Ya se enviaron los datos | 900"
    }
  },
  { id: 'task-3', title: 'Flujo de autenticación de usuario', projectId: 'proj-2', status: 'In Review', priority: 'Medium', assigneeId: 'user-1', estimatedDuration: 12, area: 'Pautas', visitDate: new Date(today.getFullYear(), today.getMonth(), 12) },
  { id: 'task-4', title: 'Implementar historial de transacciones', projectId: 'proj-2', status: 'To Do', priority: 'Medium', assigneeId: null, estimatedDuration: 8, area: 'Pautas' },
  { 
    id: 'task-5', 
    title: 'Entrenar modelo de NLP', 
    projectId: 'proj-3', 
    status: 'In Progress', 
    priority: 'High', 
    assigneeId: 'user-3', 
    estimatedDuration: 40, 
    area: 'Creación de contenido', 
    visitDate: new Date(today.getFullYear(), today.getMonth(), 21),
    contentDetails: {
      cutoffDateInfo: "Cada 30",
      videosRecordedUntil: new Date(2024, 7, 8),
      postsReadyUntil: new Date(2024, 7, 8),
      monthlyDeliverables: "12 videos\n4 carruseles\n8 post\n1 live",
      publishingSchedule: "Lunes: Video (preguntas) - Posteo - Frase\nMartes: Video (tendencia) - Carrusel\nMiércoles: Video (preguntas) - Vídeo y Frase\nJueves: (video tendencia) - Vídeo\nViernes: Video (medicamento) - Posteo y Vídeo\nSábado:\nDomingo:\n- Un Live al mes"
    } 
  },
  { id: 'task-6', title: 'Integrar interfaz de chat', projectId: 'proj-3', status: 'To Do', priority: 'Medium', assigneeId: null, estimatedDuration: 10, area: 'Diseño web' },
  { id: 'task-7', title: 'Gestión de expedientes de pacientes', projectId: 'proj-4', status: 'Done', priority: 'High', assigneeId: 'user-4', estimatedDuration: 30, actualDuration: 28, area: 'Pautas' },
  { id: 'task-8', title: 'Configurar pipeline de CI/CD', projectId: 'proj-1', status: 'In Progress', priority: 'Low', assigneeId: 'user-3', estimatedDuration: 8, area: 'Pautas', visitDate: new Date(today.getFullYear(), today.getMonth() + 1, 3) },
];


export const payments: Payment[] = [
    { id: 'pay-1', projectId: 'proj-1', amount: 5000, paymentDate: new Date(2024, 6, 1), status: 'Pagado', invoiceId: 'INV-001' },
    { id: 'pay-2', projectId: 'proj-2', amount: 7500, paymentDate: new Date(2024, 6, 5), status: 'Pagado', invoiceId: 'INV-002' },
    { id: 'pay-3', projectId: 'proj-3', amount: 3000, paymentDate: new Date(2024, 7, 1), status: 'Pendiente', invoiceId: 'INV-003' },
    { id: 'pay-4', projectId: 'proj-4', amount: 12000, paymentDate: new Date(2024, 5, 20), status: 'Vencido', invoiceId: 'INV-004' },
    { id: 'pay-5', projectId: 'proj-1', amount: 5000, paymentDate: new Date(2024, 7, 1), status: 'Pagado', invoiceId: 'INV-005' },
];
