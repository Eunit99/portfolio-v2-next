'use client';

import React from 'react';
import { Mail, Trash2, Check, Clock } from 'lucide-react';
import { ContactMessage } from '@/types/types';
import { deleteMessage, markMessageAsRead } from '@/lib/actions';

export default function MessageListClient({ initialMessages }: { initialMessages: ContactMessage[] }) {
  // We use optimistic updates or simply router.refresh() via Server Actions
  // For simplicity, we assume the server action revalidates the path.

  return (
    <div className="grid gap-4">
      {initialMessages.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 border border-zinc-800 rounded-xl border-dashed">
          No messages yet.
        </div>
      ) : (
        initialMessages.map(msg => (
          <div key={msg.id} className={`bg-zinc-900/50 border ${msg.read ? 'border-zinc-800' : 'border-white/20 bg-zinc-900'} p-6 rounded-xl transition-all`}>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${msg.read ? 'bg-zinc-800 text-zinc-500' : 'bg-white text-black'}`}>
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{msg.subject}</h3>
                  <div className="text-xs text-zinc-400 flex items-center gap-2">
                    <span>{msg.name}</span>
                    <span>&lt;{msg.email}&gt;</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {msg.date}
                </span>
                {!msg.read && (
                  <button
                    onClick={() => markMessageAsRead(msg.id)}
                    className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-green-400"
                    title="Mark as Read"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={async () => {
                    if (confirm("Delete message?")) await deleteMessage(msg.id)
                  }}
                  className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-red-400"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap pl-11">
              {msg.message}
            </p>
          </div>
        ))
      )}
    </div>
  );
}