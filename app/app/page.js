"use client";

import { BarChart, Card, Subtitle, Text, Title } from "@tremor/react";
import React from "react";
import useSWR from "swr";
import { useFetcher } from "@/hooks/useFetch";


// Get your Tinybird host and token from the .env file
const TINYBIRD_HOST = process.env.NEXT_PUBLIC_TINYBIRD_HOST; // The host URL for the Tinybird API

const REFRESH_INTERVAL_IN_MILLISECONDS = 5000; // five seconds

export default function Dashboard() {
  // Define date range for the query
  const today = new Date(); // Get today's date
  const dateFrom = new Date(today.setMonth(today.getMonth() - 1)); // Start the query's dateFrom to the one month before today
  const dateTo = new Date(today.setMonth(today.getMonth() + 1)); // Set the query's dateTo to be one month from today

  // Format for passing as a query parameter
  const dateFromFormatted = dateFrom.toISOString().substring(0, 10);
  const dateToFormatted = dateTo.toISOString().substring(0, 10);

  const fetcher = useFetcher(); // This fetcher handles the token revalidation

  // Constructing the URL for fetching data, including host, token, and date range
  const endpointUrl = new URL(
    "/v0/pipes/ranking_of_top_organizations_creating_signatures.json",
    TINYBIRD_HOST
  );
  endpointUrl.searchParams.set("date_from", dateFromFormatted);
  endpointUrl.searchParams.set("date_to", dateToFormatted);

  // Initializes variables for storing data
  let ranking_of_top_organizations_creating_signatures, latency, errorMessage;

  // Using SWR hook to handle state and refresh result every five seconds
  const { data } = useSWR(endpointUrl, fetcher, {
    refreshInterval: REFRESH_INTERVAL_IN_MILLISECONDS,
    onError: (error) => (errorMessage = error),
  });

  if (!data) return;

  if (data?.error) {
    errorMessage = data.error;
    return;
  }

  ranking_of_top_organizations_creating_signatures = data.data; // Setting the state with the fetched data
  latency = data.statistics?.elapsed; // Setting the state with the query latency from Tinybird

  return (
    <Card>
      <Title>Top Organizations Creating Signatures</Title>
      <Subtitle>Ranked from highest to lowest</Subtitle>
      {ranking_of_top_organizations_creating_signatures && (
        <BarChart
          className="mt-6"
          data={ranking_of_top_organizations_creating_signatures}
          index="organization"
          categories={["org_total"]}
          colors={["blue", "red"]}
          yAxisWidth={48}
          showXAxis={true}
        />
      )}
      {latency && <Text>Latency: {latency * 1000} ms</Text>}
      {errorMessage && (
        <div className="mt-4 text-red-600">
          <p>
            Oops, something happens: <strong>{errorMessage}</strong>
          </p>
          <p className="text-sm">Check your console for more information</p>
        </div>
      )}
    </Card>
  );
}
