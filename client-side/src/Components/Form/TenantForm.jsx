import { useState } from "react";
import "./TenantForm.css";
function TenantForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  function formatPhoneNumber(value) {
    const cleaned = value.replace(/\D/g, "").slice(0, 10);
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (!match) return "";

    const [, area, prefix, line] = match;

    if (area && !prefix) return `(${area}`;
    if (area && prefix && !line) return `(${area}) ${prefix}`;
    if (area && prefix && line) return `(${area}) ${prefix}-${line}`;
    return "";
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!firstName || !lastName || !phoneNumber || !email || !dateOfBirth) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/tenant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          dateOfBirth: new Date(dateOfBirth),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Server error:", data.error);
        setError(data.error);
      } else {
        setSuccess("Tenant created successfully!");
        console.log("Success:", data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      setLastName("");
      setFirstName("");
      setPhoneNumber("");
      setEmail("");
      setDateOfBirth("");
    }
  }

  return (
    <div className="tenantInfoFormContainer">
      <form className="newTenantForm" onSubmit={handleSubmit}>
        <h1 className="tenantTitle">Tenant Information</h1>
        {success && <p className="successMessage">{success}</p>}
        <div className="names">
          <label>
            First Name:
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Last Name:
            <input
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div className="contacts">
          <label>
            Email :
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Phone Number:
            <input
              placeholder="(555) 000 1111"
              type="tel"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(formatPhoneNumber(e.target.value))
              }
            />
          </label>
        </div>
        <div className="unitInfo">
          <label>
            Date Of Birth:
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </label>
          {error && <p className="errorMessage">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TenantForm;
