import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./Components/NavigationBars/SideBar";
import "./App.css";

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className={`app ${menuOpen ? "menu-open" : ""}`}>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <aside className={`side ${menuOpen ? "show" : ""}`}>
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
