import React, { createContext, useContext, useCallback } from 'react';
import { useState } from 'react';
import ToastContainer from '../components/ToastContainer';
import { v4 } from 'uuid';


interface ToastContextData {
  addToast(toast: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage{
  id: string;
  type : 'success' | 'info' | 'error';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ title, type, description }: Omit<ToastMessage, 'id'> ) => {
    const id = v4();

    console.log(id)

    const toast = {
      id,
      type,
      title,
      description,
    };

    setMessages([...messages, toast]);
  },
  [messages],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast}}>
      {children}
      <ToastContainer messages={messages}/>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if(!context) {
    throw new Error('useToas must be used within a ToastProvider');
  }

  return context;
}
