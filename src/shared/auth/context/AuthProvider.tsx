import React, { createContext, useState, useContext } from 'react';
import { AuthState } from '../model';

const token = localStorage.getItem('token');

const initialAuthState: AuthState = {
  token,
  isAuthenticated: Boolean(token),
};

const AuthContext = createContext<{
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}>({
  authState: initialAuthState,
  setAuthState: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode,
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState(initialAuthState);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
