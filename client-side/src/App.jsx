import { Routes, Route } from "react-router-dom";
import SideBar from "./Components/SideBar";
import OverView from "./Components/OverView";
import Calender from "./Components/Calender";
import LeaseManagement from "./Components/LeaseManagement";
import NewTenant from "./Components/NewTenant";
import ExtendLease from "./Components/ExtendLease";
import Maintenance from "./Components/Maintenance";
import TenantScreening from "./Components/TenantScreening";
import MonthlyStatement from "./Components/MonthlyStatement";
import Documents from "./Components/Documents";
import Units from "./Components/Units";
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <aside className="side">
          <SideBar />
        </aside>
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<OverView />} />

            <Route path="/units" element={<Units />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="/leaseManagement" element={<LeaseManagement />} />
            <Route path="/newTenant" element={<NewTenant />} />
            <Route path="/extendLease" element={<ExtendLease />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/tenantScreening" element={<TenantScreening />} />
            <Route path="/monthlyStatement" element={<MonthlyStatement />} />
            <Route path="/documents" element={<Documents />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
