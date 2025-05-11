import { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

function SideNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle(item) {
    setIsOpen((prev) => (prev === item ? false : item));
  }
  return (
    <nav className="sideBar">
      <header className="header">
        <h1 className="logo">LUWOUSE</h1>
      </header>

      <div className="navContent">
        <ul className="listItems">
          <li>
            <Link to="/overView">OVERVIEW</Link>
          </li>
          <li>
            <Link to="units" onClick={() => handleToggle("units")}>
              UNITS
            </Link>
            {isOpen === "units" && (
              <ul>
                <li>
                  <Link to="availableUnit">AVAILABLE UNITS</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="calender">CALENDER</Link>
          </li>
          <li>
            <Link
              to="leaseManagement"
              onClick={() => handleToggle("leaseManagement")}
            >
              LEASE MANAGEMENT
            </Link>
            {isOpen === "leaseManagement" && (
              <ul>
                <li>
                  <Link to="newTenant">NEW TENANT</Link>
                </li>
                <li>
                  <Link to="extendLease">EXTEND LEASE</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="maintenance">MAINTENANCE</Link>
          </li>
          <li>
            <Link to="tenantScreening">TENANT SCREENING</Link>
          </li>
          <li>
            <Link
              to="financialReport"
              onClick={() => handleToggle("financialReport")}
            >
              FINANCIAL REPORT
            </Link>
            {isOpen === "financialReport" && (
              <ul>
                <li>
                  <Link to="monthlyStatement">MONTHLY STATEMENT</Link>
                </li>
              </ul>
            )}
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
