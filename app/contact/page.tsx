'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { submitMessage } from '@/lib/actions';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.currentTarget);
    const result = await submitMessage(formData);

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Failed to send message');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-serif text-white">Get in Touch</h1>
        <p className="text-zinc-400">
          Have a project in mind, or just want to chat about tech? Drop me a line.
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center space-y-4 animate-in zoom-in-95">
          <div className="w-16 h-16 bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white">Message Sent!</h3>
          <p className="text-zinc-400">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
          <button
            onClick={() => setStatus('idle')}
            className="text-sm font-semibold text-white underline hover:text-zinc-300"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === 'error' && (
            <div className="p-4 bg-red-950/50 border border-red-900 text-red-200 rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-zinc-300">Name</label>
              <input
                required
                name="name"
                type="text"
                id="name"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-white/20 focus:border-white outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</label>
              <input
                required
                name="email"
                type="email"
                id="email"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-white/20 focus:border-white outline-none transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium text-zinc-300">Subject</label>
            <select name="subject" id="subject" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-white/20 focus:border-white outline-none transition-all appearance-none">
              <option>General Inquiry</option>
              <option>Project Collaboration</option>
              <option>Speaking Opportunity</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-zinc-300">Message</label>
            <textarea
              required
              name="message"
              id="message"
              rows={6}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-white/20 focus:border-white outline-none transition-all resize-none"
              placeholder="Tell me about your project..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? <Loader2 className="w-4 h-4 animate-spin" /> : (
              <>Send Message <Send className="w-4 h-4" /></>
            )}
          </button>
        </form>
      )}

      <div className="pt-12 border-t border-zinc-800 text-center space-y-2">
        <p className="text-zinc-500 text-sm">Or email me directly at</p>
        <a href="mailto:hello@emmanuel.dev" className="text-xl font-bold text-white hover:underline decoration-zinc-500 underline-offset-4">
          hello@emmanuel.dev
        </a>
      </div>
    </div>
  );
}