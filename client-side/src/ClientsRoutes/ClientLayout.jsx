import "./ClientLayout.css";
import ClientNavBar from "./ClientNavBar";
import ClientDashBoard from "./ClientDashBoard";
function ClientLayout() {
  return (
    <div className="layout">
      <h2>Client Portal</h2>
      <ClientNavBar />
      <ClientDashBoard />
    </div>
  );
}

export default ClientLayout;
