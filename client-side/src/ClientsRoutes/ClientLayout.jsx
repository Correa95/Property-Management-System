// import { Outlet } from "react-router-dom";
import ClientDashBoard from "./ClientDashBoard";
import ClientNavBar from "./ClientNavBar";
function ClientLayout() {
  return (
    <div>
      <h2>Client Portal</h2>
      <ClientNavBar />
      <ClientDashBoard />
    </div>
  );
}

export default ClientLayout;
