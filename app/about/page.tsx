import { BIO } from '@/services/mockData';
import React from 'react';

export default function About() {
  // Split bio into paragraphs for better rendering
  const paragraphs = BIO.split('\n\n');

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <header className="space-y-4">
        <h1 className="text-4xl font-serif text-white">About Emmanuel</h1>
        <div className="h-1 w-20 bg-white"></div>
      </header>

      <div className="prose prose-invert prose-lg text-zinc-400 leading-loose">
        {paragraphs.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-800">
        <div className="space-y-4">
          <h3 className="text-xl font-serif text-white">Core Technologies</h3>
          <ul className="space-y-2 text-zinc-400">
            <li>React, Next.js, TypeScript</li>
            <li>TailwindCSS, Framer Motion</li>
            <li>Supabase, PostgreSQL, Node.js</li>
            <li>Gemini API, LangChain</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-serif text-white">Areas of Focus</h3>
          <ul className="space-y-2 text-zinc-400">
            <li>Digital Health Interoperability</li>
            <li>Technical Communication</li>
            <li>Web Accessibility (a11y)</li>
            <li>Design Systems</li>
          </ul>
        </div>
      </div>
    </div>
  );
}