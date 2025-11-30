import React from 'react';
import { Eye, FileText, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { Plus } from 'lucide-react';

export default async function Dashboard() {
  const supabase = await createClient();

  // Parallel data fetching for stats
  const [
    { count: postCount },
    { count: messageCount },
    { data: posts }
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('messages').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(5)
  ]);

  // Calculate total views (sum of all post views)
  const { data: allPosts } = await supabase.from('posts').select('views');
  const totalViews = allPosts?.reduce((acc, curr) => acc + (curr.views || 0), 0) || 0;

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-white">Dashboard</h1>
        <Link href="/admin/posts/new" className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Views" value={totalViews.toLocaleString()} icon={Eye} trend="All time" />
        <StatCard title="Total Posts" value={postCount || 0} icon={FileText} />
        <StatCard title="Messages" value={messageCount || 0} icon={MessageSquare} />
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-lg font-serif font-bold text-white">Recent Content</h2>
        </div>
        <div className="divide-y divide-zinc-800">
          {posts?.map((post) => (
            <div key={post.id} className="p-4 flex items-center justify-between hover:bg-zinc-900/80 transition-colors">
              <div>
                <div className="font-medium text-white">{post.title}</div>
                <div className="text-xs text-zinc-500 flex gap-2 mt-1">
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
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
}

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