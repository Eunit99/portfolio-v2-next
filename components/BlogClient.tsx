'use client';

import React, { useState } from 'react';
import { Link as LinkIcon, Search } from 'lucide-react';
// Use relative path
import { Category, Post } from '../types/types';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogClient({ initialPosts }: { initialPosts: Post[] }) {
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [search, setSearch] = useState('');

  const filteredPosts = initialPosts.filter(post => {
    const matchesFilter = filter === 'All' || post.category === filter;
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <h1 className="text-4xl font-serif text-white">Writing & Thoughts</h1>
        <p className="text-zinc-400 max-w-xl">
          Exploring the intersection of software engineering, healthcare, and the human experience.
        </p>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center pt-4 border-t border-zinc-800">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            {['All', ...Object.values(Category)].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as Category | 'All')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${filter === cat
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:border-zinc-600 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-12">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article key={post.id} className="group grid md:grid-cols-[1fr_2fr] gap-6 md:gap-8 items-start">
              <Link href={`/blog/${post.slug}`} className="block aspect-[4/3] rounded-xl overflow-hidden bg-zinc-800">
                <Image
                  src={post.imageUrl || 'https://via.placeholder.com/800x600'}
                  alt={post.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
              </Link>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-zinc-500">
                  <span className="text-white font-medium">{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-serif font-bold text-white group-hover:text-zinc-300 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-zinc-400 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-2">
                  <Link href={`/blog/${post.slug}`} className="text-sm font-semibold border-b border-transparent group-hover:border-white transition-all pb-0.5">
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="py-20 text-center text-zinc-500">
            No articles found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}