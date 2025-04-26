import { useNavigate } from "react-router-dom";
import "../styles/banner.css";
import PropTypes from "prop-types";

const Banner = ({ loggedIn }) => {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="container banner">
        <div className="hero-texts">
          <h2>
            Unlock Your Contracts Potential <br />
            With Intelligent <span>Solutions</span>
          </h2>
          <p>
            Transform your smart contract development process with AI-driven
            analysis, automated fixes, <br /> and detailed reports on code
            quality and security.
          </p>
        </div>
        <div className="ctas">
          {!loggedIn && <button>Get Started</button>}
          {loggedIn && (
            <button onClick={() => navigate("upload")}>Upload</button>
          )}
          <button className="cta">How It Works</button>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  loggedIn: PropTypes.bool,
};

export default Banner;
