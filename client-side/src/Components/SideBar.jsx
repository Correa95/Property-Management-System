import { useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

function SideNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  function handleClose() {
    setIsOpen(!isOpen);
  }
  return (
    <nav className="sideBar">
      <header className="header">
        <h1 className="logo">LUWOUSE</h1>
      </header>

      <ul>
        <li>
          <Link to="/overview">OVERVIEW</Link>
        </li>
        <li>
          <Link to="property" onClick={handleClose}>
            PROPERTY
          </Link>
          {isOpen && (
            <ul>
              <li>
                <Link to="availableUnit">AVAILABLE UNITS</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="tasks" onClick={handleClose}>
            TASKS
          </Link>
          {isOpen && (
            <ul>
              <li>
                <Link to="todo">TODO</Link>
              </li>
              <li>
                <Link to="calender">CALENDER</Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link to="leaseManagement" onClick={handleClose}>
            LEASE MANAGEMENT
          </Link>
          {isOpen && (
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
          <Link to="tenantScreening">TENANT SCREENING </Link>
        </li>
        <li>
          <Link to="financialReport" onClick={handleClose}>
            FINANCIAL REPORT
          </Link>
          {isOpen && (
            <ul>
              <li>
                <Link to="monthlyStatement">MONTHLY STATEMENT</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default SideNavBar;
