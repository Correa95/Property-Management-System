import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  async function login(username, password) {
    try {
      const response = await fetch(`${process.env.API_URL}api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setErrorMessage("Invalid credentials.");
        return null;
      }

      const data = await response.json();
      console.log("Login API response:", data);

      const { token, user } = data;

      if (!token || !user?.role) {
        setErrorMessage("Missing token or role.");
        return null;
      }

      localStorage.setItem("accessToken", token);
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("firstName", user.firstName);
      localStorage.setItem("lastName", user.lastName);

      setAccessToken(token);
      setUserRole(user.role);
      setUser(user);
      setIsAuthenticated(true);
      setErrorMessage(null);

      return user.role;
    } catch (errorMessage) {
      setErrorMessage(errorMessage, "Login failed.");
      return null;
    }
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    setAccessToken(null);
    setUserRole(null);
    setIsAuthenticated(false);
    navigate("/login");
  }

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

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");

    if (token && role && firstName && lastName) {
      setAccessToken(token);
      setUserRole(role);
      setUser({ firstName, lastName });
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        accessToken,
        user,
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
