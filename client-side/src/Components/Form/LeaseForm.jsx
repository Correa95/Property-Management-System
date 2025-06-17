import { useEffect, useState } from "react";
import "./LeaseForm.css";
import { use } from "react";

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
  // const [formData, setFormData] = useState({
  //   apartmentId: "",
  //   tenantId: "",
  //   startDate: "",
  //   endDate: "",
  //   rent: "",
  //   deposit: "",
  // });

  useEffect(() => {
    // Fetch apartments
    fetch("http://localhost:3000/api/v1/apartment")
      .then((res) => res.json())
      .then(setApartments);

    // Fetch tenants
    fetch("http://localhost:3000/api/v1/tenant")
      .then((res) => res.json())
      .then(setTenants);
  }, []);

  // const handleChange = (e) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    const response = await fetch("http://localhost:3000/api/v1/lease", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apartmentId: formData.apartmentId,
        tenantId: formData.tenantId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        monthlyRent: parseFloat(formData.rent),
        securityDeposit: parseFloat(formData.deposit),
      }),
    });

    if (response.ok) {
      setSuccess(success.message, "Lease created successfully!");
      setApartmentsId("");
      setDeposit("");
      setTenantId("");
      setStartDate("");
      setEndDate("");
      setRent("");
    } else {
      setError("Failed to create lease.", error.message);
    }
  };

  return (
    <div className="leaseFormContainer">
      <form className="leaseForm" onSubmit={handleSubmit}>
        <div className="apartmentInfo">
          <label>
            Apartment:
            <select
              name="apartmentId"
              value={apartmentId}
              onChange={(e) => e.target.value}
              required
            >
              <option value="">Select Apartment</option>
              {apartments.map((apt) => (
                <option key={apt.id} value={apt.id}>
                  {apt.unitNumber} - {apt.building?.name || "Building"}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tenant:
            <select
              name="tenantId"
              value={tenantId}
              onChange={(e) => e.target.value}
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
            <input type="date" onChange={(e) => e.target.value} />
          </label>
          <label>
            End Date
            <input
              type="date"
              value={endDate}
              onChange={(e) => e.target.value}
            />
          </label>
        </div>
        <div className="amounts">
          <label>
            Monthly Rent
            <input
              type="number"
              value={rent}
              onChange={(e) => e.target.value}
            />
          </label>
          <label>
            Security Deposit
            <input
              type="number"
              value={deposit}
              onChange={(e) => e.Target.value}
            />
          </label>
        </div>
        <div className="btnLease">
          <button type="submit" className="btnLeaseSubmit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Lease;
