import "./ClientLayout.css";
import ClientNavBar from "./ClientNavBar";
import { Outlet } from "react-router-dom"; // ✅ import Outlet

function ClientLayout() {
  return (
    <div className="layout">
      <h2>Client Portal</h2>
      <ClientNavBar />
      <Outlet /> {/* ✅ This renders whatever route is nested */}
    </div>
  );
}

export default ClientLayout;
