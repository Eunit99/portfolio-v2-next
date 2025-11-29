"use client";


import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { DataService } from '@/lib/data';
import { ResearchPaper } from '@/types/types';











export default function ResearchList() {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      const data = await DataService.getResearch();
      setPapers(data);
    };
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this paper?')) {
      await DataService.deleteResearch(id);
      setPapers(papers.filter(p => p.id !== id));
    }
  };

  const filtered = papers.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-3xl font-serif font-bold text-white">Research Papers</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search papers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-zinc-600"
            />
          </div>
          <Link href="/admin/research/new" className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Paper
          </Link>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-400">
          <thead className="bg-zinc-900 border-b border-zinc-800 uppercase text-xs font-semibold text-zinc-500">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Publisher</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {filtered.map(paper => (
              <tr key={paper.id} className="hover:bg-zinc-900/50 transition-colors group">
                <td className="p-4 font-medium text-white">{paper.title}</td>
                <td className="p-4">{paper.publisher}</td>
                <td className="p-4">{paper.publicationDate}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={`/admin/research/${paper.id}`} className="p-2 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white">
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleDelete(paper.id)} className="p-2 hover:bg-red-950/30 rounded text-zinc-400 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};