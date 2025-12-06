'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
// Removed unused imports ContactMessage, ResearchPaper
import { Post } from '@/types/types'

// --- Contact & Newsletter ---

export async function submitMessage(formData: FormData) {
  const supabase = await createClient()

  // Extract and trim fields
  const name = (formData.get('name') as string || '').trim()
  const email = (formData.get('email') as string || '').trim()
  const subject = (formData.get('subject') as string || '').trim()
  const messageText = (formData.get('message') as string || '').trim()

  // Validate required fields
  if (!name || !email || !subject || !messageText) {
    return { success: false, error: 'All fields are required.' }
  }

  // Basic email validation using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email address.' }
  }

  const message = {
    name,
    email,
    subject,
    message: messageText,
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

  // Validate email
  if (!email || !email.includes('@')) {
    return { success: false, error: 'Invalid email address' }
  }

  const { error } = await supabase.from('subscribers').insert({ email })

  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true }
}

// --- Admin Actions (Protected by Middleware + RLS) ---

export async function deletePost(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    console.error('Error deleting post:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/posts')
  revalidatePath('/blog')
  revalidatePath('/health')
  return { success: true }
}

export async function deleteResearch(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('research_papers').delete().eq('id', id)

  if (error) {
    console.error('Error deleting research:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/research')
  revalidatePath('/research')
  return { success: true }
}

export async function deleteMessage(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('messages').delete().eq('id', id)

  if (error) {
    console.error('Error deleting message:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}

export async function markMessageAsRead(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('messages').update({ is_read: true }).eq('id', id)

  if (error) {
    console.error('Error marking message as read:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/messages')
  return { success: true }
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
    const { error } = await supabase.from('posts').update(dbPost).eq('id', post.id)
    if (error) {
      console.error('Error updating post:', error)
      return { success: false, error: error.message }
    }
  } else {
    const { error } = await supabase.from('posts').insert(dbPost)
    if (error) {
      console.error('Error creating post:', error)
      return { success: false, error: error.message }
    }
  }

  revalidatePath('/admin/posts')
  revalidatePath('/blog')
  return { success: true }
}