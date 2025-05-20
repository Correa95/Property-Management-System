import NavigationButton from "../NavigationBars/NavigationButton";
import "./NewTenant.css";

function NewTenant() {
  return (
    <div className="newTenantContainer">
      <h1 className="addTenantHeader">NEW TENANT</h1>
      <div className="formContainer">
        <NavigationButton />
      </div>
    </div>
  );
}

export default NewTenant;
