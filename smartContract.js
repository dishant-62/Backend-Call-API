const ethers = require("ethers");
const dotenv = require("dotenv");
const express = require("express");
const fetch = require("node-fetch");
dotenv.config();


const app = express();
const port = 3001;

app.use(express.json());

// Initialize provider and wallet
const provider = new ethers.JsonRpcProvider(process.env.INFURA_SEPOLIA_RPC);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractUS = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

// Smart contract ABI (from Remix)
// const abi = [
//     "function storeMatchData(string memory _name, string memory _status, string memory _venue, uint256 _scoreIndia, uint256 _scoreSouthAfrica) public",
//     "function getMatchData() public view returns (string memory, string memory, string memory, uint256, uint256)"
// ];
const abi = [
    {
      "inputs": [
        { "internalType": "string", "name": "_name", "type": "string" },
        { "internalType": "string", "name": "_status", "type": "string" },
        { "internalType": "string", "name": "_venue", "type": "string" },
        { "internalType": "uint256", "name": "_scoreIndia", "type": "uint256" },
        { "internalType": "uint256", "name": "_scoreSouthAfrica", "type": "uint256" }
      ],
      "name": "storeMatchData",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMatchData",
      "outputs": [
        { "internalType": "string", "name": "", "type": "string" },
        { "internalType": "string", "name": "", "type": "string" },
        { "internalType": "string", "name": "", "type": "string" },
        { "internalType": "uint256", "name": "", "type": "uint256" },
        { "internalType": "uint256", "name": "", "type": "uint256" }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  

// Smart contract address
const contractAddress = process.env.CONTRACT_ADDRESS;

// Initialize contract
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Endpoint to send data to the smart contract
app.post("/sendMatchData", async (req, res) => {
    const { name, status, venue, scoreIndia, scoreSouthAfrica } = req.body;

    try {
        console.log("Sending match data to the contract...");

        const tx = await contract.storeMatchData(name, status, venue, scoreIndia, scoreSouthAfrica);

        await tx.wait(); // Wait for the transaction to be mined

        console.log("Transaction successful:", tx.hash);
        res.send("Match data successfully stored on the blockchain!");
    } catch (error) {
        console.error("Error sending match data:", error);
        res.status(500).send("Failed to send match data to the blockchain.");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});




// // Load environment variables
// const INFURA_SEPOLIA_URL = process.env.INFURA_SEPOLIA_URL;
// const PRIVATE_KEY = process.env.PRIVATE_KEY;

// // Initialize Ethereum provider
// const provider = new ethers.JsonRpcProvider(INFURA_SEPOLIA_URL);

// // Initialize Wallet
// const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// // Log for confirmation
// console.log("Ethereum provider and wallet initialized!");




// async function sendToBlockchain(data) {
//     try {
//         // Simulate preparing data for a transaction
//         console.log("Preparing data for blockchain:", data);

//         // For now, just log the data without sending
//         console.log("Simulating transaction to smart contract...");
//         console.log("Transaction details:", {
//             from: wallet.address,
//             data,
//         });

//         // Simulate a transaction hash
//         const mockTransactionHash = "0x1234...mockhash";
//         console.log("Transaction simulated with hash:", mockTransactionHash);

//         // Return a mock response
//         return { success: true, transactionHash: mockTransactionHash };
//     } catch (error) {
//         console.error("Error preparing data for blockchain:", error);
//         throw new Error("Failed to prepare transaction");
//     }
// }


// const { ethers } = require("ethers");
// require("dotenv").config();

// // Load environment variables
// const PRIVATE_KEY = process.env.PRIVATE_KEY;
// const RPC_URL = process.env.INFURA_SEPOLIA_RPC;
// const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// // Example ABI for the smart contract (replace with your actual ABI)
// const CONTRACT_ABI = [
//     {
//         "inputs": [
//             { "internalType": "string", "name": "_matchName", "type": "string" },
//             { "internalType": "string", "name": "_matchType", "type": "string" },
//             { "internalType": "string", "name": "_status", "type": "string" }
//         ],
//         "name": "storeMatchData",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     }
// ];

// // Function to send data to the smart contract
// async function sendToSmartContract(matchData) {
//     try {
//         const provider = new ethers.JsonRpcProvider(RPC_URL);
//         const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
//         const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

//         console.log("Sending data to the smart contract...");
//         const tx = await contract.storeMatchData(
//             matchData.matchName,
//             matchData.matchType,
//             matchData.status
//         );

//         console.log("Transaction sent! Waiting for confirmation...");
//         await tx.wait();

//         console.log(`Transaction successful! Hash: ${tx.hash}`);
//         return tx.hash;
//     } catch (error) {
//         console.error("Error sending data to the smart contract:", error);
//         throw error;
//     }
// }

// module.exports = { sendToSmartContract };


