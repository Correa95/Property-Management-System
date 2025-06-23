import { FiMessageSquare, FiBell } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "./NavBar.css";
import { useEffect, useState } from "react";

function NavBar() {
  const [tenants, setTenants] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const firstInitial = user?.firstName?.[0]?.toUpperCase() || "";
  const lastInitial = user?.lastName?.[0]?.toUpperCase() || "";
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/tenant")
      .then((res) => res.json())
      .then((data) => setTenants(data))
      .catch((error) => console.log("Fail to fetch Tenant", error));
  }, []);
  const filteredTenants = tenants.filter((tenant) => {
    const fullName = `${tenant.firstName} ${tenant.lastName}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      tenant.phoneNumber?.includes(search)
    );
  });
  return (
    <nav className="navBarContainer">
      <div className="navBar">
        <div className="search">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="searchInput"
          />
          {search && (
            <div className="searchResults">
              {filteredTenants.length > 0 ? (
                filteredTenants.map((tenant) => (
                  <div key={tenant.id} className="searchResultItem">
                    {tenant.firstName} {tenant.lastName} {tenant.phoneNumber}
                  </div>
                ))
              ) : (
                <div className="noResults">No matching tenant found.</div>
              )}
            </div>
          )}
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
