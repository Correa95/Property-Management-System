import { useState, useEffect } from "react";

function Apartment() {
  const [complexes, setComplexes] = useState([]);
  const [buildings, setBuildings] = useState([]);

  const [complexId, setComplexId] = useState("");
  const [buildingId, setBuildingId] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [numBedrooms, setNumBedrooms] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/apartmentComplex")
      .then((res) => res.json())
      .then(setComplexes)
      .catch(() => setError("Failed to load apartment complexes"));

    fetch("http://localhost:3000/api/v1/building")
      .then((res) => res.json())
      .then(setBuildings)
      .catch(() => setError("Failed to load buildings"));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setIsLoading(true);

    if (
      !complexId ||
      !buildingId ||
      !unitNumber ||
      !rentAmount ||
      !numBedrooms ||
      !squareFootage
    ) {
      setError("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/apartment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          complexId,
          buildingId,
          unitNumber,
          rentAmount: parseFloat(rentAmount),
          numBedrooms: parseInt(numBedrooms),
          squareFootage: parseInt(squareFootage),
          isAvailable,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create apartment");
      } else {
        setSuccess("✅ Apartment created successfully");
        // Reset form
        setComplexId("");
        setBuildingId("");
        setUnitNumber("");
        setRentAmount("");
        setNumBedrooms("");
        setSquareFootage("");
        setIsAvailable(true);
      }
    } catch (error) {
      setError(error.message, "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2>Create Apartment</h2>

      <form onSubmit={handleSubmit}>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <label>
          Apartment Complex:
          <select
            value={complexId}
            onChange={(e) => setComplexId(e.target.value)}
          >
            <option value="">-- Select Complex --</option>
            {complexes.map((complex) => (
              <option key={complex.id} value={complex.id}>
                {complex.name}
              </option>
            ))}
          </select>
        </label>

        <br />

        <label>
          Building:
          <select
            value={buildingId}
            onChange={(e) => setBuildingId(e.target.value)}
          >
            <option value="">-- Select Building --</option>
            {buildings
              .filter((b) => b.complexId === complexId)
              .map((building) => (
                <option key={building.id} value={building.id}>
                  Building {building.buildingNumber}
                </option>
              ))}
          </select>
        </label>

        <br />

        <label>
          Unit Number:
          <input
            type="text"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
          />
        </label>

        <br />

        <label>
          Rent Amount:
          <input
            type="number"
            step="0.01"
            value={rentAmount}
            onChange={(e) => setRentAmount(e.target.value)}
          />
        </label>

        <br />

        <label>
          Bedrooms:
          <input
            type="number"
            value={numBedrooms}
            onChange={(e) => setNumBedrooms(e.target.value)}
          />
        </label>

        <br />

        <label>
          Square Footage:
          <input
            type="number"
            value={squareFootage}
            onChange={(e) => setSquareFootage(e.target.value)}
          />
        </label>

        <br />

        <label>
          Available:
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
        </label>

        <br />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Create Apartment"}
        </button>
      </form>
    </div>
  );
}

export default Apartment;
