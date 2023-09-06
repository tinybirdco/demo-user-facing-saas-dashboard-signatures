"use client";

import { useState } from 'react';
import { Title, Subtitle, Flex, DateRangePicker, DateRangePickerItem } from '@tremor/react';
import TopOrgsCreatingSignatures from '@/app/components/topOrgsCreatingSignatures.js';
import TotalActivitiesPerHour from '@/app/components/totalActivitiesPerHour';
import ActivitiesByStatus from '@/app/components/activitiesByStatus';
import PercentageActiveUsersVerified from '@/app/components/percentageActiveUsersVerified';
import moment from "moment";

// Get your Tinybird host and token from the .env file
const TINYBIRD_HOST = process.env.NEXT_PUBLIC_TINYBIRD_HOST; // The host URL for the Tinybird API
const TINYBIRD_TOKEN = process.env.NEXT_PUBLIC_TINYBIRD_TOKEN; // The access token for authentication with the Tinybird API


export default function Dashboard() {
    const [dates, setDates] = useState({
        from: moment().subtract(7, 'days').toDate(),
        to: new Date(),
    });

    let dateFromFormatted = dates.from.toISOString().substring(0, 10);
    let dateToFormatted = dates.to.toISOString().substring(0, 10);
    let host = TINYBIRD_HOST
    let token = TINYBIRD_TOKEN
    return (
        <div className="main grid grid-cols-2 gap-5 sm:gap-10 grid-rows-3-auto">
            <Flex className = "col-span-2">
                <div>
                    <Title className="chart-title">Real-time Dashboard</Title>
                    <Subtitle className = "chart-title">Built with Tinybird, Tremor, and Next.js</Subtitle>
                </div>
                <div>
                    <DateRangePicker
                        className="max-w-md mx-auto"
                        value={dates}
                        onValueChange={setDates}
                        selectPlaceholder="Select Data Range"
                        color="rose"
                        >
                        <DateRangePickerItem key="ytd" value="ytd" from={new Date(2023, 0, 1)}>
                            Year-to-date
                        </DateRangePickerItem>
                        <DateRangePickerItem
                            key="90d"
                            value="90d"
                            from={moment().subtract(90, 'days').toDate()}
                            to={new Date()}
                        >
                            Last 90 Days
                        </DateRangePickerItem>
                        <DateRangePickerItem
                            key="30d"
                            value="30d"
                            from={moment().subtract(30, 'days').toDate()}
                            to={new Date()}
                        >
                            Last 30 Days
                        </DateRangePickerItem>
                        <DateRangePickerItem
                            key="7d"
                            value="7d"
                            from={moment().subtract(7, 'days').toDate()}
                            to={new Date()}
                        >
                            Last 7 Days
                        </DateRangePickerItem>
                        <DateRangePickerItem
                            key="yest"
                            value="yest"
                            from={moment().subtract(24, 'hours').toDate()}
                            to={new Date()}
                        >
                            Yesterday
                        </DateRangePickerItem>
                        <DateRangePickerItem
                            key="tod"
                            value="tod"
                            from={new Date()}
                            to={moment().add(24, 'hours').toDate()}
                        >
                            Today
                        </DateRangePickerItem>
                    </DateRangePicker>
                </div>
            </Flex>
            <TopOrgsCreatingSignatures
                host={host}
                token={token}
                date_from={dateFromFormatted}
                date_to={dateToFormatted}
            />
            <TotalActivitiesPerHour
                host={host}
                token={token}
                date_from={dateFromFormatted}
                date_to={dateToFormatted}
            />
            <ActivitiesByStatus
                host={host}
                token={token}
                date_from={dateFromFormatted}
                date_to={dateToFormatted}
            />
            <PercentageActiveUsersVerified
                host={host}
                token={token}
                date_from={dateFromFormatted}
                date_to={dateToFormatted}
            />
        </div>
    );
}
