"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { fetchAuthSession } from "aws-amplify/auth";

interface User {
  email: string;
  name?: string;
  userId?: string;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Fetch current session when app loads
  useEffect(() => {
    async function loadUser() {
      try {
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken?.toString();
        if (idToken) {
          const payload = JSON.parse(atob(idToken.split(".")[1]));
          const email = payload.email || "";
          const name = payload.name || "";
          const userId = payload.sub || "";
          setUser({ email, name, userId, isLoggedIn: true });
        }
      } catch (error) {
        setUser(null); // Not logged in
      }
    }
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
