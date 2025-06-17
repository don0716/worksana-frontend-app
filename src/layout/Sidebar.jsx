import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { to: "/", label: "Dashboard", icon: "bi-speedometer2" },
    { to: "/project", label: "Project", icon: "bi-folder" },
    { to: "/teams", label: "Teams", icon: "bi-people" },
    { to: "/report", label: "Reports", icon: "bi-bar-chart" },
    // { to: "/setting", label: "Settings", icon: "bi-gear" },
  ];
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "")
  const navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken")
    if(storedToken) {
      setToken(storedToken)
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    setToken("")
    navigate("/login")
  }

  return (
    <div
      className="py-2 px-2 text-light"
      style={{ backgroundColor: "#f3e8ff", minHeight: "100vh" }}
    >
      <div className="text-center">
        <h4 style={{"color": "#6B63FF"}} className="">worksana</h4>
      </div>

      <div className="py-4">
        <ul className="nav flex-column">
          {links.map(({ to, label, icon }) => (
            <li className="nav-item" key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  "nav-link d-flex align-items-center gap-2 " +
                  (isActive
                    ? "bg-lightpurple text-purple rounded px-2 py-1"
                    : "text-secondary")
                }
              >
                <i className={`bi ${icon}`}></i>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {
        token === "" ? "" : (
          <button onClick={handleLogout} className="btn btn-primary btn-sm mx-2">Log out</button>
        )
      }
    </div>
  );
};

export default Sidebar;
