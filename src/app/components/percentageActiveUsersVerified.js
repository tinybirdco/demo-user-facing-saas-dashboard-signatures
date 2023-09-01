"use client";

import {Card, Title, Subtitle, DonutChart, Text} from '@tremor/react';
import React, { useState, useEffect } from 'react';
import { fetchTinybirdUrl, percentageActiveUsersVerifiedURL } from '../services/tinybirdAPIs'

const PercentageActiveUsersVerified = ({host, token, date_from, date_to}) => {
    const [percentage_active_users_verified, setData] = useState([{
            "status": "",
            "count": 0,
    }]);

    const [latency, setLatency] = useState(0);

    let percentage_active_users_verified_url = percentageActiveUsersVerifiedURL(host, token, date_from, date_to)

    useEffect(() => {
        fetchTinybirdUrl(percentage_active_users_verified_url, setData, setLatency)
    }, [percentage_active_users_verified_url]);

    return (
        <Card>
            <Title>Percentage Verified Users</Title>
            <Subtitle>
                Active users only
            </Subtitle>
            <DonutChart
                className="mt-6 h-96"
                data={percentage_active_users_verified}
                index="status"
                category="count"
                colors={["green", "red"]}
                yAxisWidth={48}
                showXAxis={true}
            />
            <Text>Latency: {latency*1000} ms</Text>
         </Card>
    );
};

export default PercentageActiveUsersVerified;