import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AppLayout from "./AppLayout";
import OverView from "./Components/PageLayouts/OverView";
import Calender from "./Components/PageLayouts/Calender";
import Tenants from "./Components/PageLayouts/Tenants";
import TenantForm from "./Components/Form/TenantForm";
import Maintenance from "./Components/PageLayouts/Maintenance";
import TenantScreening from "./Components/PageLayouts/TenantScreening";
import MonthlyStatement from "./Components/PageLayouts/MonthlyStatement";
import Documents from "./Components/PageLayouts/Documents";
import Units from "./Components/PageLayouts/Units";
import SignUpForm from "./Components/Form/SignUpForm";
import LoginForm from "./Components/Form/LogInForm";
import ClientLayout from "./ClientsRoutes/ClientLayout";
import ClientDashBoard from "./ClientsRoutes/ClientDashBoard";
import Payroll from "./Components/PageLayouts/Payroll";
import Employees from "./Components/PageLayouts/Employees";

function App() {
  const { isAuthenticated, userRole } = useAuth();

  const normalizedRole = userRole?.toLowerCase() || "";

  const isManager = normalizedRole === "manager";
  const isAdmin = normalizedRole === "admin";
  const isClient = normalizedRole === "client";

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />}
      />
      <Route
        path="/signUp"
        element={!isAuthenticated ? <SignUpForm /> : <Navigate to="/" />}
      />

      {/* Protected routes for Admin and Manager */}
      {isAuthenticated && !isClient && (
        <Route path="/" element={<AppLayout />}>
          <Route index element={<OverView />} />
          <Route
            path="units"
            element={isAdmin || isManager ? <Units /> : <Navigate to="/" />}
          />
          <Route
            path="calender"
            element={isAdmin || isManager ? <Calender /> : <Navigate to="/" />}
          />
          <Route
            path="tenants"
            element={isAdmin || isManager ? <Tenants /> : <Navigate to="/" />}
          />
          <Route
            path="tenantForm"
            element={
              isAdmin || isManager ? <TenantForm /> : <Navigate to="/" />
            }
          />
          <Route
            path="maintenance"
            element={
              isAdmin || isManager ? <Maintenance /> : <Navigate to="/" />
            }
          />
          <Route
            path="tenantScreening"
            element={
              isAdmin || isManager ? <TenantScreening /> : <Navigate to="/" />
            }
          />
          <Route
            path="monthlyStatement"
            element={
              isAdmin || isManager ? <MonthlyStatement /> : <Navigate to="/" />
            }
          />
          <Route
            path="documents"
            element={isAdmin || isManager ? <Documents /> : <Navigate to="/" />}
          />
          <Route
            path="employee"
            element={isManager ? <Employees /> : <Navigate to="/" />}
          />
          <Route
            path="payroll"
            element={isManager ? <Payroll /> : <Navigate to="/" />}
          />
        </Route>
      )}

      {/* Protected routes for Client */}
      {isAuthenticated && isClient && (
        <Route path="/client" element={<ClientLayout />}>
          <Route index element={<ClientDashBoard />} />
        </Route>
      )}

      {/* Catch all - redirect */}
      <Route
        path="*"
        element={
          <Navigate
            to={isAuthenticated ? (isClient ? "/client" : "/") : "/login"}
          />
        }
      />
    </Routes>
  );
}

export default App;
