export type Project = {
  id: string;
  name: string;
  client: string;
  status: 'On Track' | 'At Risk' | 'Completed';
  dueDate: string;
};

export const taskAreas = ["Pautas", "Diseño web", "Creación de contenido"] as const;
export type TaskArea = (typeof taskAreas)[number];

export type ContentCreationDetails = {
  cutoffDateInfo?: string; // "Fecha de Corte"
  videosRecordedUntil?: Date | null; // "Hasta cuando tenemos grabados videos"
  postsReadyUntil?: Date | null; // "Hasta cuando tenemos post e historias"
  monthlyDeliverables?: string; // "¿Qué le publicamos al mes?"
  publishingSchedule?: string; // "¿Cuando le publicamos?"
};

export type AdCampaignDetails = {
  meta?: {
    interaction?: number;
    messages?: number;
    credentials?: string;
  };
  tiktok?: {
    interaction?: number;
    messages?: number;
    credentials?: string;
  };
  googleAds?: {
    budget?: number;
    credentials?: string;
  };
  linkedin?: {
    budget?: number;
    credentials?: string;
  };
  pendingNotes?: string;
};


export type Task = {
  id: string;
  title: string;
  projectId: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  assigneeId: string | null;
  estimatedDuration: number; // in hours
  actualDuration?: number; // in hours
  parentId?: string | null;
  subtasks?: Task[];
  area?: TaskArea;
  visitDate?: Date | null;
  contentDetails?: ContentCreationDetails;
  adCampaignDetails?: AdCampaignDetails;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  availability: 'Available' | 'Busy' | 'Unavailable';
};
