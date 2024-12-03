const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
// const ether = require("ethers");

const app = express();
const PORT = 3000;
// const provider = new ether.JsonRpcProvider(process.env.RPC_URL); // E.g., Infura or Alchemy RPC URL
// const wallet = new ether.Wallet(process.env.PRIVATE_KEY, provider);
// const contractAddress = process.env.CONTRACT_ADDRESS;
dotenv.config(); //--
//Middleware is imp
app.use(express.json());

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

// const contract = new ether.Contract(contractAddress, abi, wallet);

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

async function sendToBlockchain(name, status, venue, scoreIndia, scoreSouthAfrica) {
    try {
        console.log("Sending match data to the contract...");

        // Call the contract function to store match data
        const tx = await contract.storeMatchData(name, status, venue, scoreIndia, scoreSouthAfrica);

        // Wait for the transaction to be mined
        await tx.wait();
        console.log("Transaction successful:", tx.hash);

        return tx.hash;
    } catch (error) {
        console.error("Error sending data to the blockchain:", error);
        throw error;
    }
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

app.post("/sendMatchData", async (req, res) => {
    const { name, status, venue, scoreIndia, scoreSouthAfrica } = req.body;

    try {
        // Send data to blockchain
        const transactionHash = await sendToBlockchain(name, status, venue, scoreIndia, scoreSouthAfrica);
        
        // Respond with the transaction hash
        res.status(200).json({
            message: "Match data successfully stored on the blockchain!",
            transactionHash
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to send match data to the blockchain." });
    }
});


// app.post("/send-to-blockchain", async (req, res) => {
//     try {
//         // Extract the data from the request
//         const data = req.body;

//         // Validate the input
//         if (!data || Object.keys(data).length === 0) {
//             return res.status(400).json({ error: "Invalid or missing data." });
//         }

//         // Call the function to send data
//         const result = await sendToBlockchain(data);

//         // Respond with the result
//         res.status(200).json({
//             message: "Data successfully processed!",
//             transactionHash: result.transactionHash,
//         });
//     } catch (error) {
//         res.status(500).json({ error: "Failed to process data." });
//     }
// });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});






