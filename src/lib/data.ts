import type { Project, User, Task } from '@/types';

export const users: User[] = [
  { id: 'user-1', name: 'Alex Johnson', email: 'alex@example.com', avatar: 'https://placehold.co/100x100.png', availability: 'Available' },
  { id: 'user-2', name: 'Maria Garcia', email: 'maria@example.com', avatar: 'https://placehold.co/100x100.png', availability: 'Busy' },
  { id: 'user-3', name: 'James Smith', email: 'james@example.com', avatar: 'https://placehold.co/100x100.png', availability: 'Available' },
  { id: 'user-4', name: 'Patricia Williams', email: 'patricia@example.com', avatar: 'https://placehold.co/100x100.png', availability: 'Unavailable' },
];

export const projects: Project[] = [
  { id: 'proj-1', name: 'E-commerce Platform', client: 'GlobalMart', status: 'On Track', dueDate: '2024-09-15' },
  { id: 'proj-2', name: 'Mobile Banking App', client: 'SecureBank', status: 'At Risk', dueDate: '2024-08-20' },
  { id: 'proj-3', name: 'AI-Powered Chatbot', client: 'InnovateAI', status: 'On Track', dueDate: '2024-10-01' },
  { id: 'proj-4', name: 'Healthcare CRM', client: 'WellCare', status: 'Completed', dueDate: '2024-07-30' },
];

export const tasks: Task[] = [
  { id: 'task-1', title: 'Design Homepage UI', projectId: 'proj-1', status: 'Done', priority: 'High', assigneeId: 'user-1', estimatedDuration: 16, actualDuration: 18 },
  { id: 'task-2', title: 'Develop Payment Gateway', projectId: 'proj-1', status: 'In Progress', priority: 'High', assigneeId: 'user-2', estimatedDuration: 24 },
  { id: 'task-3', title: 'User Authentication Flow', projectId: 'proj-2', status: 'In Review', priority: 'Medium', assigneeId: 'user-1', estimatedDuration: 12 },
  { id: 'task-4', title: 'Implement Transaction History', projectId: 'proj-2', status: 'To Do', priority: 'Medium', assigneeId: null, estimatedDuration: 8 },
  { id: 'task-5', title: 'Train NLP Model', projectId: 'proj-3', status: 'In Progress', priority: 'High', assigneeId: 'user-3', estimatedDuration: 40 },
  { id: 'task-6', title: 'Integrate Chat Interface', projectId: 'proj-3', status: 'To Do', priority: 'Medium', assigneeId: null, estimatedDuration: 10 },
  { id: 'task-7', title: 'Patient Record Management', projectId: 'proj-4', status: 'Done', priority: 'High', assigneeId: 'user-4', estimatedDuration: 30, actualDuration: 28 },
  { id: 'task-8', title: 'Setup CI/CD Pipeline', projectId: 'proj-1', status: 'In Progress', priority: 'Low', assigneeId: 'user-3', estimatedDuration: 8 },
];
