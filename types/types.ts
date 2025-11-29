export enum Category {
  TECH = 'Technical',
  HEALTH = 'Digital Health',
  RESEARCH = 'Research',
  LIFE = 'Life',
}

export type PostStatus = 'draft' | 'published';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  category: Category;
  readTime: string;
  imageUrl?: string;
  status: PostStatus;
  views?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link: string;
  github?: string;
  imageUrl?: string;
  content?: string; // Markdown content for single project page
}

export interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  publicationDate: string;
  publisher: string;
  link: string;
  content?: string; // For the single page view
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}