import { FiMessageSquare, FiBell } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "./NavBar.css";

function NavBar() {
  const { user } = useAuth();
  const firstInitial = user?.firstName?.[0]?.toUpperCase() || "";
  const lastInitial = user?.lastName?.[0]?.toUpperCase() || "";
  return (
    <nav className="navBarContainer">
      <div className="navBar">
        <div className="search">
          <input type="text" placeholder="Search" className="searchInput" />
        </div>

        <div className="notification">
          <button>
            <FiMessageSquare size={20} />
          </button>
          <button>
            <FiBell size={20} />
          </button>
          <div className="profile">
            <div className="profileImage">
              {firstInitial}
              {lastInitial}
            </div>
            {/* <span className="profileName">
              {user?.firstName} {user?.lastName}
            </span> */}
          </div>
        </div>
        {/* </div> */}
      </div>
    </nav>
  );
}

export default NavBar;
