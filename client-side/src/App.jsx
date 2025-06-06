import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AppLayout from "./AppLayout";
import OverView from "./Components/PageLayouts/OverView";
import Calender from "./Components/PageLayouts/Calender";
import NewTenant from "./Components/PageLayouts/NewTenant";
import Maintenance from "./Components/PageLayouts/Maintenance";
import TenantScreening from "./Components/PageLayouts/TenantScreening";
import MonthlyStatement from "./Components/PageLayouts/MonthlyStatement";
import Documents from "./Components/PageLayouts/Documents";
import Units from "./Components/PageLayouts/Units";
import SignUpForm from "./Components/Form/SignUpForm";
import LoginForm from "./Components/Form/LogInForm";
import ClientLayout from "./ClientsRoutes/ClientLayout";
import ClientDashboard from "./ClientRoutes/ClientDashboard";

function App() {
  const { isAuthenticated, userRole } = useAuth();
  const isManager = userRole === "manager";
  const isAdmin = userRole === "Admin";
  const isClient = userRole === "Client";

  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />}
      />
      <Route
        path="/signUp"
        element={!isAuthenticated ? <SignUpForm /> : <Navigate to="/" />}
      />
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
            path="newTenant"
            element={isAdmin || isManager ? <NewTenant /> : <Navigate to="/" />}
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
            element={isManager ? <Employee /> : <Navigate to="/" />}
          />
          <Route
            path="payroll"
            element={isManager ? <Payroll /> : <Navigate to="/" />}
          />
        </Route>
      )}
      {isAuthenticated && isClient && (
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<ClientDashboard />} />
        </Route>
      )}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
      />
    </Routes>
  );
}
export default App;
