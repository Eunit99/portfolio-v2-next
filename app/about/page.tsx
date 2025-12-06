import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Profile } from '@/types/types';

export const metadata = {
  title: 'About - Emmanuel Uchenna',
  description: 'Frontend Engineer, Technical Writer, and Digital Health Advocate.',
};

export default async function About() {
  const supabase = await createClient();

  // Fetch profile with new columns
  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('*')
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      notFound();
    } else {
      console.error('Error fetching profile:', error);
      throw new Error('Failed to load profile data.');
    }
  }

  // Cast to Profile type to ensure TS knows about new array fields
  const profile = profileData as Profile;

  // Fallback content
  const bio = profile.bio || "Biography content not yet available.";
  const paragraphs = bio.split('\n\n');

  // Default fallbacks if arrays are empty in DB
  const technologies = profile.technologies?.length > 0
    ? profile.technologies
    : ['React, Next.js, TypeScript', 'TailwindCSS, Framer Motion', 'Supabase, PostgreSQL, Node.js', 'Gemini API, LangChain'];

  const focusAreas = profile.focus_areas?.length > 0
    ? profile.focus_areas
    : ['Digital Health Interoperability', 'Technical Communication', 'Web Accessibility (a11y)', 'Design Systems'];

  return (
    <div className="max-w-3xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <header className="space-y-4">
        <h1 className="text-4xl font-serif text-white">About {profile.full_name}</h1>
        {profile.headline && <p className="text-xl text-zinc-400">{profile.headline}</p>}
        <div className="h-1 w-20 bg-white"></div>
      </header>

      <div className="prose prose-invert prose-lg text-zinc-400 leading-loose">
        {paragraphs.map((para: string, index: number) => (
          <p key={index}>{para}</p>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-800">
        {/* Dynamic Core Technologies Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif text-white">Core Technologies</h3>
          <ul className="space-y-2 text-zinc-400">
            {technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>

        {/* Dynamic Areas of Focus Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-serif text-white">Areas of Focus</h3>
          <ul className="space-y-2 text-zinc-400">
            {focusAreas.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}