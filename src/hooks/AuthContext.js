import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));

  const login = (token, rol) => {
    localStorage.setItem("token", token);
    localStorage.setItem("rol", rol);
    setIsLogged(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
