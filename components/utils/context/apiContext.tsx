'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phone: string;
  createdAt: string;
  status: string;
}

interface ApiContextType {
  apiData: User[];
  fetchData: () => Promise<void>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiData, setApiData] = useState<User[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<User[]>('https://run.mocky.io/v3/26db791b-2fb3-4b73-b4a2-2995d365b3ef');
      setApiData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ApiContext.Provider value={{ apiData, fetchData }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export default ApiContext;
