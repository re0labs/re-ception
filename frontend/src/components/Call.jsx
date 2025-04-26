import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

const Call = ({ loggedIn, logIn }) => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="call">
        <h3>Ready to Maximize your Support?</h3>
        <p>
          Spend 5 minutes to get a contract code ready that can be used to build
          your next web3 startup.
        </p>
        {!loggedIn && (
          <button className="btn" onClick={logIn}>
            Get Started Now
          </button>
        )}
        {loggedIn && (
          <button className="btn" onClick={() => navigate("/upload")}>
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

Call.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
};

export default Call;
