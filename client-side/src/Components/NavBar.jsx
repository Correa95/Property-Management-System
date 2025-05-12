import "./NavBar.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiEnvelopeSimpleLight } from "react-icons/pi";
function NavBar() {
  return (
    <nav className="navBarContainer">
      <div className="navBar">
        <div className="search">
          <input type="text" name="" id="" />
        </div>
        <div className="notification">
          <button>
            <PiEnvelopeSimpleLight />
          </button>
          <button>
            <IoMdNotificationsOutline />
          </button>
        </div>
        <div className="profile">
          <img src="" alt="" />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
