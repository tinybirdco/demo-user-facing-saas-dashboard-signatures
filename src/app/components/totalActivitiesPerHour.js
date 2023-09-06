"use client";

import { Card, Title, Subtitle, AreaChart, Text } from '@tremor/react';
import React, { useState, useEffect } from 'react';
import { fetchTinybirdUrl, totalActivitiesPerHourURL } from '../services/tinybirdAPIs'

const TotalActivitiesPerHour = ({host, token, date_from, date_to}) => {
    const [total_activities_per_hour, setData] = useState([{
            "hour": "",
            "status": "",
            "count": 0,
    }]);

    const [latency, setLatency] = useState(0);

    let total_activities_per_hour_url = totalActivitiesPerHourURL(host, token, date_from, date_to)

    useEffect(() => {
        fetchTinybirdUrl(total_activities_per_hour_url, setData, setLatency)
    }, [total_activities_per_hour_url]);

    return (
        <Card>
            <Title>Total Activities per Hour</Title>
            <Subtitle>
                Within the date range
            </Subtitle>
            <AreaChart
                className="mt-6"
                data={total_activities_per_hour}
                index="hour"
                categories={["count"]}
                colors={["red"]}
                yAxisWidth={48}
                showXAxis={true}
            />
            <Text>Latency: {latency*1000} ms</Text>
         </Card>
    );
};

export default TotalActivitiesPerHour;
