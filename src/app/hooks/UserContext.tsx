"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLoggedInUser } from '@/lib/appwrite';
import { AppwriteUser } from '@/lib/types';

interface UserContextType {
  user: AppwriteUser | null;
  loading: boolean;
  setUser: (user: AppwriteUser | null) => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setLoading(true);
      const userData = (await getLoggedInUser()) as AppwriteUser;
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value = {
    user,
    loading,
    setUser,
    refreshUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};