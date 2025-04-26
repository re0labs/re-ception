import "../styles/profile.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import HEDERA from "../clients/viemHedera";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, address, balance }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 500);
  };

  const getShortenedAddress = (addr) => {
    if (addr && addr.length > 10) {
      return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    }
    return addr;
  };

  useEffect(() => {
    const getMessages = async () => {
      if (address) {
        try {
          // Fetch messages from Hedera
          const response = await HEDERA.fetchMessages();

          // Fetch account data from mirror node
          const accountResponse = await fetch(
            `https://testnet.mirrornode.hedera.com/api/v1/accounts/${address}`,
            { mode: "cors" }
          );

          if (!accountResponse.ok) {
            throw new Error(
              `Account fetch failed: ${accountResponse.statusText}`
            );
          }

          const accountData = await accountResponse.json();

          // Filter messages based on sender
          const messages = response.filter(
            (msg) => msg.sender === accountData.account
          );
          setMessages(messages.reverse());
          setLoading(false);
        } catch (error) {
          console.error("Error in getMessages:", error);
        }
      }
    };

    getMessages();
  }, [address]);

  const handleFileClick = (fileId) => {
    navigate(`/result/${fileId}`);
  };

  return (
    <div className="container profile">
      {!user && <p>Loading...</p>}
      {user && (
        <div className="row">
          <div className="card">
            <img src={user.profileImage} alt="profile" />
            <div className="names">
              <h5>{user.name}</h5>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="card">
            <i className="fa-solid fa-file-invoice"></i>
            <div className="names">
              <h5>Wallet address</h5>
              <div className="w-add">
                <p>{getShortenedAddress(address)}</p>
                <i
                  className={`fa-regular fa-copy copy-icon ${
                    isCopied ? "copied" : ""
                  }`}
                  onClick={copyToClipboard}
                  title={isCopied ? "Copied!" : "Copy to clipboard"}
                ></i>
              </div>
            </div>
          </div>
          <div className="card">
            <i className="fa-solid fa-wallet"></i>
            <div className="names">
              <h5>Balance</h5>
              <p>{balance} HBAR</p>
            </div>
          </div>
        </div>
      )}
      <div className="history">
        <h3>History</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>File Id</th>
              <th>File Name</th>
              <th>Upload Date</th>
            </tr>
          </thead>
          <tbody>
            {!loading && messages.length === 0 && (
              <tr>
                <td colSpan="3">No files uploaded yet</td>
              </tr>
            )}
            {loading && (
              <tr>
                <td colSpan={3}>Loading...</td>
              </tr>
            )}
            {!loading &&
              messages.map((item, index) => (
                <tr key={index} onClick={() => handleFileClick(item.fileId)}>
                  <td>{item.fileId}</td>
                  <td>{item.fileName}</td>
                  <td>{new Date(item.timeStamp).toDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    profileImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  address: PropTypes.string,
  balance: PropTypes.number,
};

export default Profile;
