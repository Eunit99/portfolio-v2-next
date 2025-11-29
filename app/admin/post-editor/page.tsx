"use client";


import React, { useEffect, useState } from 'react';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import { DataService } from '@/lib/data';
import { Post, Category } from '@/types/types';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';









export default function PostEditor() {
  const router = useRouter();
  const params = useParams();
  const { id } = useParams();
  const isNew = !params.id || params.id === 'new';

  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Partial<Post>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: Category.TECH,
    status: 'draft',
    imageUrl: '',
    readTime: '5 min read',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (!isNew && id && typeof id === "string") {
      DataService.getPostById(id).then(p => {
        if (p) setPost(p);
      });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setIsLoading(true);
    const toSave: Post = {
      ...post as Post,
      id: post.id || Math.random().toString(36).substr(2, 9),
      slug: post.slug || post.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'untitled'
    };

    await DataService.savePost(toSave);
    setIsLoading(false);
    router.push('/admin/posts');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="text-zinc-500 hover:text-white flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-500">{post.status === 'draft' ? 'Unsaved changes' : 'Saved'}</span>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isNew ? 'Publish Post' : 'Update Post'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="md:col-span-2 space-y-6">
          <input
            type="text"
            placeholder="Post Title"
            value={post.title}
            onChange={e => setPost({ ...post, title: e.target.value })}
            className="w-full bg-transparent text-4xl font-serif font-bold text-white placeholder-zinc-700 border-none focus:ring-0 px-0"
          />

          <textarea
            placeholder="Write your masterpiece... (Markdown supported)"
            value={post.content}
            onChange={e => setPost({ ...post, content: e.target.value })}
            className="w-full h-[600px] bg-zinc-900/30 text-zinc-300 p-4 rounded-xl border border-zinc-800 focus:border-zinc-600 focus:outline-none resize-none font-mono text-sm leading-relaxed"
          />
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="space-y-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="font-bold font-serif text-white">Post Settings</h3>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500">Slug</label>
              <input
                type="text"
                value={post.slug}
                onChange={e => setPost({ ...post, slug: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500">Category</label>
              <select
                value={post.category}
                onChange={e => setPost({ ...post, category: e.target.value as Category })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-white"
              >
                {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500">Excerpt</label>
              <textarea
                rows={3}
                value={post.excerpt}
                onChange={e => setPost({ ...post, excerpt: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-white resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500">Cover Image URL</label>
              <input
                type="text"
                value={post.imageUrl}
                onChange={e => setPost({ ...post, imageUrl: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};