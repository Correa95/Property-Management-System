import { useState, useEffect } from "react";
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
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // ✅ Get the real CSRF token from cookies
    // const csrftoken = getCookie("csrftoken");

    try {
      const response = await fetch("http://localhost:8000/api/v1/createUser", {
        method: "POST",
        // credentials: "include", // ✅ required
        headers: {
          "Content-Type": "application/json",
          // "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          user_email: email,
          user_name: userName,
          user_password: password,
        }),
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
    }
  };
  // useEffect(() => {
  //   fetch("http://localhost:8000/api/csrf/", {
  //     credentials: "include",
  //   });
  // }, []);

  return (
    <div className="signUpForm">
      <form className="form" onSubmit={handleSubmit}>
        <p>{success}</p>
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
          <input
            type="text"
            className="input"
            placeholder="user name"
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
        <p>{error}</p>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
