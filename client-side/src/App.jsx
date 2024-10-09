import { Routes, Route } from "react-router-dom";
import Overview from "./Components/Overview";
import Calender from "./Components/Calender";
import Tasks from "./Components/Tasks";
import Todo from "./Components/Todo";
import LeaseManagement from "./Components/LeaseManagement";
import NewTenant from "./Components/NewTenant";
import ExtendLease from "./Components/ExtendLease";
import Maintenance from "./Components/Maintenance";
import TenantScreening from "./Components/TenantScreening";
import SideBar from "./Components/SideBar";
import NavBar from "./Components/NavBar";
import MonthlyStatement from "./Components/MonthlyStatement";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <SideBar />

      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="todo" element={<Todo />} />
        <Route path="leaseManagement" element={<LeaseManagement />} />
        <Route path="newTenant" element={<NewTenant />} />
        <Route path="extendLease" element={<ExtendLease />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="tenantScreening" element={<TenantScreening />} />
        <Route path="reports" element={<MonthlyStatement />} />
      </Routes>
    </>
  );
}

export default App;
