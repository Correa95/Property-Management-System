// Components/Form/LoginForm.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./LoginForm.css";
function LoginForm() {
  const { login } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signIn = await login(userName, password);
    if (!signIn) setError("Invalid credentials");
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
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
          Don't have an account? <Link to="signUp">Sign up</Link>
        </span>
        {error && <p>{error}</p>}
      </form>
      ;
    </div>
  );
}

export default LoginForm;
