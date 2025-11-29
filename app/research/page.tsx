"use client";


import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { ResearchPaper } from '@/types/types';
import { DataService } from '@/lib/data';
import Link from 'next/link';










export default function Research() {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);

  useEffect(() => {
    DataService.getResearch().then(setPapers);
  }, []);

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-serif text-white">Research</h1>
        <p className="text-zinc-400 max-w-2xl">
          Academic and whitepaper contributions focusing on digital health infrastructure, AI ethics, and technical pedagogy.
        </p>
      </div>

      <div className="grid gap-6">
        {papers.map((paper) => (
          <Link key={paper.id} href={`/research/${paper.id}`} className="block">
            <div className="p-6 bg-zinc-900/30 border border-zinc-800 hover:border-zinc-600 rounded-xl transition-all duration-300 group">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono uppercase tracking-wider">
                    <span>{paper.publisher}</span>
                    <span>•</span>
                    <span>{paper.publicationDate}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-zinc-300 transition-colors">
                    {paper.title}
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-3xl leading-relaxed">
                    {paper.abstract}
                  </p>
                </div>
                <div className="shrink-0 p-3 bg-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors" aria-label="View Paper">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};