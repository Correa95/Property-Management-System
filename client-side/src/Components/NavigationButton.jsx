import { Link } from "react-router-dom";
import "./NavigationButton.css";
import TenantInfoForm from "./Form/TenantInfoForm";
import LeaseForm from "./Form/LeaseForm";
import InitialDepositForm from "./Form/InitialDepositForm";
function NavigationButton() {
  return (
    <div className="NavigationButtonContainer">
      <button className="btn">
        <Link to="/" element={<TenantInfoForm />}>
          Add Tenant
        </Link>
      </button>
      <button className="btn">
        <Link to="/lease" element={<LeaseForm />}>
          Add Lease
        </Link>
      </button>
      <button className="btn">
        <Link to="/InitialDepositForm" element={<InitialDepositForm />}>
          Initial Deposit
        </Link>
      </button>
    </div>
  );
}

export default NavigationButton;
