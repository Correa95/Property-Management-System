import { Router, Route, BrowserRouter } from "react-router-dom";
import Overview from "./Components/Overview";
import Calender from "./Components/Calender";
import Tasks from "./Components/Tasks";
import Todo from "./Components/Todo";
import LeaseManagement from "./Components/LeaseManagement";
import NewTenant from "./Components/NewTenant";
import ExtendLease from "./Components/ExtendLease";
import Maintenance from "./Components/Maintenance";
import TenantScreening from "./Components/TenantScreening";
import Reports from "./Components/Reports";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Route path="/" element={<Overview />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="todo" element={<Todo />} />
        <Route path="leaseManagement" element={<LeaseManagement />} />
        <Route path="newTenant" element={<NewTenant />} />
        <Route path="extendLease" element={<ExtendLease />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="tenantScreening" element={<TenantScreening />} />
        <Route path="reports" element={<Reports />} />
      </Router>
    </BrowserRouter>
  );
}

export default App;
