// src/Context/AuthContext.tsx
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  role: string | null;
  login: (user: { nombreUsuario: string, rol: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem('user'));
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).nombreUsuario : null
  );
  const [role, setRole] = useState<string | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).rol : null
  );

  const login = (user: { nombreUsuario: string, rol: string }) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUsername(user.nombreUsuario);
    setRole(user.rol);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, role, login, logout }}>
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
