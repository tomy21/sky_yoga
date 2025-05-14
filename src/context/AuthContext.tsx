import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface jwtPayload {
  exp: number;
  iat: number;
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: jwtPayload | null; // Ganti `any` dengan `jwtPayload | null`
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Tentukan tipe untuk `children` dalam AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<jwtPayload | null>(null); // Ganti `any` dengan `jwtPayload | null`
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get('token');
    
    if (token) {
      try {
        const decoded: jwtPayload = jwtDecode(token); // decode token dengan tipe yang sesuai
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = (token: string) => {
    Cookies.set('token', token, { expires: 7 }); // Cookie expires in 7 days
    const decoded: jwtPayload = jwtDecode(token); // decode token dengan tipe yang sesuai
    setUser(decoded);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
