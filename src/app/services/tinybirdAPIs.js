const topOrgsCreatingSignaturesURL = (host, token, date_from, date_to) =>
 `https://${host}/v0/pipes/ranking_of_top_organizations_creating_signatures.json?token=${token}&date_from=${date_from}&date_to=${date_to}`;

const totalActivitiesPerHourURL = (host, token, date_from, date_to) =>
 `https://${host}/v0/pipes/total_activities_per_hour.json?token=${token}&date_from=${date_from}&date_to=${date_to}`;

const activitiesByStatusURL = (host, token, date_from, date_to) =>
 `https://${host}/v0/pipes/activities_by_status.json?token=${token}&date_from=${date_from}&date_to=${date_to}`;

const percentageActiveUsersVerifiedURL = (host, token, date_from, date_to) =>
 `https://${host}/v0/pipes/percentage_active_users_verified.json?token=${token}&date_from=${date_from}&date_to=${date_to}`;

 const fetchTinybirdUrl = async (fetchUrl, setData, setLatency) => {
    console.log(fetchUrl)
    const data = await fetch(fetchUrl)
    const jsonData = await data.json();
    console.log(jsonData.data)
    setData(jsonData.data);
    setLatency(jsonData.statistics.elapsed)
}

export {
    fetchTinybirdUrl,
    topOrgsCreatingSignaturesURL,
    totalActivitiesPerHourURL,
    activitiesByStatusURL,
    percentageActiveUsersVerifiedURL
}