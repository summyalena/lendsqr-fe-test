import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

export interface User {
  id: number;
  organization: string;
  username: string;
  email: string;
  phone: string;
  createdAt: string;
  status: string;
  [key: string]: any;
}

interface ApiContextType {
  apiData: User[];
  fetchData: () => Promise<void>;
  filterData: (search: string, key: string) => void;
  filterDataByOptions: (options: FilterCriteria) => void;
}

interface FilterCriteria {
  [key: string]: string | undefined;
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: string;
}

const ApiContext = createContext<ApiContextType | {}>({});

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const allUsers = useRef<User[]>([]);
  const [apiData, setApiData] = useState<User[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<User[]>(
        'https://run.mocky.io/v3/26db791b-2fb3-4b73-b4a2-2995d365b3ef'
      );

      console.log(response.data);
      setApiData(response.data);
      allUsers.current = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterData = (search: string, key: string) => {
    const filteredData = allUsers.current.filter((user: User) =>
      user[key].toLowerCase().includes(search.toLowerCase())
    );

    setApiData(filteredData);
  };

  const filterDataByOptions = (options: FilterCriteria) => {
    let filteredData = allUsers.current;
    let result: User[] = [];

    for (const key in options) {
      if (options[key]) {
        if (key === 'date') {
          result = filteredData.filter((user: User) =>
            user.createdAt.includes(options[key] as string)
          );
        } else if (key === 'phoneNumber') {
          result = filteredData.filter((user: User) =>
            user.phone.includes(options[key] as string)
          );
        } else if (key === 'status') {
          result = filteredData.filter(
            (user: User) =>
              user.status.toLocaleLowerCase() ===
              options[key]?.toLocaleLowerCase()
          );
        } else {
          result = filteredData.filter((user: User) =>
            user[key]
              .toLowerCase()
              .trim()
              .includes(options[key]!.toLowerCase().trim())
          );
        }

        filteredData = result; // Update filteredData for subsequent filters
      }
    }

    setApiData(result);
  };

  return (
    <ApiContext.Provider
      value={{ apiData, fetchData, filterData, filterDataByOptions }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext) as ApiContextType;
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

export default ApiContext;
