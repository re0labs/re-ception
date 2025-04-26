import { createPublicClient, createWalletClient, custom } from "viem";
import { hederaTestnet } from "viem/chains";
import {
  FileCreateTransaction,
  Client,
  PrivateKey,
  Hbar,
  TopicCreateTransaction,
  TopicMessageSubmitTransaction,
  FileContentsQuery,
} from "@hashgraph/sdk";

let topicId = import.meta.env.VITE_TOPIC_ID;

let cachedClient = null;

// Initialize the Hedera client once and reuse it
const getClient = async (provider) => {
  if (!cachedClient) {
    const [myAddress] = await getAccounts(provider);

    const accountResponse = await fetch(
      `https://testnet.mirrornode.hedera.com/api/v1/accounts/${myAddress}`,
      { mode: "cors" }
    );

    if (!accountResponse.ok) {
      throw new Error(
        "Failed to fetch account information from Hedera Mirror Node."
      );
    }

    const accountData = await accountResponse.json();
    const myAccountId = accountData.account;

    const myPrivateKeyHex = await provider.request({
      method: "eth_private_key",
    });

    if (!myAccountId || !myPrivateKeyHex) {
      throw new Error(
        "Environment variables myAccountId and myPrivateKey must be present."
      );
    }

    const operatorKey = PrivateKey.fromStringECDSA(myPrivateKeyHex);
    const client = Client.forTestnet();
    client.setOperator(myAccountId, operatorKey);

    cachedClient = client; // Cache the client instance
  }

  return cachedClient;
};

// Get Accounts
const getAccounts = async (provider) => {
  const walletClient = createWalletClient({
    chain: hederaTestnet,
    transport: custom(provider),
  });

  // Get user's Ethereum public address
  const address = await walletClient.getAddresses();
  return address;
};

// Get user's balance in ether
const getBalance = async (provider) => {
  const publicClient = createPublicClient({
    chain: hederaTestnet, // for hederaTestnet
    transport: custom(provider),
  });

  const walletClient = createWalletClient({
    chain: hederaTestnet,
    transport: custom(provider),
  });

  // Get user's Ethereum public address
  const address = await walletClient.getAddresses();

  // Get user's balance in ether
  const balance = await publicClient.getBalance({ address: address[0] });

  return balance / 1000000000000000000n;
};

async function sendMessage(provider, fileId, fileName) {
  console.log("Sending message...");
  const [myAddress] = await getAccounts(provider);

  const accountResponse = await fetch(
    `https://testnet.mirrornode.hedera.com/api/v1/accounts/${myAddress}`,
    { mode: "cors" }
  );

  if (!accountResponse.ok) {
    throw new Error(
      "Failed to fetch account information from Hedera Mirror Node."
    );
  }

  const accountData = await accountResponse.json();
  const myAccountId = accountData.account;

  const myPrivateKeyHex = await provider.request({
    method: "eth_private_key",
  });

  if (!myAccountId || !myPrivateKeyHex) {
    throw new Error(
      "Environment variables myAccountId and myPrivateKey must be present."
    );
  }

  const operatorKey = PrivateKey.fromStringECDSA(myPrivateKeyHex);
  const client = Client.forTestnet();
  client.setOperator(myAccountId, operatorKey);

  if (!topicId) {
    const txResponse = await new TopicCreateTransaction().execute(client);
    const receipt = await txResponse.getReceipt(client);
    topicId = receipt.topicId.toString();
    console.log(`Your Topic ID is: ${topicId}`);
  }

  const messageData = {
    fileId: fileId,
    sender: myAccountId,
    fileName: fileName,
    timeStamp: new Date().toISOString(),
  };

  const messageDataString = JSON.stringify(messageData);
  const submitMsgTx = new TopicMessageSubmitTransaction({
    topicId,
    message: messageDataString,
  }).freezeWith(client);

  const submitMsgTxSubmit = await submitMsgTx.execute(client);
  const getReceipt = await submitMsgTxSubmit.getReceipt(client);
  const transactionStatus = getReceipt.status;
  console.log("The message transaction status:", transactionStatus.toString());

  return { topicId, status: transactionStatus.toString() };
}

const uploadToHederaFileService = async (provider, content) => {
  try {
    const [myAddress] = await getAccounts(provider);

    const accountResponse = await fetch(
      `https://testnet.mirrornode.hedera.com/api/v1/accounts/${myAddress}`,
      { mode: "cors" }
    );

    if (!accountResponse.ok) {
      throw new Error(
        "Failed to fetch account information from Hedera Mirror Node."
      );
    }

    const accountData = await accountResponse.json();
    const myAccountId = accountData.account;

    const myPrivateKeyHex = await provider.request({
      method: "eth_private_key",
    });

    if (!myAccountId || !myPrivateKeyHex) {
      throw new Error(
        "Environment variables myAccountId and myPrivateKey must be present."
      );
    }

    const operatorKey = PrivateKey.fromStringECDSA(myPrivateKeyHex);
    const client = Client.forTestnet();
    client.setOperator(myAccountId, operatorKey);

    console.log("Uploading to Hedera...");

    const transaction = new FileCreateTransaction()
      .setContents(content)
      .setKeys([operatorKey.publicKey])
      .setMaxTransactionFee(new Hbar(2))
      .freezeWith(client);

    const signedTx = await transaction.sign(operatorKey);
    const txResponse = await signedTx.execute(client);
    const receipt = await txResponse.getReceipt(client);

    const fileId = receipt.fileId;
    console.log("File uploaded to Hedera with File ID:", fileId.toString());
    return fileId.toString();
  } catch (error) {
    console.error("Hedera File Service upload error:", error);
    return null;
  }
};

const fetchMessages = async () => {
  try {
    const response = await fetch(
      `https://testnet.mirrornode.hedera.com/api/v1/topics/${topicId}/messages`,
      { mode: "cors" }
    );

    if (!response.ok) {
      throw new Error(`Error fetching messages: ${response.statusText}`);
    }

    const data = await response.json();
    const messages = data.messages.map((message) => {
      const decodedMessage = atob(message.message); // decode base64
      return JSON.parse(decodedMessage); // parse JSON
    });

    return messages;
  } catch (error) {
    console.error("Error retrieving messages:", error);
  }
};

const getFileContent = async (provider, fileId) => {
  const client = await getClient(provider);
  try {
    const fileContent = await new FileContentsQuery()
      .setFileId(fileId)
      .execute(client);
    return fileContent.toString(); // Convert file content to a string (assumed to be text)
  } catch (error) {
    console.error(`Error retrieving content for fileId ${fileId}:`, error);
    return null;
  }
};

const getAllFiles = async (provider, messages) => {
  try {
    const files = [];
    for (const message of messages) {
      const fileContent = await getFileContent(provider, message.fileId);

      files.push({
        fileId: message.fileId,
        content: fileContent
          .split(",")
          .map((code) => String.fromCharCode(code))
          .join(""),
        timeStamp: message.timeStamp,
      });
    }

    return files;
  } catch (error) {
    console.error("Error retrieving files:", error);
  }
};

export default {
  getAccounts,
  getBalance,
  uploadToHederaFileService,
  sendMessage,
  fetchMessages,
  getAllFiles,
};
