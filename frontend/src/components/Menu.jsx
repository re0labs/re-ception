import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Menu = ({ user, logout, closeMenu }) => {
  const handleLogout = async () => {
    await logout();
    closeMenu();
  };
  return (
    <div className="menu">
      <ul>
        <li>
          <div className="user-profile" onClick={closeMenu}>
            <div className="names">
              <h5>{user.name}</h5>
              <p>{user.email}</p>
            </div>
            <div className="profile-img">
              <img src={user.profileImage} alt="user" />
            </div>
          </div>
        </li>
        <li>
          <NavLink to="/profile" onClick={closeMenu}>
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/upload" onClick={closeMenu}>
            Upload
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" onClick={closeMenu}>
            Settings
          </NavLink>
        </li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};

Menu.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default Menu;
