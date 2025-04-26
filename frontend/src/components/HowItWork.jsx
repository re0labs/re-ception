import "../styles/how.css";

const HowItWorks = () => {
  return (
    <div className="container how">
      <h3>5 Minutes Set-up Process</h3>
      <div className="row">
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-upload"></i>
          </div>
          <div className="info">
            <h4>Upload your contract file</h4>
            <p>
              By providing the link or Contract file to your knowledge base, you
              can transform one chain to other from the code on your contract
              and suggestions for optimization.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-bug"></i>
          </div>
          <div className="info">
            <h4>Easily inspect smart contract code</h4>
            <p>
              Receive code vulnerabilities, automatic corrections, and a
              summarized report with a single upload.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-list-check"></i>
          </div>
          <div className="info">
            <h4>Easy-to-read, summarized reports</h4>
            <p>
              Receive a friendly report that summarizes only the important
              points and is easy to understand and read.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
