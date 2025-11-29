import { Post, Category, Project, ResearchPaper } from "@/types/types";

export const BIO = `Hi, I’m Emmanuel Uchenna — a frontend engineer, technical writer, and digital health advocate passionate about building technology that empowers people. With over five years of experience, I specialize in crafting clean, scalable user interfaces with React, Next.js, and modern web tooling, while also translating complex technical ideas into clear, engaging content through articles, documentation, and whitepapers.

My work spans SaaS platforms, AI/LLM applications, digital health solutions, and developer education, where I’ve led projects that improved healthcare access, scaled multilingual platforms, and delivered content for global tech communities. I love bridging the gap between code and communication, making technology both functional and understandable.

Beyond code and writing, I’m passionate about digital inclusion, youth empowerment, and capacity building in tech. I speak multiple languages (English, and French), which helps me connect across cultures and bring a global perspective to every project.`;

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'MedConnect API',
    description: 'A scalable API gateway for interoperable digital health records, ensuring secure data exchange between hospitals.',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
    link: '#',
    github: '#',
    imageUrl: 'https://picsum.photos/800/600?random=1',
  },
  {
    id: '2',
    title: 'DevDocs AI',
    description: 'An intelligent documentation assistant that uses LLMs to answer developer queries based on your technical docs.',
    techStack: ['React', 'Gemini API', 'Tailwind', 'Vector DB'],
    link: '#',
    github: '#',
    imageUrl: 'https://picsum.photos/800/600?random=2',
  },
  {
    id: '3',
    title: 'Linguistify',
    description: 'A multilingual localization platform for SaaS applications, streamlining the translation workflow.',
    techStack: ['TypeScript', 'React', 'GraphQL'],
    link: '#',
    github: '#',
    imageUrl: 'https://picsum.photos/800/600?random=3',
  },
];

export const POSTS: Post[] = [
  {
    id: '1',
    title: 'The Future of Digital Health in Africa',
    slug: 'future-digital-health-africa',
    excerpt: 'Exploring how mobile penetration and AI are revolutionizing healthcare delivery in emerging markets.',
    content: 'Full content would go here...',
    date: 'Oct 24, 2023',
    category: Category.HEALTH,
    readTime: '5 min read',
    imageUrl: 'https://picsum.photos/800/400?random=4',
    status: 'published',
  },
  {
    id: '2',
    title: 'Scalable State Management in React 18',
    slug: 'react-18-state-management',
    excerpt: 'A deep dive into concurrency features and how to leverage lightweight stores instead of Redux.',
    content: 'Full content would go here...',
    date: 'Nov 12, 2023',
    category: Category.TECH,
    readTime: '8 min read',
    imageUrl: 'https://picsum.photos/800/400?random=5',
    status: 'published',
  },
  {
    id: '3',
    title: 'Why Technical Writing Matters for Engineers',
    slug: 'tech-writing-for-engineers',
    excerpt: 'Communication is the bottleneck of software engineering. Here is how to fix it.',
    content: 'Full content would go here...',
    date: 'Dec 05, 2023',
    category: Category.TECH,
    readTime: '4 min read',
    imageUrl: 'https://picsum.photos/800/400?random=6',
    status: 'published',
  },
  {
    id: '4',
    title: 'Bridging the Gap: AI and Human Empathy',
    slug: 'ai-human-empathy',
    excerpt: 'Can Large Language Models truly understand the nuance of human emotion in mental health apps?',
    content: 'Full content would go here...',
    date: 'Jan 15, 2024',
    category: Category.RESEARCH,
    readTime: '10 min read',
    imageUrl: 'https://picsum.photos/800/400?random=7',
    status: 'published',
  },
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: '1',
    title: 'Optimizing Telemedicine Latency in Low-Bandwidth Regions',
    abstract: 'This paper proposes a novel compression algorithm for real-time video transmission over 3G networks.',
    publicationDate: '2022',
    publisher: 'Journal of Digital Health',
    link: '#',
  },
  {
    id: '2',
    title: 'LLM Hallucinations in Medical Diagnostics',
    abstract: 'An analysis of error rates when using generic LLMs for preliminary patient triage.',
    publicationDate: '2023',
    publisher: 'AI Ethics Conference',
    link: '#',
  },
];