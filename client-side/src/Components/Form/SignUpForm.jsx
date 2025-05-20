import { useEffect, useState } from "react";
import "./SignUpForm.css";
function SignUpForm() {
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

    try {
      const response = await fetch("https://your-api-endpoint.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          userName,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      setSuccess("User created successfully!");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="signUpFromContainer">
      <form className="signUpFrom" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>

        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password
          <input type="password" value={password} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUpForm;
