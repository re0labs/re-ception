import "../styles/faq.css";

const Faq = () => {
  const faqData = [
    {
      id: "01",
      question: "What is Eth-Various?",
      answer:
        "Eth-Various is a platform that analyzes and identifies problems within smart contract codes in the blockchain ecosystem. It is useful for beginners in Web3 development, developers studying smart contracts, and users curious about whether a smart contract is a scam. The platform offers automated AI-based analysis and provides free all-in-one reports.",
    },
    {
      id: "02",
      question: "Does it support all languages?",
      answer:
        "Currently, Eth-Various supports Solidity. However, future plans include support for additional languages such as JavaScript, Go, and TypeScript.",
    },
    {
      id: "03",
      question: "What makes Eth-Various unique?",
      answer:
        "Eth-Various uses an AI Smart Module with Reinforcement Learning Techniques, specifically Deep Q-Network (DQN), to analyze Solidity contracts. It provides recommendations based on its analysis. The platform uses Flask for API interaction and web services, JSON for data exchange, and Hedera for decentralized data management.",
    },
    {
      id: "04",
      question: "Do I need to know code to use Eth-Various?",
      answer:
        "No, you don’t need to know code to use Eth-Various. The platform allows anyone interested in Web3 and smart contracts to upload their smart contract code and view the analysis results. It's designed to be user-friendly and accessible even for those without coding knowledge.",
    },
    {
      id: "05",
      question: "Is this free?",
      answer:
        "Yes, Eth-Various offers its services for free. It aims to act as a primary firewall to protect users from potential scams in the Web3 space.",
    },
  ];

  return (
    <div className="container faq">
      <h3>FAQs</h3>
      <div className="questions">
        {faqData.map((faq) => (
          <div className="faq-item" key={faq.id}>
            <p>{faq.id}</p>
            <details>
              <summary>
                <h4>{faq.question}</h4>
              </summary>
              <p>{faq.answer}</p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
