import { useEffect, useState } from "react";
import "./LeaseForm.css";

function Lease() {
  const [apartments, setApartments] = useState([]);
  const [tenants, setTenants] = useState([]);

  const [apartmentId, setApartmentId] = useState("");
  const [tenantId, setTenantId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rent, setRent] = useState("");
  const [deposit, setDeposit] = useState("");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const apartmentResult = await fetch(
          `${import.meta.env.VITE_API_URL}api/v1/apartment`
        );
        const tenantResult = await fetch(
          `${import.meta.env.VITE_API_URL}api/v1/tenant`
        );

        setApartments(await apartmentResult.json());
        setTenants(await tenantResult.json());
      } catch (error) {
        setError("Failed to load apartments or tenants.", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    if (
      !apartmentId ||
      !tenantId ||
      !startDate ||
      !endDate ||
      !rent ||
      !deposit
    ) {
      setError("All fields are required.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}api/v1/lease`,
        {
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
        }
      );

      if (response.ok) {
        setSuccess("Lease created successfully!");
        setApartmentId("");
        setTenantId("");
        setStartDate("");
        setEndDate("");
        setRent("");
        setDeposit("");
      } else {
        const result = await response.json();
        setError(result.error || "Failed to create lease.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p>Loading lease form...</p>;

  return (
    <div className="leaseFormContainer">
      <form className="leaseForm" onSubmit={handleSubmit}>
        {success && <p className="successMessage">{success}</p>}
        <div className="apartmentInfo">
          <label>
            Apartment:
            <select
              value={apartmentId}
              onChange={(e) => setApartmentId(e.target.value)}
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
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
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
            />
          </label>
          <label>
            End Date
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
            />
          </label>
          <label>
            Security Deposit
            <input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
          </label>
        </div>

        <div className="btnLease">
          <button
            type="submit"
            className="btnLeaseSubmit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>

        {error && <p className="errorMessage">{error}</p>}
      </form>
    </div>
  );
}

export default Lease;
