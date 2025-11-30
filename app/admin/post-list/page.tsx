import React from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { Post } from '@/types/types';
import { deletePost } from '@/lib/actions';

export default async function PostList() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  const formattedPosts: Post[] = (posts || []).map(p => ({
    ...p,
    imageUrl: p.image_url,
    readTime: p.read_time,
    date: new Date(p.created_at).toLocaleDateString()
  }));

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-serif font-bold text-white">Posts</h1>
        <div className="flex gap-4">
          {/* Note: Server Side Search usually involves URL params. For simplicity in this dashboard list, we just render all. */}
          <Link href="/admin/posts/new" className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create
          </Link>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-900 border-b border-zinc-800 uppercase text-xs font-semibold text-zinc-500">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {formattedPosts.map(post => (
              <tr key={post.id} className="hover:bg-zinc-900/50 transition-colors group">
                <td className="p-4 font-medium text-white">{post.title}</td>
                <td className="p-4">{post.category}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${post.status === 'published' ? 'bg-green-950/30 text-green-500' : 'bg-yellow-950/30 text-yellow-500'}`}>
                    {post.status}
                  </span>
                </td>
                <td className="p-4">{post.date}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/admin/posts/${post.id}`} className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white">
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    {/* Delete Button Form */}
                    <form action={deletePost.bind(null, post.id)}>
                      <button className="p-2 hover:bg-red-950/30 rounded text-zinc-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}