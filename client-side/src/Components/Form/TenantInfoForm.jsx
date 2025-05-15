import "./TenantInfoForm.css";
function TenantInfoForm() {
  return (
    <div className="tenantInfoFormContainer">
      <form className="newTenantForm">
        <div className="names">
          <label>
            First Name:
            <input type="text" />
          </label>
          <label>
            Last Name:
            <input type="text" />
          </label>
        </div>
        <div className="contacts">
          <label>
            Phone Number:
            <input type="text" />
          </label>
          <label>
            Email :
            <input type="email" />
          </label>
        </div>
        <div className="unitInfo">
          <label>
            Date Of Birth:
            <input type="date" />
          </label>
          <button className="btnSubmit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default TenantInfoForm;
