import { Outlet } from "react-router-dom";
import SideBar from "./Components/NavigationBars/SideBar";
import "./App.css";

export default function AppLayout() {
  return (
    <div className="app">
      <aside className="side">
        <SideBar />
      </aside>
      <div className="mainContent">
        <Outlet />
        <div className="footer">
          © 2025 Code Breakthrough Mentorship Program – Property Management
          Services
        </div>
      </div>
    </div>
  );
}
