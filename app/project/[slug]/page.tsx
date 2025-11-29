"use client";


import React, { useEffect, useState } from 'react';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { Project } from '@/types/types';
import { useParams } from 'next/navigation';
import { DataService } from '@/lib/data';
import Link from 'next/link';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import Image from 'next/image';












export default function SingleProject() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && typeof id === "string") {
      DataService.getProjectById(id).then(p => {
        setProject(p || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="py-20 text-center text-zinc-500">Loading project...</div>;
  if (!project) return <div className="py-20 text-center text-zinc-500">Project not found.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <header className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">{project.title}</h1>
        <p className="text-xl text-zinc-400 max-w-2xl">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-sm px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full border border-zinc-700">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-2">
          <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors">
            Live Demo <ExternalLink className="w-4 h-4" />
          </a>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-2.5 border border-zinc-700 text-white font-medium rounded-full hover:bg-zinc-800 transition-colors">
              <Github className="w-4 h-4" /> Source Code
            </a>
          )}
        </div>
      </header>

      {project.imageUrl && (
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
          <Image src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        </div>
      )}

      {project.content && (
        <div className="prose prose-invert prose-lg max-w-none pt-8 border-t border-zinc-800">
          <MarkdownRenderer content={project.content} />
        </div>
      )}
    </div>
  );
};