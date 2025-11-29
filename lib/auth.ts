"use client"

export const AuthService = {
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('admin_auth');
  },
  login: (token: string = 'true') => {
    localStorage.setItem('admin_auth', token);
    window.dispatchEvent(new Event('auth-change'));
  },
  logout: () => {
    localStorage.removeItem('admin_auth');
    window.dispatchEvent(new Event('auth-change'));
  }
};