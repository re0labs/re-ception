import { ethers } from "hardhat";

const deploy = async () => {
  const oracleAddress: string = process.env.ORACLE_ADDRESS || "";
  const AGENT_PROMPT: string =
    "Your task is to analyze the attached contract, automate fixes, optimize it to reduce gas fees, and rewrite it with recommended improvements. Additionally, provide detailed reports on code quality and security.";
  const various = await ethers.deployContract(
    "Various",
    [oracleAddress, AGENT_PROMPT],
    {}
  );

  await various.waitForDeployment();

  console.log(`Various deployed to ${various.target}`);
};
deploy().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
