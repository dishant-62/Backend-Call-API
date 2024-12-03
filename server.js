const express = require("express");
const fetch = require("node-fetch");
const ethers = require("ether");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 3000;

const API_URL = "https://api.cricapi.com/v1/match_info?apikey=1a119783-131c-4e35-bfe2-00ba7f2d4f0e&id=43668401-454e-4844-995e-d591d1398cc7";

// Fetch the JSON data from API
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.data; // Return only the relevant data section
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

// Function to get match information
async function getMatchInfo() {
    const data = await fetchData();
    return {
        id: data.id,
        name: data.name,
        matchType: data.matchType,
        status: data.status,
        venue: data.venue,
        date: data.date,
        dateTimeGMT: data.dateTimeGMT,
    };
}

// Function to get teams involved
async function getTeams() {
    const data = await fetchData();
    return data.teams;
}

// Function to get team details
async function getTeamDetails() {
    const data = await fetchData();
    return data.teamInfo.map(team => ({
        name: team.name,
        shortname: team.shortname,
        img: team.img,
    }));
}

// Function to get match score
async function getMatchScore() {
    const data = await fetchData();
    return data.score.map(score => ({
        runs: score.r,
        wickets: score.w,
        overs: score.o,
        inning: score.inning,
    }));
}

// Function to get toss and match winner
async function getMatchResults() {
    const data = await fetchData();
    return {
        tossWinner: data.tossWinner,
        tossChoice: data.tossChoice,
        matchWinner: data.matchWinner,
    };
}

// Define API endpoints
app.get("/match-info", async (req, res) => {
    try {
        const result = await getMatchInfo();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch match information." });
    }
});

app.get("/teams", async (req, res) => {
    try {
        const result = await getTeams();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch teams." });
    }
});

app.get("/team-details", async (req, res) => {
    try {
        const result = await getTeamDetails();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch team details." });
    }
});

app.get("/match-score", async (req, res) => {
    try {
        const result = await getMatchScore();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch match score." });
    }
});

app.get("/match-results", async (req, res) => {
    try {
        const result = await getMatchResults();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch match results." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


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


app.post("/send-to-blockchain", async (req, res) => {
    try {
        // Extract the data from the request
        const data = req.body;

        // Validate the input
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ error: "Invalid or missing data." });
        }

        // Call the function to send data
        const result = await sendToBlockchain(data);

        // Respond with the result
        res.status(200).json({
            message: "Data successfully processed!",
            transactionHash: result.transactionHash,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to process data." });
    }
});



