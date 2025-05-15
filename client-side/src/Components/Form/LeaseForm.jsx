import "./LeaseForm.css";
function Lease() {
  return (
    <div className="leaseFormContainer">
      <form className="leaseForm">
        <div className="apartmentInfo">
          <label>
            Apartment:
            <input type="text" />
          </label>
          <label>
            Tenant:
            <input type="text" />
          </label>
        </div>
        <div className="dates">
          <label>
            Start Date
            <input type="date" />
          </label>
          <label>
            End Date
            <input type="date" />
          </label>
        </div>
        <div className="amounts">
          <label>
            Monthly Rent
            <input type="number" />
          </label>
          <label>
            Security Deposit
            <input type="number" />
          </label>
        </div>
      </form>
      <div className="btnLease">
        <button className="btnLeaseSubmit">Submit</button>
      </div>
    </div>
  );
}

export default Lease;
