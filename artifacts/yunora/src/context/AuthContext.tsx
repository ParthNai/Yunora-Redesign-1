import { createContext, useContext, useState, useCallback } from "react";

interface User { name: string; email: string; phone?: string }

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false, user: null,
  login: () => {}, logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try { const s = localStorage.getItem("yunora_user"); return s ? JSON.parse(s) : null; }
    catch { return null; }
  });

  const login = useCallback((u: User) => {
    localStorage.setItem("yunora_user", JSON.stringify(u));
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("yunora_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
