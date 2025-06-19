import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdCalendarToday,
  MdBuild,
  MdInsertDriveFile,
  MdHelpOutline,
  MdSettings,
  MdLogout,
  MdPerson,
  MdAttachMoney,
} from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { FaBuilding, FaUserPlus, FaUserCheck } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import "./SideBar.css";

function SideNavBar() {
  const { logout } = useAuth();
  return (
    <nav className="sideBar">
      <header className="header">
        <div className="logo">LUWOUSE</div>
      </header>

      <div className="navContent">
        <ul>
          <li>
            <Link to="/">
              <MdDashboard className="icon" />
              OVERVIEW
            </Link>
          </li>

          <li>
            <Link to="units">
              <FaBuilding className="icon" />
              UNITS
            </Link>
          </li>
          {/* <li>
            <Link to="payment">
              <FaBuilding className="icon" />
              PAYMENT
            </Link>
          </li> */}
          <li>
            <Link to="calender">
              <MdCalendarToday className="icon" />
              CALENDER
            </Link>
          </li>
          <li>
            <Link to="tenants">
              <FaUserPlus className="icon" />
              TENANTS
            </Link>
          </li>
          <li>
            <Link to="maintenance">
              <MdBuild className="icon" />
              MAINTENANCE
            </Link>
          </li>
          {/* <li>
            <Link to="tenantScreening">
              <FaUserCheck className="icon" />
              TENANT SCREENING
            </Link>
          </li> */}
          <li>
            <Link to="monthlyStatement">
              <HiOutlineDocumentReport className="icon" />
              MONTHLY STATEMENT
            </Link>
          </li>
          <li>
            <Link to="documents">
              <MdInsertDriveFile className="icon" />
              DOCUMENTS
            </Link>
          </li>
          <li>
            <Link to="employee">
              <MdPerson className="icon" />
              EMPLOYEES
            </Link>
          </li>
          <li>
            <Link to="payroll">
              <MdAttachMoney className="icon" />
              PAYROLL
            </Link>
          </li>
        </ul>
      </div>

      <div className="help">
        <button>
          <MdHelpOutline className="icon" />
          Help
        </button>
        <button>
          <MdSettings className="icon" />
          Setting
        </button>
        <button onClick={logout}>
          <MdLogout className="icon" />
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default SideNavBar;
