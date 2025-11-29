import { Post, Category, ResearchPaper, Project, ContactMessage } from "@/types/types";

// Initial Mock Data
const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    title: 'The Future of Digital Health in Africa',
    slug: 'future-digital-health-africa',
    excerpt: 'Exploring how mobile penetration and AI are revolutionizing healthcare delivery in emerging markets.',
    content: `# The Future of Digital Health in Africa\n\nMobile penetration in Africa is skyrocketing, creating a unique opportunity for digital health solutions. \n\n## Key Drivers\n- **Mobile Adoption**: High smartphone usage.\n- **AI Integration**: Diagnostics on the edge.\n\nWe are seeing a shift from traditional hospital-centric models to patient-centric digital care.`,
    date: '2023-10-24',
    category: Category.HEALTH,
    readTime: '5 min read',
    imageUrl: 'https://picsum.photos/800/400?random=4',
    status: 'published',
    views: 1250,
  },
  {
    id: '2',
    title: 'Scalable State Management in React 18',
    slug: 'react-18-state-management',
    excerpt: 'A deep dive into concurrency features and how to leverage lightweight stores instead of Redux.',
    content: '# Scalable State Management\n\nReact 18 introduces concurrent rendering features that change how we think about state.\n\n## Why it matters\nConcurrency allows React to interrupt rendering to handle more urgent events like user interaction.',
    date: '2023-11-12',
    category: Category.TECH,
    readTime: '8 min read',
    imageUrl: 'https://picsum.photos/800/400?random=5',
    status: 'published',
    views: 980,
  },
  {
    id: '3',
    title: 'Why Technical Writing Matters for Engineers',
    slug: 'tech-writing-for-engineers',
    excerpt: 'Communication is the bottleneck of software engineering. Here is how to fix it.',
    content: '# Technical Writing\n\nWriting is thinking. Clear writing indicates clear thinking.\n\n> "You do not really understand something unless you can explain it to your grandmother." - Albert Einstein',
    date: '2023-12-05',
    category: Category.TECH,
    readTime: '4 min read',
    imageUrl: 'https://picsum.photos/800/400?random=6',
    status: 'published',
    views: 1500,
  },
];

const INITIAL_RESEARCH: ResearchPaper[] = [
  {
    id: '1',
    title: 'Optimizing Telemedicine Latency in Low-Bandwidth Regions',
    abstract: 'This paper proposes a novel compression algorithm for real-time video transmission over 3G networks.',
    publicationDate: '2022',
    publisher: 'Journal of Digital Health',
    link: '#',
    content: '# Abstract\n\nLatency is a killer for telemedicine. In this paper, we explore...\n\n## Methodology\nWe used a custom compression algorithm...'
  },
  {
    id: '2',
    title: 'LLM Hallucinations in Medical Diagnostics',
    abstract: 'An analysis of error rates when using generic LLMs for preliminary patient triage.',
    publicationDate: '2023',
    publisher: 'AI Ethics Conference',
    link: '#',
    content: '# Introduction\n\nLarge Language Models are prone to hallucinations which can be fatal in medical contexts.\n\n## Results\nOur study shows a 15% error rate in...'
  },
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'MedConnect API',
    description: 'A scalable API gateway for interoperable digital health records, ensuring secure data exchange between hospitals.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
    link: '#',
    github: '#',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    content: `
# MedConnect API: Bridging the Healthcare Gap

MedConnect is a scalable API gateway designed to facilitate interoperable digital health records (EHR) exchange between hospitals in low-resource environments.

## The Challenge
Healthcare data is often siloed. Patients moving between clinics often have to carry paper records, leading to data loss and errors.

## The Solution
We built a FHIR-compliant API that allows secure, consent-based data sharing.

### Key Features
- **Interoperability**: Built on HL7 FHIR standards.
- **Security**: OAuth2.0 and encryption at rest.
- **Offline Sync**: Caching mechanism for unstable internet connections.

### Technical Architecture
The system uses a microservices architecture with Node.js services communicating via RabbitMQ. Data is stored in PostgreSQL with a Redis cache layer.
    `
  },
  {
    id: '2',
    title: 'DevDocs AI',
    description: 'An intelligent documentation assistant that uses LLMs to answer developer queries based on your technical docs.',
    techStack: ['React', 'Gemini API', 'Tailwind', 'Vector DB'],
    link: '#',
    github: '#',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    content: `
# DevDocs AI: Interactive Documentation

Static documentation is good; interactive documentation is better. DevDocs AI transforms standard markdown docs into a conversational knowledge base.

## How it works
1. **Ingestion**: We scrape your documentation site.
2. **Embedding**: Text is chunked and embedded using Gemini embeddings.
3. **Retrieval**: User queries perform semantic search on a Vector DB.
4. **Generation**: The Gemini Pro model generates an answer with citations.

## Impact
Reduced support tickets by 40% for our pilot users.
    `
  },
  {
    id: '3',
    title: 'Linguistify',
    description: 'A multilingual localization platform for SaaS applications, streamlining the translation workflow.',
    techStack: ['TypeScript', 'React', 'GraphQL'],
    link: '#',
    github: '#',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    content: `
# Linguistify: SaaS Localization Made Easy

Linguistify automates the extraction and translation of string resources in web applications.

## Features
- Automatic string extraction from React components.
- Dashboard for translators.
- Context-aware machine translation suggestions.

## Tech Stack
Built with a React frontend and a GraphQL API on the backend to efficiently manage complex relationship data between keys, languages, and translations.
    `
  },
];

