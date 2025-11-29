"use client";


import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import { ResearchPaper } from '@/types/types';
import { useParams } from 'next/navigation';
import { DataService } from '@/lib/data';
import Link from 'next/link';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';




export default function SingleResearch() {
  const { id } = useParams();
  const [paper, setPaper] = useState<ResearchPaper | null>(null);

  useEffect(() => {
    if (id && typeof id === 'string') {
      DataService.getResearchById(id).then(p => setPaper(p || null));
    }
  }, [id]);

  if (!paper) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
      <Link href="/research" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Research
      </Link>

      <div className="space-y-4">
        <div className="flex gap-2 text-zinc-500 text-sm font-mono uppercase">
          <span>{paper.publisher}</span>
          <span>•</span>
          <span>{paper.publicationDate}</span>
        </div>
        <h1 className="text-4xl font-serif font-bold text-white">{paper.title}</h1>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl space-y-4">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Abstract</h3>
        <p className="text-zinc-200 leading-relaxed text-lg">{paper.abstract}</p>
      </div>

      <div className="flex gap-4">
        <a href={paper.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors">
          Read Full Paper <ExternalLink className="w-4 h-4" />
        </a>
        <button className="flex items-center gap-2 px-6 py-3 border border-zinc-700 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors">
          Download PDF <Download className="w-4 h-4" />
        </button>
      </div>

      {paper.content && (
        <div className="prose prose-invert prose-lg max-w-none pt-12 border-t border-zinc-800">
          <MarkdownRenderer content={paper.content} />
        </div>
      )}
    </div>
  );
};
