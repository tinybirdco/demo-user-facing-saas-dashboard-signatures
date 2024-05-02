"use client";

import { Card, Text, Subtitle, Title, BarChart } from '@tremor/react';
import React, { useState, useEffect } from 'react';

// Get your Tinybird host and token from the .env file
const TINYBIRD_HOST = process.env.NEXT_PUBLIC_TINYBIRD_HOST; // The host URL for the Tinybird API
const TINYBIRD_TOKEN = process.env.NEXT_PUBLIC_TINYBIRD_TOKEN; // The access token for authentication with the Tinybird API

export default function Dashboard() {
    // React state hook for managing the "newSignaturesPerDay" data
    // Initializes data with an array containing an object with default values for the top orgs creating signatures
    const [ranking_of_top_organizations_creating_signatures, setData] = useState([{
        "organization": "",
        "org_total": 0,
    }]);
   
    // Initializes latency with an integer 0  
    const [latency, setLatency] = useState(0);

    // Define hardcoded date range for the query
const today = new Date(); // Get today's date
const dateFrom = new Date(today.setMonth(today.getMonth()-1)); // Start the query's dateFrom to the one month before today
const dateTo = new Date(today.setMonth(today.getMonth()+1)); // Set the query's dateTo to be one month from today

console.log({dateFrom})
console.log({dateTo})
console.log({today})

// Format for passing as a query parameter
const dateFromFormatted = dateFrom.toISOString().substring(0, 10);
const dateToFormatted = dateTo.toISOString().substring(0, 10);

// Constructing the URL for fetching data, including host, token, and date range
const topRankingOfOrganizationsCreatingSignaturesURL = `https://${TINYBIRD_HOST}/v0/pipes/ranking_of_top_organizations_creating_signatures.json?token=${TINYBIRD_TOKEN}&date_from=${dateFromFormatted}&date_to=${dateToFormatted}`;

// Function to fetch data from Tinybird URL
const fetchTinybirdUrl = async (fetchUrl, setData, setLatency) => {
        console.log({fetchUrl})
        const data = await fetch(fetchUrl); // Performing an asynchronous HTTP fetch request
        const jsonData = await data.json(); // Parsing the response as JSON
        console.log(jsonData.data); // Logging the parsed data for debugging purposes
        console.log(jsonData.statistics.elapsed)
        setData(jsonData.data); // Setting the state with the fetched data
        setLatency(jsonData.statistics.elapsed) // Setting the state with the query latency from Tinybird
};

// useEffect hook to handle side-effects (in this case, fetching data) in a functional component
useEffect(() => {
    // Calling the fetchTinybirdUrl function with the URL and state setter function
    // The function fetches the data and updates the state
    fetchTinybirdUrl(topRankingOfOrganizationsCreatingSignaturesURL, setData, setLatency)
  }, [topRankingOfOrganizationsCreatingSignaturesURL]); // The effect will rerun if the value of topRankingOfOrganizationsCreatingSignaturesURL changes


  return (
    <Card>
            <Title>Top Organizations Creating Signatures</Title>
            <Subtitle>
                Ranked from highest to lowest
            </Subtitle>
            <BarChart
                className="mt-6"
                data={ranking_of_top_organizations_creating_signatures}
                index="organization"
                categories={["org_total"]}
                colors={["blue", "red"]}
                yAxisWidth={48}
                showXAxis={true}
            />
            <Text>Latency: {latency*1000} ms</Text>
        </Card>
);
}
