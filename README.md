![reCEPTION](https://github.com/user-attachments/assets/775b68ac-564e-42fb-b7d5-177943ed8995)

# Contents
- [Overview](https://github.com/Julius-Ky/reCeption/blob/main/README.md#reception-web30-recaptcha)
- [Key Features](https://github.com/Julius-Ky/reCeption/blob/main/README.md#key-features)
- [Model Process](https://github.com/Julius-Ky/reCeption/blob/main/README.md#model-process)
- [Journey](https://github.com/Julius-Ky/reCeption/blob/main/README.md#Journey)
- [Competition](https://github.com/Julius-Ky/reCeption/blob/main/README.md#Competition)

## [reCEPTION](https://reception-seven.vercel.app/) (Web3.0 reCAPTCHA)

reCEPTION is an **`AI-powered security platform`** that offers functionality similar to **reCAPTCHA**, providing automated verification solutions for both **`Web2 and Web3 environments`**. 
The project aims to enhance the **`security`** and **`quality of smart contracts`** and **`provide automated validation solutions for users and developers`**.

[Demo Video]() | [Smart Contract](https://github.com/Julius-Ky/reCeption/tree/main/contracts) | [AI Model](https://github.com/Julius-Ky/reCeption/tree/main/model) | [Pitchdeck](https://drive.google.com/file/d/1gn9eo1JHbGmijGPWTwsq1gkfCLY_8rKp/view?usp=sharing)

## Key Features
1. **AI-Based Smart Contract Analysis**:
    - Users upload their smart contract code for analysis, where AI identifies security vulnerabilities, code flaws, and potential scams.
2. **Automated Security Checks and Corrections**:
    - Based on the analysis, the AI suggests and implements modifications, including security patches and performance optimizations.
    - Provides a feature to automatically deploy the modified code within the platform.
3. **Detailed Reporting**:
    - Generates comprehensive reports detailing the issues found, modifications made, and explanations to help users understand improvements.
    - Reports are available for download in CSV and PDF formats.
4. **Admin Console**:
    - An admin console allows administrators to set up and manage reCeption features on their own websites.
    - Supports reCAPTCHA-like functionality for security validation on web pages.
5. **API Provision**:
    - Offers API access to analysis results and data, enabling e-commerce platforms or Web3 applications to use these as security solutions.

## Model Process
![image](https://github.com/user-attachments/assets/ff0954d2-e9d8-4451-bfd8-a466f06f8f8e)
<br></br>
The model extracts the opcodes of the vulnerable contract.
After, it transforms the opcode sequences into numerical data and feed it into a neural network for classification.
Finally ,the model scores the potential vulnerability category the opcode belongs to.

- In this case, the intuition behind the network architecture relays not solely in analyzing the opcode  but also actively picking which information is crucial to learn and to forget . In addition , it makes decisions about the necessary actions to take next (e.g., recommend a fix, analyze another operation).
- A MODNN network combined with Reinforcement Learning techniques composes a neural architecture capable of not only analyzing contracts but also learning and improving its analysis through interaction. This could be especially useful for dynamic environments like smart contracts, where opcode patterns can vary significantly, and optimal analysis strategies need to be learned over time.

> ### Types of learned vulnerabilities & AI Model result

![AI_Model_result](https://github.com/user-attachments/assets/196f42ac-1ea8-4dad-a4ca-d9fe32ba5667)

It is just pretrained at the moment with **`Reentrancy vulnerability`** so it learned how to identified from a smart contract opcodes.
- Overflow: 3.90%
- Self-Destruct: 3.50%
- Frontrunning: 4.80%
- **`Reentrancy: 80.50%`**
- Unauthorized Access: 3.90%
- Gas Efficiency: 3.40%

> ### Reference training data
- [A survey of attacks on Ethereum smart contracts](https://drive.google.com/file/d/1iKK2nI9jQnyWflCkc1lR0q_pRUKyD5wk/view?usp=sharing)
- [Vulnerabilities #1](https://kadenzipfel.github.io/smart-contract-vulnerabilities/)
- [Vulnerabilities #2](https://arxiv.org/html/2409.02139v1)
- [Vulnerabilities #3](https://www.4byte.directory/)

## Journey
### reCEPTION API Diagram
```mermaid
sequenceDiagram
participant User
participant E-Commerce as E-Commerce (Platform)
participant reCEPTION
participant AI as AI Model
participant NEAR

User ->> E-Commerce: 1. Login
E-Commerce -->> E-Commerce: Response the user info
User ->> E-Commerce: 2. Product Purchase (Cryptocurrency)
E-Commerce ->> reCEPTION: 3. Send Smart Contract (Payment)
reCEPTION ->> NEAR: 4. Sign transaction
NEAR -->> NEAR: Handles verification & fee charges for interactions
NEAR -->> reCEPTION: Return Final Verification Result
reCEPTION ->> AI: 5. Pass Smart Contract for Analysis
AI ->> reCEPTION: 6. Return Analysis Result
reCEPTION ->> User: 7. Return Safety Judgment
User ->> E-Commerce: 8. Share whether to run (Check Box or Payment Approve)
E-Commerce -->> E-Commerce: Response payment
E-Commerce -->> AI: Save contract data (Normal/Abnormal Classification)
```

1. **Login**: The user logs into the E-Commerce platform.
   - **Response the user info**: The E-Commerce platform processes the logged-in user information.
2. **Product Purchase**: The user purchases a product using cryptocurrency.
3. **Send Smart Contract**: The E-Commerce platform sends the smart contract for payment to reCeption.
4. **Smart Contract Analysis**: reCeption analyzes the smart contract using NEAR AI.
   - **Smart contract data Verify**: Handles verification & fee charges for interactions.
5. **Return Analysis result**: NEAR returns the analysis result to reCeption.
6. **Return Safety Judgment**: reCeption sends the safety judgment result back to the user.
7. **Share whether to run**: The user decides the next step via a checkbox or payment approval.
   - **Response payment**: The E-Commerce platform internally processes the payment response.
8. **Save contract data**: The E-Commerce platform saves the smart contract data on NEAR, categorized as normal/abnormal.

### reCEPTION Diagram
```mermaid
sequenceDiagram
participant User
participant reCEPTION
participant AI as AI Model
participant NEAR

User ->> reCEPTION: 1. Connect Wallet
reCEPTION -->> User: Wallet Connected Confirmation
User ->> reCEPTION: 2. Upload Smart Contract File
reCEPTION ->> NEAR: 3. Sign transaction
NEAR -->> NEAR: Handles verification & fee charges for interactions
NEAR -->> reCEPTION: Return Final Verification Result
reCEPTION ->> AI: 4. Pass Smart Contract for Analysis
AI ->> reCEPTION: 5. Return Analysis Result
reCEPTION ->> User: 6. Display Analysis Result
User -->> AI: Save contract data (Normal/Abnormal Classification)
```
### Platform Journey
![image](https://github.com/user-attachments/assets/503aca13-2084-4870-b88c-4acb323f1fcb)

### User Journey (If do it directly on the platform)
```mermaid
graph TD;
    Sign-In/Sign-Up-->File-Upload;
    Sign-In/Sign-Up-->Copy/Paste-Text;
    Copy/Paste-Text-->AI-Analysis;
    File-Upload-->AI-Analysis;
    AI-Analysis-->Result;
    Result-->File-Download;
    Result-->Auto-Deploy;
    Result-->Re-Analysis;
    Re-Analysis-->AI-Analysis;
    File-Download-->Display-the-History;
    Auto-Deploy-->Display-the-History;
```

## Competition
<a href="https://www.walletguard.app/" height="5" width="10" target="_blank">
	<img src="https://cdn.prod.website-files.com/653c60995304b515c2f8f3f6/65a758a1767a906d4ebcde44_wallet%20guard%20logo.png" width="200" height="60">
<a><a href="https://www.anchain.ai/" height="5" width="10" target="_blank">
	<img src="https://github.com/user-attachments/assets/ca988dbf-b869-4524-a7ff-127a3618ae4d" width="200" height="35">
<a><br></br>

> We are different from them.

- We do not secure the wallet itself, but the **`contract code itself`**.
- We do not detect transactions that occur through contracts via AI by being installed in the wallet itself, but we analyze the contract code itself that generates transactions by loading the contract code **`from the website itself through AI`**.
- We are not restricted by the wallet, and we analyze only the contract code itself to find vulnerabilities in the code and inform the user of the presence or absence of transactions. Furthermore, if we **`modify and supplement the contract code, we provide a report on the analysis results to prevent secondary crimes`**.
- Even if users do not download our service separately as a browser extension or wallet snap, if the **`website admin generally install`** and operate our **`API service`**, anyone can easily use our service to make **`safe transactions`**.
