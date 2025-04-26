import { useLocation, useParams } from "react-router-dom";
import "../styles/result.css";
import HEDERA from "../clients/viemHedera";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";

// Helper function to decode and replace newline characters
const decodeContent = (content) => {
  // Decode any URI encoding issues
  let decodedContent = decodeURIComponent(content);

  // Replace escaped newlines with actual newlines for Markdown
  decodedContent = decodedContent.replace(/\\n/g, "\n");

  return decodedContent;
};

const Result = ({ getAllFiles, address }) => {
  const { fileId } = useParams();
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const location = useLocation();
  const { response } = location.state || {};

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

          setMessages(messages);
        } catch (error) {
          console.error("Error in getMessages:", error);
        }
      }
    };

    getMessages();
  }, [address]);

  useEffect(() => {
    // Fetch files once messages are successfully fetched
    const fetchFiles = async () => {
      if (messages.length > 0) {
        try {
          const files = await getAllFiles(messages);
          const selectedFile = files.find((file) => file.fileId === fileId);
          if (selectedFile) {
            setFile(selectedFile);
          }
        } catch (error) {
          console.error("Error fetching files:", error);
        }
      }
    };

    if (fileId) {
      fetchFiles();
    }
  }, [getAllFiles, messages, fileId]);

  return (
    <div className="container result-container">
      <h2>Analysis Result</h2>
      <pre className="json-result">
        {!file && !response && <p>Loading...</p>}
        {!file && <ReactMarkdown>{response}</ReactMarkdown>}
        {file && (
          <ReactMarkdown>
            {decodeContent(file.content.slice(1, -1))}
          </ReactMarkdown>
        )}
      </pre>
    </div>
  );
};

Result.propTypes = {
  getAllFiles: PropTypes.func.isRequired,
  address: PropTypes.string,
};

export default Result;
