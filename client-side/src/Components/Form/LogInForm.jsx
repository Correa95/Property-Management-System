import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const role = await login(trimmedUsername, trimmedPassword);
    if (!role) {
      setError("Invalid credentials");
    } else {
      if (role === "client") {
        navigate("/client");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div className="loginFormContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <span className="input-span">
          <label className="label">Username</label>
          <input
            placeholder="Enter Your username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </span>
        <span className="input-span">
          <label className="label">Password</label>
          <input
            placeholder="Enter Your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>
        <span className="span"></span>
        <input className="submit" type="submit" value="Log in" />
        <span className="span">
          Don't have an account? <Link to="/signUp">Sign up</Link>
        </span>
        {error && <p className="errorMessage">{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
