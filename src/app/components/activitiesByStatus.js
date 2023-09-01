"use client";

import {Card, Title, Subtitle, BarList, Text, Flex} from '@tremor/react';
import React, { useState, useEffect } from 'react';
import { fetchTinybirdUrl, activitiesByStatusURL } from '../services/tinybirdAPIs';

const ActivitiesByStatus = ({host, token, date_from, date_to}) => {
    const [activities_by_status, setData] = useState([{
            "name": "",
            "value": 0,
    }]);

    const [latency, setLatency] = useState(0);

    let activities_by_status_url = activitiesByStatusURL(host, token, date_from, date_to)

    useEffect(() => {
        fetchTinybirdUrl(activities_by_status_url, setData, setLatency)
    }, [activities_by_status_url]);

    return (
        <Card>
            <Title>Activities by Status</Title>
            <Subtitle>
                Within the date range
            </Subtitle>
            <Flex className="mt-4">
            <Text>Status</Text>
            <Text>Count</Text>
            </Flex>
            <BarList data={activities_by_status} className="mt-2" color="emerald" />
            <Text>Latency: {latency*1000} ms</Text>
        </Card>
    );
};

export default ActivitiesByStatus;