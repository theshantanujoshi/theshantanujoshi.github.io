export interface TimelineItem {
  id: string;
  num: string;
  period: string;
  company: string;
  role: string;
  details: string;
  stack: string[];
}

export interface JournalItem {
  id: string;
  num: string;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  date?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'visitor' | 'core';
  text: string;
  timestamp: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  role: string;
  year: string;
  description: string;
  screenshots: string[];
  repoUrl?: string;
}
