"use client";


import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { DataService } from '@/lib/data';
import { Category, Post } from '@/types/types';
import Link from 'next/link';
import Image from 'next/image';








export default function Health() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    DataService.getPosts().then(data => {
      setPosts(data.filter(p => p.category === Category.HEALTH && p.status === 'published'));
    });
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-zinc-800 rounded-xl text-white">
          <Activity className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-serif text-white">Digital Health</h1>
          <p className="text-zinc-500">Advocacy and technical deep-dives into HealthTech.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map(post => (
          <Link key={post.id} href={`/health/${post.slug}`} className="block h-full">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-colors h-full flex flex-col">
              <div className="h-48 bg-zinc-800 overflow-hidden relative">
                <Image src={post.imageUrl || 'https://via.placeholder.com/800x400'}
                  width={800}
                  height={800} alt={post.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur text-xs font-bold px-2 py-1 rounded text-white">
                  {post.readTime}
                </div>
              </div>
              <div className="p-5 space-y-3 flex flex-col flex-1">
                <h3 className="text-lg font-serif font-bold text-white leading-tight">{post.title}</h3>
                <p className="text-sm text-zinc-400 line-clamp-3 flex-1">{post.excerpt}</p>
                <span className="text-xs font-bold uppercase tracking-wider text-white mt-2 hover:underline">Read Article</span>
              </div>
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-zinc-500">More health-focused content coming soon.</p>
        )}
      </div>
    </div>
  );
};