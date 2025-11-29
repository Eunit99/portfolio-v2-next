"use client";


import React, { useEffect, useState } from 'react';
import { Mail, Trash2, Check, Clock } from 'lucide-react';
import { DataService } from '@/lib/data';
import { ContactMessage } from '@/types/types';







export  default function MessageList() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    DataService.getMessages().then(setMessages);
  }, []);

  const handleMarkRead = async (id: string) => {
    await DataService.markMessageAsRead(id);
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this message?')) {
      await DataService.deleteMessage(id);
      setMessages(messages.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <h1 className="text-3xl font-serif font-bold text-white">Inbox</h1>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 border border-zinc-800 rounded-xl border-dashed">
            No messages yet.
          </div>
        ) : (
          messages.map(msg => (
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
                    <Clock className="w-3 h-3" /> {new Date(msg.date).toLocaleDateString()}
                  </span>
                  {!msg.read && (
                    <button onClick={() => handleMarkRead(msg.id)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-green-400" title="Mark as Read">
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => handleDelete(msg.id)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-red-400" title="Delete">
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
    </div>
  );
};