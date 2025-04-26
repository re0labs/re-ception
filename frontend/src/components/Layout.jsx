import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PropTypes from "prop-types";

const Layout = ({ login, isLoggedIn, balance, user, logout }) => {
  return (
    <>
      <Navbar
        login={login}
        isLoggedIn={isLoggedIn}
        balance={balance}
        logout={logout}
        user={user}
      />
      <Outlet />
      <Footer />
    </>
  );
};

Layout.propTypes = {
  login: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  balance: PropTypes.number,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

export default Layout;
