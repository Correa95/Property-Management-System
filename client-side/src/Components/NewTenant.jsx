import "./NewTenant.css";

function NewTenant() {
  return (
    <div className="newTenantContainer">
      <h1 className="addTenantHeader">ADD NEW TENANT</h1>
      <form className="tenantDetail">
        <h1>Tenant Detail</h1>
        <label>
          First Name:
          <input type="text" />
        </label>
        <label>
          Last Name:
          <input type="text" />
        </label>
        <label>
          Phone Number:
          <input type="text" />
        </label>
        <label>
          Email :
          <input type="email" />
        </label>
        <label>
          unit Number:
          <input type="text" />
        </label>
        <label>
          Building Number :
          <input type="text" />
        </label>
      </form>

      <form className="tenantPayment">
        <h1>Payment Details</h1>
        <label>
          <label>
            Deposit Amount:
            <input type="text" />
          </label>
          <label>
            Monthly Rent:
            <input type="text" />
          </label>
          <label>
            Start Date:
            <input type="date" />
          </label>
          <label>
            End Date:
            <input type="date" />
          </label>
        </label>
      </form>
    </div>
  );
}

export default NewTenant;
