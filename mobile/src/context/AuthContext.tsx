import React, {
   createContext,
   useCallback,
   useState,
   useContext,
   useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User {
   id: string;
   name: string;
   email: string;
   avatar_url: string;
}

interface AuthState {
   token: string;
   user: User;
}

interface Credenctials {
   email: string;
   password: string;
}

interface ContextData {
   user: User;
   loading: boolean;
   signIn(crendentials: Credenctials): Promise<void>;
   signOut(): void;
   updateUser(user: User): Promise<void>;
}

export const AuthContext = createContext<ContextData>({} as ContextData);

export const AuthProvider: React.FC = ({ children }) => {
   const [data, setData] = useState<AuthState>({} as AuthState);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function loadStoragedData(): Promise<void> {
         const user = await AsyncStorage.getItem('@gobarber:user');
         const token = await AsyncStorage.getItem('@gobarber:token');

         if (token && user) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            setData({ token, user: JSON.parse(user) });
         }

         setLoading(false);
      }

      loadStoragedData();
   }, []);

   const signIn = useCallback(async ({ email, password }) => {
      const response = await api.post('/sessions', {
         email,
         password,
      });

      const { token, user } = response.data;

      setData({ token, user });

      api.defaults.headers.authorization = `Bearer ${token}`;

      await AsyncStorage.multiSet([
         ['@gobarber:token', token],
         ['@gobarber:user', JSON.stringify(user)],
      ]);
   }, []);

   const signOut = useCallback(async () => {
      await AsyncStorage.multiRemove(['@gobarber:user', '@gobarber:token']);

      setData({} as AuthState);
   }, []);

   const updateUser = useCallback(
      async (user: User) => {
         await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

         setData({
            token: data.token,
            user,
         });
      },
      [setData, data.token],
   );

   return (
      <AuthContext.Provider
         value={{ user: data.user, signIn, signOut, updateUser, loading }}
      >
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
