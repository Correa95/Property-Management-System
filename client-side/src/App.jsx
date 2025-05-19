import { Routes, Route } from "react-router-dom";
import SideBar from "./Components/SideBar";
import OverView from "./Components/OverView";
import Calender from "./Components/Calender";
import NewTenant from "./Components/NewTenant";
import ExtendLease from "./Components/ExtendLease";
import Maintenance from "./Components/Maintenance";
import TenantScreening from "./Components/TenantScreening";
import MonthlyStatement from "./Components/MonthlyStatement";
import Documents from "./Components/Documents";
import Units from "./Components/Units";
import SignUpForm from "./Components/Form/SignUpForm";
import { useAuth } from "./context/AuthContext";
import "./App.css";

import LoginForm from "./Components/Form/LogInForm";

function App() {
  const { isAuthenticated } = useAuth();
  // Show only the login page until we’re authenticated
  if (!isAuthenticated) return <LoginForm />;
  return (
    <>
      <div className="app">
        <aside className="side">
          <SideBar />
        </aside>
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<OverView />} />
            <Route path="/signUp" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />

            <Route path="/units" element={<Units />} />
            <Route path="/calender" element={<Calender />} />
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
