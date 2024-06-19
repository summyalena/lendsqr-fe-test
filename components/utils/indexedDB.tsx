import { openDB, DBSchema, IDBPDatabase } from 'idb';

export interface User {
  name: string;
  username: string;
  password: string;
}

interface MyDB extends DBSchema {
  users: {
    key: string;
    value: User;
  };
}

const DB_NAME = 'signup-form';
const DB_VERSION = 1;

const initializeDB = async (): Promise<IDBPDatabase<MyDB>> => {
  try {
    const db = await openDB<MyDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        db.createObjectStore('users', { keyPath: 'username' });
      },
    });
    return db;
  } catch (error) {
    console.error('Error initializing IndexedDB:', error);
    throw error;
  }
};

const addUser = async (userData: User): Promise<void> => {
  try {
    const db = await initializeDB();
    await db.add('users', userData);
    console.log('Data stored in IndexedDB successfully.');
  } catch (error) {
    console.error('Error storing data in IndexedDB:', error);
    throw error;
  }
};

const getUserByUsername = async (username: string): Promise<User | undefined> => {
  try {
    const db = await initializeDB();
    return await db.get('users', username);
  } catch (error) {
    console.error('Error fetching user data from IndexedDB:', error);
    throw error;
  }
};

const getUsernameFromDB = async (): Promise<string | undefined> => {
  try {
    const db = await initializeDB();
    const allUsers = await db.getAll('users');
    // Assuming you have some logic to determine the currently logged-in user
    // You need to replace this with actual logic to retrieve the correct username
    return allUsers.length > 0 ? allUsers[0].username : undefined;
  } catch (error) {
    console.error('Error fetching username from IndexedDB:', error);
    throw error;
  }
};

export { initializeDB, addUser, getUserByUsername, getUsernameFromDB };
