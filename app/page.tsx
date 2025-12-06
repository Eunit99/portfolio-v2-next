"use client";


import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { DataService } from '../lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Post, Project } from '@/types/types';



export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const projects = await DataService.getProjects();
      setFeaturedProjects(projects.slice(0, 2));

      const posts = await DataService.getPosts();
      setFeaturedPosts(posts.filter(p => p.status === 'published').slice(0, 2));
    };
    loadData();
  }, []);

  return (
    <div className="space-y-24 animate-in fade-in duration-700">

      {/* Hero Section */}
      <section className="space-y-8 py-10 md:py-20">
        <h1 className="text-4xl md:text-6xl font-serif font-medium text-white tracking-tight leading-tight">
          Building the future of <br className="hidden md:block" />
          <span className="text-zinc-500 italic">health, tech, and communication.</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
          I&apos;m Emmanuel Uchenna. I engineer scalable frontend systems, write technical documentation that humans actually read, and advocate for digital health equity.
        </p>
        <div className="flex flex-column md:flex-row items-center gap-4 w-full flex-wrap">
          <Link
            href="/contact"
            className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors flex items-center gap-2 min-w-full md:min-w-0 justify-center "
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border border-zinc-700 text-white font-medium rounded-full hover:bg-zinc-900 transition-colors flex items-center gap-2 min-w-full md:min-w-0 justify-center "
          >
            About Me <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-2xl font-serif text-white">Selected Projects</h2>
          <Link href="/research" className="text-sm text-zinc-500 hover:text-white transition-colors">View All Research &rarr;</Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="block group">
              <div className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 h-full">
                <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                  <Image
                    src={project.imageUrl ?? "https://picsum.photos/800/600"}
                    alt={project.title}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white group-hover:underline decoration-1 underline-offset-4">{project.title}</h3>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-zinc-800 text-zinc-300 rounded border border-zinc-700">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Writing */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-2xl font-serif text-white">Recent Writing</h2>
          <Link href="/blog" className="text-sm text-zinc-500 hover:text-white transition-colors">Read Blog &rarr;</Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {featuredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block">
              <article className="flex flex-col gap-2 p-4 rounded-xl hover:bg-zinc-900/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 text-xs text-zinc-500 mb-1">
                  <span className="text-zinc-300 font-medium">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-zinc-200 group-hover:text-white transition-colors">{post.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                <div className="mt-2 text-xs font-medium text-zinc-500 group-hover:text-white transition-colors flex items-center gap-1">
                  Read Article <ArrowRight className="w-3 h-3" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}