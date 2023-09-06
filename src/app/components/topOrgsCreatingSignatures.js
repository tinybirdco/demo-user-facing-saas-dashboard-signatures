"use client";

import { Card, Title, Subtitle, BarChart, Text } from '@tremor/react';
import React, { useState, useEffect } from 'react';
import { fetchTinybirdUrl, topOrgsCreatingSignaturesURL } from '../services/tinybirdAPIs'

const TopOrgsCreatingSignatures = ({host, token, date_from, date_to}) => {
    const [top_organizations_creating_signatures, setData] = useState([{
            "organization": "",
            "org_total": 0,
    }]);

    const [latency, setLatency] = useState(0);

    let top_organizations_creating_signatures_url = topOrgsCreatingSignaturesURL(host, token, date_from, date_to)

    useEffect(() => {
        fetchTinybirdUrl(top_organizations_creating_signatures_url, setData, setLatency)
    }, [top_organizations_creating_signatures_url]);

    return (
        <Card>
            <Title>Top Organizations Creating Signatures</Title>
            <Subtitle>
                Ranked from highest to lowest
            </Subtitle>
            <BarChart
                className="mt-6"
                data={top_organizations_creating_signatures}
                index="organization"
                categories={["org_total"]}
                colors={["blue", "red"]}
                yAxisWidth={48}
                showXAxis={true}
            />
            <Text>Latency: {latency*1000} ms</Text>
         </Card>
    );
};

export default TopOrgsCreatingSignatures;
