import { FiMessageSquare, FiBell, FiSearch } from "react-icons/fi";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navBarContainer">
      <div className="navBar">
        <div className="search">
          <FiSearch className="searchIcon" />
          <input type="text" placeholder="Search" className="searchInput" />
        </div>
        {/* <div className="rest"> */}
        <div className="notification">
          <button>
            <FiMessageSquare size={20} />
          </button>
          <button>
            <FiBell size={20} />
          </button>
          <div className="profile">
            <img src="Mathew" alt="User profile" className="profileImage" />
          </div>
        </div>
        {/* </div> */}
      </div>
    </nav>
  );
}

export default NavBar;
