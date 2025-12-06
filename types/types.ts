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
  date: string; // Mapped from published_at
  category: Category;
  readTime: string; // Mapped from read_time
  imageUrl?: string; // Mapped from image_url
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
  content?: string; 
}

export interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  publicationDate: string; // Mapped from publication_date
  publisher: string;
  link: string;
  content?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string; // Mapped from created_at
  read: boolean; // Mapped from is_read
}

export interface Profile {
  id: string;
  full_name: string;
  headline: string;
  bio: string;
  avatar_url: string;
  technologies: string[]; // New field
  focus_areas: string[];  // New field
}