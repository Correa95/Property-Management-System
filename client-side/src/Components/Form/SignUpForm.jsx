import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";

// function getCookie(name) {
//   let cookieValue = null;
//   if (document.cookie && document.cookie !== "") {
//     const cookies = document.cookie.split(";");
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i].trim();
//       if (cookie.substring(0, name.length + 1) === name + "=") {
//         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//         break;
//       }
//     }
//   }
//   return cookieValue;
// }

function SignUpForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/csrf/", {
  //     method: "GET",
  //     credentials: "include",
  //   });
  // }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submit triggered");
    setError(null);
    setSuccess(null);

    if (!firstName || !lastName || !email || !role || !userName || !password) {
      setError("All fields including role are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/v1/createUser", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
          username: userName,
          email: email,
          first_name: firstName,
          last_name: lastName,
          password: password,
          role: role,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      setSuccess("User created successfully!");
      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signUpForm">
      <form className="form" onSubmit={handleSubmit}>
        {success && <p className="success">{success}</p>}
        <span className="title">Sign up</span>
        <span className="subtitle">Create a free account with your email.</span>
        <div className="form-container">
          <input
            type="text"
            className="input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <select
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select role</option>
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="text"
            className="input"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
