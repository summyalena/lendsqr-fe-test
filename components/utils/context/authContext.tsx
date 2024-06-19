'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getUserByUsername } from '../indexedDB';
import Loader from '@/components/ui/reusables/Loader/Loader';

interface AuthContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const signOut = () => {
    localStorage.removeItem('username');
    // setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const username = localStorage.getItem('username');
      if (username) {
        const userData = await getUserByUsername(username);
        if (userData) {
          setUser(userData.username);
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      {!loading ? children : (
        <Loader/>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
