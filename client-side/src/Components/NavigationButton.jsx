import "./NavigationButton.css";
function NavigationButton() {
  return (
    <div className="NavigationButtonContainer">
      <button className="btn">Add Tenant</button>
      <button className="btn">Add Lease</button>
      <button className="btn">Initial Deposit</button>
    </div>
  );
}

export default NavigationButton;
