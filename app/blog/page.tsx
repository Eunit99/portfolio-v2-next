import { createClient } from '@/utils/supabase/server';
import BlogClient from '@/components/BlogClient';
import { Post } from '@/types/types';

export const metadata = {
  title: 'Blog - My Portfolio',
  description: 'Technical writing and thoughts on software engineering.',
};

export default async function Blog() {
  const supabase = await createClient();

  // Fetch only published posts
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  // Transform DB shape to App Type shape
  const formattedPosts: Post[] = (posts || []).map((p) => ({
    ...p,
    imageUrl: p.image_url,
    date: new Date(p.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    readTime: p.read_time || '5 min read',
  }));

  return (
    <div className="animate-in fade-in duration-500">
      <BlogClient initialPosts={formattedPosts} />
    </div>
  );
}