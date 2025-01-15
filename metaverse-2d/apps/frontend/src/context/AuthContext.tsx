import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../api/client';
import type { UserType } from '../api/client';

interface User {
  id: string;
  username: string;
  type: UserType;
}

interface AuthContextType {
  user: User | null;
  signin: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string, type: UserType) => Promise<void>;
  signout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const signin = async (username: string, password: string) => {
    const { user, token } = await api.auth.signin({ username, password });
    setUser(user);
  };

  const signup = async (username: string, password: string, type: UserType) => {
    const { user, token } = await api.auth.signup({ username, password, type });
    setUser(user);
  };

  const signout = () => {
    api.auth.signout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 