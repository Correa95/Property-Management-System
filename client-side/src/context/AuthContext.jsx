import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  async function login(username, password) {
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Login failed:", errorText);
        setErrorMessage("Invalid credentials or server issue.");
        throw new Error(errorText);
      }

      const data = await response.json();
      const accessToken = data?.access;
      const refreshToken = data?.refresh;
      const role = data?.role;

      if (!accessToken || !refreshToken) {
        setErrorMessage("Authentication failed. Tokens not received.");
        throw new Error("Tokens not received.");
      }

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("role", role);

      setIsAuthenticated(true);
      setAccessToken(accessToken);
      setUserRole(role);

      return true;
    } catch (err) {
      console.error("Login Error:", err.message);
      setIsAuthenticated(false);
      return false;
    }
  }

  async function refreshToken() {
    try {
      const storedRefreshToken = sessionStorage.getItem("refreshToken");
      if (!storedRefreshToken) throw new Error("No refresh token found");

      const response = await fetch(
        "http://localhost:8000/api/v1/token/auth/refresh",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: storedRefreshToken }),
        }
      );

      if (!response.ok) {
        console.error("Token refresh failed, logging out...");
        logout();
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      const newAccessToken = data?.access;

      if (!newAccessToken) throw new Error("Access token not received");

      sessionStorage.setItem("accessToken", newAccessToken);
      setAccessToken(newAccessToken);
      return true;
    } catch (err) {
      console.error("Token Refresh Error:", err.message);
      logout(); // Auto logout on failed refresh
      return false;
    }
  }

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const role = sessionStorage.getItem("role");
    if (token && role) {
      setIsAuthenticated(true);
      setAccessToken(token);
      setUserRole(role);
    }
  }, []);

  function logout() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
    setAccessToken(null);
    setErrorMessage(null);
  }

  function authFetch(url, options = {}) {
    const headers = {
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
      ...options.headers,
    };

    return fetch(url, { ...options, headers }).then(async (response) => {
      if (response.status === 401) {
        const refreshed = await refreshToken();
        if (refreshed) {
          headers["Authorization"] = `Bearer ${sessionStorage.getItem(
            "accessToken"
          )}`;
          return fetch(url, { ...options, headers });
        } else {
          throw new Error("Session expired. Please log in again.");
        }
      }
      return response;
    });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        authFetch,
        userRole,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
