import "../styles/navbar.css";
import logo from "../assets/logo.png";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Menu from "./Menu";

const Navbar = ({ login, isLoggedIn, balance, user, logout }) => {
  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <header className="navbar-header">
      <nav className="container">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <ul>
          <li>
            <NavLink
              to="/features"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Features
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/how-it-works"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              How it works
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faq"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              FAQ
            </NavLink>
          </li>
          {isLoggedIn && balance && <li className="balance">{balance} HBAR</li>}
          <li>
            {!isLoggedIn && <button onClick={login}>Connect</button>}
            {user && isLoggedIn && !showMenu && (
              <div className="profile-img" onClick={() => setShowMenu(true)}>
                <img src={user.profileImage} alt="user" />
              </div>
            )}
          </li>
          {showMenu && (
            <li>
              <Menu user={user} logout={logout} closeMenu={closeMenu} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  login: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  balance: PropTypes.number,
  user: PropTypes.shape({
    profileImage: PropTypes.string.isRequired,
  }),
  logout: PropTypes.func.isRequired,
};

export default Navbar;
