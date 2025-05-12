// import { PiEnvelopeSimpleLight } from "react-icons/pi";
// import { IoMdNotificationsOutline } from "react-icons/io";
import "./NavBar.css";
function NavBar() {
  return (
    <nav className="navBarContainer">
      <div className="navBar">
        <div className="search">
          <input type="text" placeholder="Search" className="searchInput" />
        </div>
        <div className="rest">
          <div className="notification">
            <button>
              env
              {/* <PiEnvelopeSimpleLight /> */}
            </button>
            <button>
              not
              {/* <IoMdNotificationsOutline /> */}
            </button>
          </div>
          <div className="profile">
            <img src="" alt="" />
            <select name="name">
              <option value="">Logout</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
