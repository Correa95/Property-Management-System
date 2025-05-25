// import { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

function SideNavBar() {
  // const [isOpen, setIsOpen] = useState(null);

  // function handleToggle(item) {
  //   setIsOpen((prev) => (prev === item ? null : item));
  // }
  return (
    <nav className="sideBar">
      <header className="header">
        <h1 className="logo">LUWOUSE</h1>
      </header>

      <div className="navContent">
        <ul>
          <li>
            <Link to="/">OVERVIEW</Link>
          </li>
          <li>
            <li>
              <Link to="units">UNITS</Link>
            </li>
          </li>
          <li>
            <Link to="calender">CALENDER</Link>
          </li>
          <li>
            <Link to="newTenant">NEW TENANT</Link>
          </li>
          <li>
            <Link to="maintenance">MAINTENANCE</Link>
          </li>
          <li>
            <Link to="tenantScreening">TENANT SCREENING</Link>
          </li>
          <li>
            <Link to="monthlyStatement">MONTHLY STATEMENT</Link>
          </li>
          <li>
            <Link to="documents">DOCUMENTS</Link>
          </li>
        </ul>
      </div>

      <div className="help">
        <button>Help</button>
        <button>Setting</button>
        <button>Sign Out</button>
      </div>
    </nav>
  );
}

export default SideNavBar;
