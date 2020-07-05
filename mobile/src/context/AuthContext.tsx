import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface Credenctials {
  email: string;
  password: string;
}

interface ContextData {
  user: object;
  loading:boolean;
  signIn(crendentials: Credenctials): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<ContextData>({} as ContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function loadStoragedData(): Promise<void> {
         const user = await AsyncStorage.getItem('@gobaber:user');
         const token = await AsyncStorage.getItem('@gobaber:token');

         if(token && user) {
            setData({token, user:JSON.parse(user)});
         }

         setLoading(false)
      }

      loadStoragedData();
   },[]);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    setData({ token, user });

    await AsyncStorage.multiSet([
       ['@gobarber:token', token],
       ['@gobarber:user', JSON.stringify(user)],
    ]);
  }, []);

  const signOut = useCallback(async () => {
   await AsyncStorage.multiRemove([
      '@gobarber:user',
      '@gobarber:token'
   ])

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): ContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('userAuth must be used within a AuthProvider');
  }

  return context;
}
