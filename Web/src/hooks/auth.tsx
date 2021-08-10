import React, { createContext, useCallback, useState } from 'react';
import { useContext } from 'react';
import api from '../services/apiClient';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@App:token');
    const user = localStorage.getItem('@App:user');

    if( user && token ) {
      return { token, user: JSON.parse(user) }
    }

    return { } as AuthState;
  })

  const signIn = useCallback(async({email, password}) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    localStorage.setItem('@App:token', token);
    localStorage.setItem('@App:user', JSON.stringify(user));

    setData({ token, user });

  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@App:token');
    localStorage.removeItem('@App:user');

    setData({} as AuthState);
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within a AuthProvider.');
  }

  return context;
}
