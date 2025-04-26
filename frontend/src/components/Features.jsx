import "../styles/features.css";

const Features = () => {
  return (
    <div className="container features">
      <h3>Elevate your Smart Contracts</h3>
      <div className="row">
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-chart-simple"></i>
          </div>
          <div className="info">
            <h4>Security Analysis</h4>
            <p>
              Detect vulnerabilities and code flaws in your smart contracts to
              ensure robust security.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-code"></i>
          </div>
          <div className="info">
            <h4>Code Improvements</h4>
            <p>
              Apply security patches and optimize performance automatically
              based on analysis.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-bug-slash"></i>
          </div>
          <div className="info">
            <h4>Detailed Reporting</h4>
            <p>
              Get clear, actionable reports with explanations of issues and
              fixes applied.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fa-brands fa-uikit"></i>
          </div>
          <div className="info">
            <h4>User-Friendly Interface</h4>
            <p>
              Simple code upload and real-time feedback for an intuitive user
              experience.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-check-double"></i>
          </div>
          <div className="info">
            <h4>Preliminary Self-Audit</h4>
            <p>
              Allow early detection and resolution of issues before final
              professional audits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
