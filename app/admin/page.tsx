"use client";

import { AuthService } from '@/lib/auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';




export default function Admin()  {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (AuthService.isAuthenticated()) {
      router.replace('/admin/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return null; // Logic is handled by router and effects
};