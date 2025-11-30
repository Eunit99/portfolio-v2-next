'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle, Loader2 } from 'lucide-react'
import { subscribeNewsletter } from '@/lib/actions'

export default function Newsletter() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(formData: FormData) {
    setStatus('submitting')
    const res = await subscribeNewsletter(formData)
    if (res.success) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto border border-zinc-800">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Subscribe to the Newsletter</h1>
          <p className="text-zinc-400">
            Get the latest articles on digital health, engineering, and tech leadership delivered to your inbox.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-green-900/20 border border-green-900/50 p-6 rounded-xl animate-in zoom-in-95">
            <div className="flex items-center justify-center gap-2 text-green-400 font-medium mb-2">
              <CheckCircle className="w-5 h-5" /> Subscribed!
            </div>
            <p className="text-sm text-zinc-400">Thank you for joining. Expect the first issue soon.</p>
          </div>
        ) : (
          <form action={handleSubmit} className="space-y-4">
            <input
              required
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-white/20 focus:border-white outline-none transition-all text-center placeholder:text-zinc-600"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'submitting' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}
          </form>
        )}
        
        <p className="text-xs text-zinc-600">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </div>
  )
}