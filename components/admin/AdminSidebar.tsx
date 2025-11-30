'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, LogOut, BookOpen, Activity, ArrowLeft } from 'lucide-react';
// Fix relative path if needed, though alias should work in client components if config is right.
// Falling back to relative for safety in this specific build environment.
import { createClient } from '../../utils/supabase/client';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
    router.refresh();
  };

  const navItems = [
    { label: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Posts', path: '/admin/posts', icon: FileText },
    { label: 'Research', path: '/admin/research', icon: BookOpen },
    { label: 'Messages', path: '/admin/messages', icon: Activity },
  ];

  return (
    <aside className="w-64 border-r border-zinc-800 bg-zinc-950 hidden md:flex flex-col fixed h-full z-20">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <div className="text-xl font-bold tracking-tight text-white">Admin Console</div>
          <div className="text-xs text-zinc-500 mt-1">Emmanuel Uchenna</div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <div className="mb-4">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-zinc-500 hover:text-white uppercase tracking-wider">
            <ArrowLeft className="w-3 h-3" /> Back to Site
          </Link>
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          const linkClasses = `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
            ? 'bg-zinc-900 text-white'
            : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
            }`;

          return (
            <Link key={item.path} href={item.path} className={linkClasses}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-950/30 w-full transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}