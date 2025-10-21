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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/v1/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

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
    } catch (error) {
      setErrorMessage(error.message || "Login failed.");
      return null;
    }
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    setAccessToken(null);
    setUserRole(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
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
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