// Helper to simulate DB delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// LocalStorage Keys
const STORAGE_KEYS = {
  POSTS: 'portfolio_posts',
  RESEARCH: 'portfolio_research',
  MESSAGES: 'portfolio_messages',
  PROJECTS: 'portfolio_projects',
};

// Data Service
export const DataService = {
  // Posts
  getPosts: async (): Promise<Post[]> => {
    await delay(300);
    const stored = localStorage.getItem(STORAGE_KEYS.POSTS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    return JSON.parse(stored);
  },

  getPostBySlug: async (slug: string): Promise<Post | undefined> => {
    const posts = await DataService.getPosts();
    return posts.find(p => p.slug === slug);
  },

  getPostById: async (id: string): Promise<Post | undefined> => {
    const posts = await DataService.getPosts();
    return posts.find(p => p.id === id);
  },

  savePost: async (post: Post): Promise<void> => {
    const posts = await DataService.getPosts();
    const index = posts.findIndex(p => p.id === post.id);
    if (index >= 0) {
      posts[index] = post;
    } else {
      posts.unshift(post);
    }
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  },

  deletePost: async (id: string): Promise<void> => {
    const posts = await DataService.getPosts();
    const filtered = posts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(filtered));
  },

  // Research
  getResearch: async (): Promise<ResearchPaper[]> => {
    await delay(300);
    const stored = localStorage.getItem(STORAGE_KEYS.RESEARCH);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.RESEARCH, JSON.stringify(INITIAL_RESEARCH));
      return INITIAL_RESEARCH;
    }
    return JSON.parse(stored);
  },

  getResearchById: async (id: string): Promise<ResearchPaper | undefined> => {
    const papers = await DataService.getResearch();
    return papers.find(p => p.id === id);
  },

  saveResearch: async (paper: ResearchPaper): Promise<void> => {
    const papers = await DataService.getResearch();
    const index = papers.findIndex(p => p.id === paper.id);
    if (index >= 0) {
        papers[index] = paper;
    } else {
        papers.unshift(paper);
    }
    localStorage.setItem(STORAGE_KEYS.RESEARCH, JSON.stringify(papers));
  },

  deleteResearch: async (id: string): Promise<void> => {
    const papers = await DataService.getResearch();
    const filtered = papers.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.RESEARCH, JSON.stringify(filtered));
  },

  // Projects
  getProjects: async (): Promise<Project[]> => {
    // await delay(200); // Optional delay
    const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(stored);
  },

  getProjectById: async (id: string): Promise<Project | undefined> => {
    const projects = await DataService.getProjects();
    return projects.find(p => p.id === id);
  },

  // Messages (Contact Form)
  getMessages: async (): Promise<ContactMessage[]> => {
    const stored = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return stored ? JSON.parse(stored) : [];
  },

  sendMessage: async (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>): Promise<void> => {
    const messages = await DataService.getMessages();
    const newMessage: ContactMessage = {
      ...msg,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      read: false,
    };
    messages.unshift(newMessage);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  },
  
  markMessageAsRead: async (id: string): Promise<void> => {
    const messages = await DataService.getMessages();
    const index = messages.findIndex(m => m.id === id);
    if (index >= 0) {
        messages[index].read = true;
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    }
  },

  deleteMessage: async (id: string): Promise<void> => {
    const messages = await DataService.getMessages();
    const filtered = messages.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(filtered));
  }
};