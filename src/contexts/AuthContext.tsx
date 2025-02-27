import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types/api.types';
import { authApi } from '../hooks/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: 'HABITANT' | 'ASSOCIATION') => Promise<void>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<{ user: User }>(token);
        setUser(decoded.user);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const { user } = await authApi.login(email, password);
    setUser(user);
  };

  const signUp = async (email: string, password: string) => {
    const { user } = await authApi.register(email, password);
    setUser(user);
  };

  const signOut = () => {
    authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}