import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Profile } from '@/types/types';
import Image from 'next/image';

export const metadata = {
  title: 'About - Emmanuel Uchenna',
  description: 'Frontend Engineer, Technical Writer, and Digital Health Advocate.',
};

export default async function About() {
  const supabase = await createClient();

  // Fetch profile. Assuming single user portfolio, we fetch the first profile.
  const { data: profileData, error } = await supabase
    .from('profiles')
    .select('*')
    .single();

  if (error) {
    // PGRST116 is "not found" error, show 404 page
    if (error.code === 'PGRST116') {
      notFound();
    } else {
      // Log other errors and show a generic error message
      console.error('Error fetching profile:', error);
      throw new Error('Failed to load profile data.');
    }
  }

  // Cast to Profile type to ensure TS knows about new array fields
  const profile = profileData as Profile;

  // Fallback content if no profile exists in DB yet
  const bio = profile?.bio || "Biography content not yet available.";
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
      <header className="space-y-6 text-center md:text-left">
        {/* Avatar Image with Animation */}
        {profile.avatar_url && (
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto md:mx-0 border-4 border-white/10 shadow-lg">
            <Image
              src={profile.avatar_url}
              alt={profile.full_name}
              width={160}
              height={160}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-90 hover:opacity-100"
              priority
            />
          </div>
        )}

        <div>
          <h1 className="text-4xl font-serif text-white">About {profile.full_name}</h1>
          {profile.headline && <p className="text-xl text-zinc-400 mt-2">{profile.headline}</p>}
          <div className="h-1 w-20 bg-white mt-4 mx-auto md:mx-0"></div>
        </div>
      </header>

      <div className="prose prose-invert prose-lg text-zinc-400 leading-loose">
        {paragraphs.map((para: string, index: number) => (
          <p key={index}>{para}</p>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-zinc-800">
        <div className="space-y-4">
          <h3 className="text-xl font-serif text-white">Core Technologies</h3>
          <ul className="space-y-2 text-zinc-400">
            {technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>
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