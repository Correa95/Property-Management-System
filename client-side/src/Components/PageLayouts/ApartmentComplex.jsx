import { useState } from "react";

function ApartmentComplex() {
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    if (!name || !state || !city || !street || !zipcode) {
      setError("All fields including role are required");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1//apartmentComplex",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name,
            street,
            city,
            state,
            zipcode,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error("❌ Server error:", data.error); // this will now show the exact message
      } else {
        console.log("✅ Success:", data);
      }
      setSuccess("Apartment Complex created");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>
      <form>
        <label onSubmit={handleSubmit}>
          name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Street:
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </label>
        <label>
          city:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          state:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label>
          zipcode:
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(Number(e.target.value))}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </div>
  );
}

export default ApartmentComplex;
