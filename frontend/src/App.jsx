import Homepage from "./pages/Homepage";
import PropTypes from "prop-types";
import "./App.css";

function App({ loggedIn, logIn }) {
  return (
    <>
      <Homepage loggedIn={loggedIn} logIn={logIn} />
    </>
  );
}

App.propTypes = {
  loggedIn: PropTypes.bool,
  logIn: PropTypes.func.isRequired,
};

export default App;
