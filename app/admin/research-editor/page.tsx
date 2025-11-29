"use client";


import React, { useEffect, useState } from 'react';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import { DataService } from '@/lib/data';
import { ResearchPaper } from '@/types/types';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';











export default function ResearchEditor () {
  const router = useRouter();
  const params = useParams();
  const { id } = useParams();
  const isNew = !params.id || params.id === 'new';

  const [isLoading, setIsLoading] = useState(false);
  const [paper, setPaper] = useState<Partial<ResearchPaper>>({
    title: '',
    abstract: '',
    publicationDate: new Date().getFullYear().toString(),
    publisher: '',
    link: '',
    content: ''
  });

  useEffect(() => {
    if (!isNew && id && typeof id === "string") {
      DataService.getResearchById(id).then(p => {
        if (p) setPaper(p);
      });
    }
  }, [id, isNew]);

  const handleSave = async () => {
    setIsLoading(true);
    const toSave: ResearchPaper = {
      ...paper as ResearchPaper,
      id: paper.id || Math.random().toString(36).substr(2, 9),
    };

    await DataService.saveResearch(toSave);
    setIsLoading(false);
    router.push('/admin/research');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="text-zinc-500 hover:text-white flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isNew ? 'Publish Paper' : 'Update Paper'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="md:col-span-2 space-y-6">
          <input
            type="text"
            placeholder="Paper Title"
            value={paper.title}
            onChange={e => setPaper({ ...paper, title: e.target.value })}
            className="w-full bg-transparent text-4xl font-serif font-bold text-white placeholder-zinc-700 border-none focus:ring-0 px-0"
          />

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Abstract</label>
            <textarea
              placeholder="Abstract..."
              rows={4}
              value={paper.abstract}
              onChange={e => setPaper({ ...paper, abstract: e.target.value })}
              className="w-full bg-zinc-900/30 text-zinc-300 p-4 rounded-xl border border-zinc-800 focus:border-zinc-600 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Content (Markdown)</label>
            <textarea
              placeholder="Full content (Markdown supported)..."
              value={paper.content}
              onChange={e => setPaper({ ...paper, content: e.target.value })}
              className="w-full h-[500px] bg-zinc-900/30 text-zinc-300 p-4 rounded-xl border border-zinc-800 focus:border-zinc-600 focus:outline-none resize-none font-mono text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="space-y-4 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="font-bold text-white font-serif">Paper Details</h3>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500">Publisher / Conference</label>
              <input
                type="text"
                value={paper.publisher}
                onChange={e => setPaper({ ...paper, publisher: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500">Publication Year</label>
              <input
                type="text"
                value={paper.publicationDate}
                onChange={e => setPaper({ ...paper, publicationDate: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-500">External Link</label>
              <input
                type="text"
                value={paper.link}
                onChange={e => setPaper({ ...paper, link: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-sm text-white"
                placeholder="https://doi.org/..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};