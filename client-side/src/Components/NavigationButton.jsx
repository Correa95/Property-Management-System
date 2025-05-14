import { useState } from "react";
import TenantInfoForm from "./Form/TenantInfoForm";
import LeaseForm from "./Form/LeaseForm";
import InitialDepositForm from "./Form/InitialDepositForm";
import "./NavigationButton.css";

function NavigationButton() {
  const [activeForm, setActiveForm] = useState(false);

  const handleClick = (formType) => {
    setActiveForm((prev) => (prev === formType ? false : formType));
  };

  return (
    <div className="NavigationWrapper">
      <div className="NavigationButtonContainer">
        <button className="btn" onClick={() => handleClick("tenant")}>
          Add Tenant
        </button>
        <button className="btn" onClick={() => handleClick("lease")}>
          Add Lease
        </button>
        <button className="btn" onClick={() => handleClick("deposit")}>
          Initial Deposit
        </button>
      </div>

      {activeForm === "tenant" && <TenantInfoForm />}
      {activeForm === "lease" && <LeaseForm />}
      {activeForm === "deposit" && <InitialDepositForm />}
    </div>
  );
}

export default NavigationButton;
