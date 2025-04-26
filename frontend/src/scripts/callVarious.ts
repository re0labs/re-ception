import { Contract, ethers, TransactionReceipt, Wallet } from "ethers";
import ABI from "../abis/Various.json";

interface Message {
  role: string;
  content: string;
}

async function main(fileContent: string) {
  const rpcUrl = import.meta.env.VITE_RPC_URL;
  if (!rpcUrl) throw Error("Missing RPC_URL in .env");
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;
  if (!privateKey) throw Error("Missing PRIVATE_KEY in .env");

  const contractAddress = import.meta.env.VITE_AGENT_CONTRACT_ADDRESS;
  if (!contractAddress) throw Error("Missing AGENT_CONTRACT_ADDRESS in .env");

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new Wallet(privateKey, provider);
  const contract = new Contract(contractAddress, ABI, wallet);

  const maxIterations = 1;

  // Use the fileContent directly as the uploadedContract
  const uploadedContract = fileContent;

  const transactionResponse = await contract.runAgent(
    uploadedContract,
    Number(maxIterations)
  );
  const receipt = await transactionResponse.wait();
  console.log(`Task sent, tx hash: ${receipt.hash}`);

  let agentRunID = getAgentRunId(receipt, contract);
  console.log(`Created agent run ID: ${agentRunID}`);
  if (!agentRunID && agentRunID !== 0) {
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));

  let allMessages: Message[] = [];
  let exitNextLoop = false;
  while (true) {
    const newMessages: Message[] = await getNewMessages(
      contract,
      agentRunID,
      allMessages.length
    );
    if (newMessages) {
      for (let message of newMessages) {
        let roleDisplay = message.role === "assistant" ? "THOUGHT" : "STEP";
        let color = message.role === "assistant" ? "\x1b[36m" : "\x1b[33m"; // Cyan for thought, yellow for step
        console.log(`${color}${roleDisplay}\x1b[0m: ${message.content}`);
        allMessages.push(message);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (exitNextLoop) {
      console.log(`agent run ID ${agentRunID} finished!`);
      break;
    }
    if (await contract.isRunFinished(agentRunID)) {
      exitNextLoop = true;
    }
  }
  return allMessages[allMessages.length - 1];
}

function getAgentRunId(receipt: TransactionReceipt, contract: Contract) {
  let agentRunID;
  for (const log of receipt.logs) {
    try {
      const parsedLog = contract.interface.parseLog(log);
      if (parsedLog && parsedLog.name === "AgentRunCreated") {
        agentRunID = ethers.toNumber(parsedLog.args[1]);
      }
    } catch (error) {
      console.log("Could not parse log:", log);
    }
  }
  return agentRunID;
}

async function getNewMessages(
  contract: Contract,
  agentRunID: number,
  currentMessagesCount: number
): Promise<Message[]> {
  const messages = await contract.getMessageHistoryContents(agentRunID);
  // if (messages.length == 3) {
  //   console.log(messages[2]);
  // }
  return messages;
}

export { main };
