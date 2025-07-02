import { FiBell } from "react-icons/fi";
import "./ClientNavBar.css";
import { useAuth } from "./../context/AuthContext";
import { MdLogout } from "react-icons/md";

function ClientNavBar() {
  const { logout, user } = useAuth();

  const first = user?.firstName;
  // const firstInitial = user?.firstName?.[0]?.toUpperCase() || "";
  // const lastInitial = user?.lastName?.[0]?.toUpperCase() || "";
  return (
    // <div className="clientNavBar">
    <div className="clientNav">
      <h1>WelCome {first}</h1>
      <button className="btnIcon">
        <FiBell size={20} className="clientIcon" />
      </button>
      <button onClick={logout} className="btnLogoutIcon">
        <MdLogout className="clientIcon" />
        Sign Out
      </button>
      {/* <div className="profileImage">
        {firstInitial}
        {lastInitial}
      </div> */}
    </div>
    // </div>
  );
}

export default ClientNavBar;
