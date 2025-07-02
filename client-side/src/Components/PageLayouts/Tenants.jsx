import { useEffect, useState } from "react";
import "./Tenants.css";
import { useNavigate } from "react-router-dom";

function Tenants() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [tenants, setTenants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const tenantsPerPage = 15;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/tenant`)
      .then((res) => res.json())
      .then((data) => setTenants(data))
      .catch((err) => {
        console.error("Failed to fetch tenants", error);
        setError(err.message);
      });
  }, []);

  const formatPhoneNumber = (number) => {
    const cleaned = ("" + number).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : number;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  };

  const indexOfLastTenant = currentPage * tenantsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - tenantsPerPage;
  const currentTenants = tenants.slice(indexOfFirstTenant, indexOfLastTenant);
  const totalPages = Math.ceil(tenants.length / tenantsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="newTenantContainer">
      <h2 className="tenantHeader">Tenant List</h2>

      <div className="createBtn">
        <button
          className="createTenantBtn"
          onClick={() => navigate("/tenantForm")}
        >
          Create Tenant
        </button>
      </div>

      <table className="tenantTable">
        <thead className="tenantTableHeader">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {tenants.length === 0 ? (
            <tr>
              <td colSpan="6">You have no tenants available.</td>
            </tr>
          ) : (
            currentTenants.map((tenant, index) => (
              <tr key={tenant.id}>
                <td>{indexOfFirstTenant + index + 1}</td>
                <td>{tenant.firstName}</td>
                <td>{tenant.lastName}</td>
                <td>{tenant.email}</td>
                <td>{formatPhoneNumber(tenant.phoneNumber)}</td>
                <td>{formatDate(tenant.dateOfBirth)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {tenants.length > 0 && (
        <div className="pagination">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Tenants;
