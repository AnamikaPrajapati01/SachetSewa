import React, { createContext, useContext, useState } from "react";

export interface User {
  email: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // In-memory state only. Never persisted to localStorage or sessionStorage.
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulate brief network latency for mock auth
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Basic synthetic check
    if (!email || !email.includes("@")) {
      return false;
    }

    setUser({ email });
    return true;
  };

  const register = async (email: string, _password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!email || !email.includes("@")) {
      return false;
    }

    setUser({ email });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

