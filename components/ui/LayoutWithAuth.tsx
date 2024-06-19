import React, { ReactNode } from 'react';
import { AuthProvider } from '@/components/utils/context/authContext';

interface LayoutWithAuthProps {
  children: ReactNode;
}

const LayoutWithAuth: React.FC<LayoutWithAuthProps> = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default LayoutWithAuth;
