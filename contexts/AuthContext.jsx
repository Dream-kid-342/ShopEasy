import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/config/firebase';
import { adminUsers } from '@/data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const isAdmin = adminUsers.some(admin => admin.email === firebaseUser.email);
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
          isAdmin: isAdmin,
          profileImage: firebaseUser.photoURL
        };
        setUser(userData);
        await storeUser(userData);
      } else {
        setUser(null);
        await removeStoredUser();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const storeUser = async (userData) => {
    try {
      const userString = JSON.stringify(userData);
      if (Platform.OS === 'web') {
        localStorage.setItem('user', userString);
      } else {
        await SecureStore.setItemAsync('user', userString);
      }
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const getStoredUser = async () => {
    try {
      if (Platform.OS === 'web') {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
      } else {
        const userString = await SecureStore.getItemAsync('user');
        return userString ? JSON.parse(userString) : null;
      }
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  };

  const removeStoredUser = async () => {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem('user');
      } else {
        await SecureStore.deleteItemAsync('user');
      }
    } catch (error) {
      console.error('Error removing stored user:', error);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = adminUsers.some(admin => admin.email === email);
      
      const userData = {
        id: result.user.uid,
        email: result.user.email,
        name: result.user.displayName || email.split('@')[0],
        isAdmin: isAdmin,
        profileImage: result.user.photoURL
      };
      
      setUser(userData);
      await storeUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const isAdmin = adminUsers.some(admin => admin.email === email);
      
      const userData = {
        id: result.user.uid,
        email: result.user.email,
        name: name,
        isAdmin: isAdmin,
        profileImage: null
      };
      
      setUser(userData);
      await storeUser(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      await removeStoredUser();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    try {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      await storeUser(updatedUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAdmin: user?.isAdmin || false
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};