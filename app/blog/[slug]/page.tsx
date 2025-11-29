"use client";


import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, Link, Tag } from 'lucide-react';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { DataService } from '@/lib/data';
import { Post, Category } from '@/types/types';
import { useParams } from 'next/navigation';
import Image from 'next/image';














export default function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug && typeof slug === "string") {
      DataService.getPostBySlug(slug).then(p => {
        setPost(p || null);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) return <div className="py-20 text-center text-zinc-500">Loading post...</div>;
  if (!post) return <div className="py-20 text-center text-zinc-500">Post not found.</div>;

  const backLink = post.category === Category.HEALTH ? '/health' : '/blog';
  const backLabel = post.category === Category.HEALTH ? 'Back to Health' : 'Back to Blog';

  return (
    <article className="max-w-3xl mx-auto space-y-12 animate-in fade-in duration-700">
      <Link href={backLink} className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> {backLabel}
      </Link>

      <header className="space-y-6 text-center">
        <div className="flex items-center justify-center gap-3 text-sm text-zinc-500">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-white"><Tag className="w-3 h-3" /> {post.category}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">{post.title}</h1>
      </header>

      {post.imageUrl && (
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
          <Image src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="prose prose-invert prose-lg max-w-none">
        <MarkdownRenderer content={post.content} />
      </div>
    </article>
  );
};