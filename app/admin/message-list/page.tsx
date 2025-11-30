import React from 'react';
import { createClient } from '@/utils/supabase/server';
import MessageListClient from '@/components/admin/MessageListClient';
import { ContactMessage } from '@/types/types';

export default async function MessageList() {
  const supabase = await createClient();

  const { data: messages } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  const formattedMessages: ContactMessage[] = (messages || []).map(m => ({
    ...m,
    read: m.is_read,
    date: new Date(m.created_at).toLocaleDateString(),
  }));

  return (
    <div className="space-y-6 animate-in fade-in">
      <h1 className="text-3xl font-serif font-bold text-white">Inbox</h1>
      <MessageListClient initialMessages={formattedMessages} />
    </div>
  );
}