'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { ContactMessage, Post, ResearchPaper } from '@/types/types'

// --- Contact & Newsletter ---

export async function submitMessage(formData: FormData) {
  const supabase = await createClient()

  const message = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
    is_read: false,
  }

  const { error } = await supabase.from('messages').insert(message)

  if (error) {
    console.error('Error submitting message:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}

export async function subscribeNewsletter(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  const { error } = await supabase.from('subscribers').insert({ email })

  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true }
}

// --- Admin Actions (Protected by Middleware + RLS) ---

export async function deletePost(id: string) {
  const supabase = await createClient()
  await supabase.from('posts').delete().eq('id', id)
  revalidatePath('/admin/posts')
  revalidatePath('/blog')
  revalidatePath('/health')
}

export async function deleteResearch(id: string) {
  const supabase = await createClient()
  await supabase.from('research_papers').delete().eq('id', id)
  revalidatePath('/admin/research')
  revalidatePath('/research')
}

export async function deleteMessage(id: string) {
  const supabase = await createClient()
  await supabase.from('messages').delete().eq('id', id)
  revalidatePath('/admin/messages')
}

export async function markMessageAsRead(id: string) {
  const supabase = await createClient()
  await supabase.from('messages').update({ is_read: true }).eq('id', id)
  revalidatePath('/admin/messages')
}

export async function savePost(post: Partial<Post>) {
  const supabase = await createClient()

  const dbPost = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    image_url: post.imageUrl,
    read_time: post.readTime,
    status: post.status,
    published_at: post.date ? new Date(post.date).toISOString() : new Date().toISOString(),
  }

  if (post.id) {
    await supabase.from('posts').update(dbPost).eq('id', post.id)
  } else {
    await supabase.from('posts').insert(dbPost)
  }

  revalidatePath('/admin/posts')
  revalidatePath('/blog')
}