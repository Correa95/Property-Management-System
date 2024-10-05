// import { useState } from "react";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>;
import Link from "react-router-dom";
import styles from "./SideBar.module.css";

function SideNavBar() {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className={styles.sideBar}>
      <header>
        <h1 className={styles.text}>LUWOUSE</h1>
      </header>

      <ul>
        <li>
          <Link to="/overview">OVERVIEW</Link>
        </li>
        <li>
          <Link to="property">PROPERTY</Link>
        </li>
        <li>
          <Link to="calender">CALENDER</Link>
        </li>
        <li>
          <Link to="tasks">TASKS </Link>
          <ul>
            <li>
              <Link to="todo">TODO</Link>
            </li>
            <li>
              <Link to="element">ELEMENT</Link>
            </li>
          </ul>
        </li>

        <li>
          <Link to="leaseManagement">LEASE MANAGEMENT</Link>
          <ul>
            <li>
              <Link to="newTenant">NEW TENANT</Link>
            </li>
            <li>
              <Link to="extendLease">EXTEND LEASE</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="maintenance">MAINTENANCE</Link>
        </li>
        <li>
          <Link to="tenantScreening">TENANT SCREENING </Link>
        </li>
        <li>
          <a to="reporting">REPORTING</a>
        </li>
      </ul>
    </nav>
  );
}

export default SideNavBar;
