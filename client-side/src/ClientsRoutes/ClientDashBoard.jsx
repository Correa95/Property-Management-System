import { useNavigate } from "react-router-dom";
import "./ClientDashboard.css";
function ClientDashBoard() {
  const navigate = useNavigate();
  return (
    <div className="clientDashboardContainer">
      <div className="dashBoard">Message</div>
      <div className="dashBoard">Maintenance Request</div>
      <div className="dashBoard" onClick={() => navigate("/clientPaymentForm")}>
        Rent Payment
      </div>
      <div className="dashBoard">Payment History</div>
    </div>
  );
}

export default ClientDashBoard;
