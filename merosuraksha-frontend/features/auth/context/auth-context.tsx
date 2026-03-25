import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '@/shared/utils/storage';
import { authApi } from '../api/auth-api';
import type { User, LoginInput, RegisterInput, OnboardingInput } from '../types/auth.types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginInput) => Promise<{ success: boolean; message?: string }>;
  register: (data: RegisterInput) => Promise<{ success: boolean; message?: string }>;
  googleLogin: (token: string) => Promise<{ success: boolean; message?: string }>;
  completeOnboarding: (data: OnboardingInput) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load stored auth on startup
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const [token, userData] = await Promise.all([
          storage.getItem('token'),
          storage.getItem('user'),
        ]);
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (e) {
        console.log('Auth load error:', e);
      } finally {
        setLoading(false);
      }
    };
    loadAuth();
  }, []);

  const login = async (data: LoginInput) => {
    try {
      const response = await authApi.login(data);
      if (response.success && response.token) {
        const user: User = {
          _id: response._id!,
          name: response.name!,
          email: response.email!,
          isAdmin: response.isAdmin ?? false,
          language: (response.language as 'en' | 'ne') ?? 'en',
          hasOnboarded: response.hasOnboarded ?? false,
          token: response.token,
        };
        await storage.setItem('token', response.token);
        await storage.setItem('user', JSON.stringify(user));
        setUser(user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (data: RegisterInput) => {
    try {
      const response = await authApi.register(data);
      if (response.success && response.token) {
        const user: User = {
          _id: response._id!,
          name: response.name!,
          email: response.email!,
          isAdmin: response.isAdmin ?? false,
          language: (response.language as 'en' | 'ne') ?? 'en',
          hasOnboarded: response.hasOnboarded ?? false,
          token: response.token,
        };
        await storage.setItem('token', response.token);
        await storage.setItem('user', JSON.stringify(user));
        setUser(user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Registration failed' };
    }
  };

  const completeOnboarding = async (data: OnboardingInput) => {
    try {
      const response = await authApi.completeOnboarding(data);
      if (response.success && user) {
        const updated: User = { ...user, language: data.language, hasOnboarded: true };
        await storage.setItem('user', JSON.stringify(updated));
        setUser(updated);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Onboarding failed' };
    }
  };

  const googleLogin = async (token: string) => {
    try {
      const response = await authApi.googleLogin(token);
      if (response.success && response.token) {
        const user: User = {
          _id: response._id!,
          name: response.name!,
          email: response.email!,
          isAdmin: response.isAdmin ?? false,
          language: (response.language as 'en' | 'ne') ?? 'en',
          hasOnboarded: response.hasOnboarded ?? false,
          avatar: response.avatar,
          token: response.token,
        };
        await storage.setItem('token', response.token);
        await storage.setItem('user', JSON.stringify(user));
        setUser(user);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Google login failed' };
    }
  };

  const logout = async () => {
    await storage.deleteItem('token');
    await storage.deleteItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, completeOnboarding, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};