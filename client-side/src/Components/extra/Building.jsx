import { useState, useEffect } from "react";

function Building() {
  const [apartmentComplexId, setApartmentComplexId] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [apartmentComplexes, setApartmentComplexes] = useState([]);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/apartmentComplex")
      .then((res) => res.json())
      .then((data) => setApartmentComplexes(data))
      .catch(() =>
        setError("Failed to load apartment complexes. Please try again.")
      );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    const complexId = apartmentComplexId;
    // const trimmedBuildingNumber = buildingNumber.trim();

    if (!complexId || !buildingNumber) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/building", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          complexId,
          buildingNumber: buildingNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create building");
      } else {
        setSuccess("✅ Building created successfully");
        setBuildingNumber("");
        setApartmentComplexId("");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2>Create Building</h2>
      <form onSubmit={handleSubmit}>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}

        <label>
          Apartment Complex:
          <select
            value={apartmentComplexId}
            onChange={(e) => setApartmentComplexId(e.target.value)}
          >
            <option value="">-- Select Apartment Complex--</option>
            {apartmentComplexes.map((complex) => (
              <option key={complex.id} value={complex.id}>
                {complex.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Building Number:
          <input
            type="text"
            value={buildingNumber}
            onChange={(e) => setBuildingNumber(Number(e.target.value))}
          />
        </label>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Building;
