import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlinePets } from "react-icons/md"; // Import the icon from react-icons

import axios from "axios";
import _ from "lodash";

const NavBar = (props) => {
  // --------------------------------------------------
  // I) HOOKS AND VARIABLES
  // --------------------------------------------------

  // Destructuring Props
  const { setUser } = props;

  // React Router Hooks - Params and Navigation
  const location = useLocation();
  const navigate = useNavigate();

  // Aux Variables
  let currentView;
  if (location.pathname === "/") currentView = "homePage";
  else if (location.pathname === "/pets/new") currentView = "addPage";
  else if (_.includes(location.pathname, "edit")) currentView = "editPage";
  else if (location.pathname === "/login") currentView = "logRegPage";
  else currentView = "detailsPage";

  // --------------------------------------------------
  // II) HANDLERS AND AUXILIAR FUNCTIONS
  // --------------------------------------------------

  // i) Handlers
  const handleLogout = () => {
    logoutUser();
  };

  // ii) API Calls
  const logoutUser = async () => {
    try {
      await axios.get("http://localhost:8000/api/users/logout",
        { withCredentials: true }
      );
      localStorage.removeItem("user");
      setUser(null)
      navigate("/login")

    } catch (err) {
      console.log("Error: ", err)
    }
  }

  // --------------------------------------------------
  // III) JSX
  // --------------------------------------------------
  return (
    <nav className="navbar navbar-dark bg-secondary">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <MdOutlinePets size={50} className="p-1" />
          <h3 className="mx-3 my-0">Super Pets Website</h3>
        </Link>
        <div className="d-flex ms-auto">
          {/* Link to CreatePage */}
          {currentView !== "logRegPage" && currentView !== "addPage" && (
            <Link
              to="/pets/new"
              className="nav-link text-white fs-5 mx-2 text-decoration-underline"
            >
              New Pet
            </Link>
          )}
          {/* Link to HomePage */}
          {currentView !== "logRegPage" && currentView !== "homePage" && (
            <Link
              to="/"
              className="nav-link text-white fs-5 mx-2 text-decoration-underline"
            >
              Home
            </Link>
          )}
          {/* Button for Logout */}
          {currentView !== "logRegPage" && (
            <button
              className="btn nav-link text-white fs-5 mx-2 text-decoration-underline shadow-none"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
