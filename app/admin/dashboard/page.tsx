"use client";


import React, { useEffect, useState } from 'react';
import { Plus, Eye, FileText, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { DataService } from '@/lib/data';
import { Post } from '@/types/types';










export default function Dashboard() {
  const [stats, setStats] = useState({ posts: 0, views: 0, messages: 0 });
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadStats = async () => {
      const posts = await DataService.getPosts();
      const messages = await DataService.getMessages();
      const totalViews = posts.reduce((acc, curr) => acc + (curr.views || 0), 0);

      setStats({
        posts: posts.length,
        views: totalViews,
        messages: messages.length,
      });
      setRecentPosts(posts.slice(0, 5));
    };
    loadStats();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-white">Dashboard</h1>
        <Link href="/admin/posts/new" className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Views" value={stats.views.toLocaleString()} icon={Eye} trend="+12%" />
        <StatCard title="Total Posts" value={stats.posts.toString()} icon={FileText} />
        <StatCard title="Messages" value={stats.messages.toString()} icon={MessageSquare} />
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-lg font-serif font-bold text-white">Recent Content</h2>
        </div>
        <div className="divide-y divide-zinc-800">
          {recentPosts.map((post) => (
            <div key={post.id} className="p-4 flex items-center justify-between hover:bg-zinc-900/80 transition-colors">
              <div>
                <div className="font-medium text-white">{post.title}</div>
                <div className="text-xs text-zinc-500 flex gap-2 mt-1">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.category}</span>
                  <span>•</span>
                  <span className={post.status === 'published' ? 'text-green-500' : 'text-yellow-500'}>
                    {post.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  <Eye className="w-3 h-3" /> {post.views}
                </span>
                <Link href={`/admin/posts/${post.id}`} className="text-sm text-zinc-400 hover:text-white hover:underline">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StatCard: React.FC<any> = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl space-y-4">
    <div className="flex justify-between items-start">
      <div className="p-2 bg-zinc-800 rounded-lg text-zinc-400">
        <Icon className="w-5 h-5" />
      </div>
      {trend && <span className="text-xs font-medium text-green-500 bg-green-950/30 px-2 py-1 rounded">{trend}</span>}
    </div>
    <div>
      <div className="text-3xl font-serif font-bold text-white">{value}</div>
      <div className="text-sm text-zinc-500 mt-1">{title}</div>
    </div>
  </div>
);