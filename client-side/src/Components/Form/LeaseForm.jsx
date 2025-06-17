import { useEffect, useState } from "react";
import "./LeaseForm.css";

function Lease() {
  const [apartments, setApartments] = useState([]);
  const [tenants, setTenants] = useState([]);

  const [apartmentId, setApartmentsId] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rent, setRent] = useState("");
  const [deposit, setDeposit] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/apartment")
      .then((res) => res.json())
      .then(setApartments);

    fetch("http://localhost:3000/api/v1/tenant")
      .then((res) => res.json())
      .then(setTenants);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    if (
      !apartmentId ||
      !tenantId ||
      !startDate ||
      !endDate ||
      !rent ||
      !deposit
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/lease", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apartmentId,
          tenantId,
          startDate,
          endDate,
          monthlyRent: parseFloat(rent),
          securityDeposit: parseFloat(deposit),
        }),
      });

      if (response.ok) {
        setSuccess("Lease created successfully!");
        // Reset form
        setApartmentsId("");
        setTenantId("");
        setStartDate("");
        setEndDate("");
        setRent("");
        setDeposit("");
      } else {
        setError("Failed to create lease.");
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  }

  return (
    <div className="leaseFormContainer">
      <form className="leaseForm" onSubmit={handleSubmit}>
        <div className="apartmentInfo">
          <label>
            Apartment:
            <select
              name="apartmentId"
              value={apartmentId}
              onChange={(e) => setApartmentsId(e.target.value)}
              required
            >
              <option value="">Select Apartment</option>
              {apartments.map((apartment) => (
                <option key={apartment.id} value={apartment.id}>
                  {apartment.unitNumber} -{" "}
                  {apartment.building?.name || "Building"}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tenant:
            <select
              name="tenantId"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
              required
            >
              <option value="">Select Tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.firstName} {tenant.lastName}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="dates">
          <label>
            Start Date
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label>
            End Date
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="amounts">
          <label>
            Monthly Rent
            <input
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              required
            />
          </label>
          <label>
            Security Deposit
            <input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              required
            />
          </label>
        </div>

        <div className="btnLease">
          <button type="submit" className="btnLeaseSubmit">
            Submit
          </button>
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default Lease;
