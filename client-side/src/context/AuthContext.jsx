import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Login user
  async function login(userName, password) {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      if (!response.ok) {
        setErrorMessage("Invalid credentials.");
        return false;
      }

      const data = await response.json();
      const { token, role } = data;

      if (!token || !role) {
        setErrorMessage("Missing token or role.");
        return false;
      }

      localStorage.setItem("accessToken", token);
      localStorage.setItem("userRole", role);

      setAccessToken(token);
      setUserRole(role);
      setIsAuthenticated(true);
      setErrorMessage(null);

      return true;
    } catch (err) {
      setErrorMessage("Login failed.");
      return false;
    }
  }

  // Logout user
  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    setAccessToken(null);
    setUserRole(null);
    setIsAuthenticated(false);
    navigate("/login");
  }

  // Authenticated fetch
  async function authFetch(url, options = {}) {
    const token = localStorage.getItem("accessToken");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      logout();
      throw new Error("Unauthorized. Logged out.");
    }

    return response;
  }

  // Restore session on refresh
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");

    if (token && role) {
      setAccessToken(token);
      setUserRole(role);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        accessToken,
        login,
        logout,
        authFetch,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
