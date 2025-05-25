import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AppLayout from "./AppLayout";
import OverView from "./Components/PageLayouts/OverView";
import Calender from "./Components/PageLayouts/Calender";
import NewTenant from "./Components/PageLayouts/NewTenant";
import Maintenance from "./Components/Maintenance";
import TenantScreening from "./Components/PageLayouts/TenantScreening";
import MonthlyStatement from "./Components/MonthlyStatement";
import Documents from "./Components/PageLayouts/Documents";
import Units from "./Components/PageLayouts/Units";
import SignUpForm from "./Components/Form/SignUpForm";
import LoginForm from "./Components/Form/LogInForm";
import RecentTransaction from "./Components/RecentTransactions";

function App() {
  const { isAuthenticated } = useAuth();
  // Show only the login page until we’re authenticated
  if (!isAuthenticated) return <LoginForm />;
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signUp" element={<SignUpForm />} />
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginForm /> : <Navigate to="/" />}
      />
      <Route
        path="/signUp"
        element={!isAuthenticated ? <SignUpForm /> : <Navigate to="/" />}
      />

      {isAuthenticated && (
        <Route path="/" element={<AppLayout />}>
          <Route index element={<OverView />} />
          <Route path="/units" element={<Units />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/recentTransaction" element={<RecentTransaction />} />
          <Route path="/newTenant" element={<NewTenant />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/tenantScreening" element={<TenantScreening />} />
          <Route path="/monthlyStatement" element={<MonthlyStatement />} />
          <Route path="/documents" element={<Documents />} />
        </Route>
      )}
      <Route
        path="*"
        // element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
      />
    </Routes>
  );
}
export default App;
