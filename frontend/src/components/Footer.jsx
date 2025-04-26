import "../styles/footer.css";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="container footer">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <p>&copy; Footer</p>
      </div>
    </footer>
  );
};

export default Footer;
