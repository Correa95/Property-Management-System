// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  async function login(userName, password) {
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      const data = await response.json();
      const token = data?.token;
      const role = data?.role;

      if (!token || !role) throw new Error("Token or role not received");
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setIsAuthenticated(true);
      setUserRole(role);

      return true;
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
      return false;
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      setIsAuthenticated(true);
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
  }
  function hasRole(...allowedRoles) {
    return allowedRoles.includes(userRole);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
