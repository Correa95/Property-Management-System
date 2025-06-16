// import NavigationButton from "../NavigationBars/NavigationButton";
import "./Tenants.css";
import { useNavigate } from "react-router-dom";
function Tenants() {
  const navigate = useNavigate();
  return (
    <div className="newTenantContainer">
      <h2 className="tenantList">Tenant List</h2>
      <div className="createBtn">
        <button
          className="createTenantBtn"
          onClick={() => navigate("/tenantForm")}
        >
          Create Tenant
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Maria</td>
            <td>Lopez</td>
            <td>maria.lopez@example.com</td>
            <td>(555) 123-4567</td>
            <td>1990-04-15</td>
          </tr>
          <tr>
            <td>2</td>
            <td>James</td>
            <td>Nguyen</td>
            <td>j.nguyen@example.com</td>
            <td>(555) 987-6543</td>
            <td>1985-09-28</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Asha</td>
            <td>Patel</td>
            <td>asha.patel@example.com</td>
            <td>(555) 111-2222</td>
            <td>1992-12-03</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Tenants;
