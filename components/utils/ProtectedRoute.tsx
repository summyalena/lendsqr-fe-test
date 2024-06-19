'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './context/authContext';
import Loader from '../ui/reusables/Loader/Loader';

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/Login');
    }
  }, [user, router]);

  if (user === null) {
    return <Loader/>; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;
