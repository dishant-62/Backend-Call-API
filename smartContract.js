const ethers = require("ether");
const dotenv = require("dotenv");
dotenv.config();


// Load environment variables
const INFURA_SEPOLIA_URL = process.env.INFURA_SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Initialize Ethereum provider
const provider = new ethers.JsonRpcProvider(INFURA_SEPOLIA_URL);

// Initialize Wallet
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Log for confirmation
console.log("Ethereum provider and wallet initialized!");




async function sendToBlockchain(data) {
    try {
        // Simulate preparing data for a transaction
        console.log("Preparing data for blockchain:", data);

        // For now, just log the data without sending
        console.log("Simulating transaction to smart contract...");
        console.log("Transaction details:", {
            from: wallet.address,
            data,
        });

        // Simulate a transaction hash
        const mockTransactionHash = "0x1234...mockhash";
        console.log("Transaction simulated with hash:", mockTransactionHash);

        // Return a mock response
        return { success: true, transactionHash: mockTransactionHash };
    } catch (error) {
        console.error("Error preparing data for blockchain:", error);
        throw new Error("Failed to prepare transaction");
    }
}


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


