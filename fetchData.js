import fetch from "node-fetch";

const API_URL = "https://api.cricapi.com/v1/match_info?apikey=1a119783-131c-4e35-bfe2-00ba7f2d4f0e&id=43668401-454e-4844-995e-d591d1398cc7";

// Fetch the JSON data from API
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("Data fetched successfully.");
        return data.data; // Return only the relevant data section
    } catch (error) {
        console.error("Error fetching data:", error);
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

// Main function to test all
async function main() {
    console.log("Fetching match information...");
    console.log(await getMatchInfo());

    console.log("\nFetching teams...");
    console.log(await getTeams());

    console.log("\nFetching team details...");
    console.log(await getTeamDetails());

    console.log("\nFetching match score...");
    console.log(await getMatchScore());

    console.log("\nFetching match results...");
    console.log(await getMatchResults());
}

// Run the main function;
