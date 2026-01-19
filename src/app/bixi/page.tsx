const BIXI_STATION_API = "https://gbfs.velobixi.com/gbfs/en/station_information.json";

async function fetchStationInfoData(): Promise<object> {
    const response = await fetch(BIXI_STATION_API);
    
    if (!response.ok) {
        throw new Error('Bixi Station data fail');
    }

    const data: object = await response.json();

    console.log('data ', data);

    return data;
}

export default async function BixiStationPage({
  latitude,
  longitude,
}: {
  latitude: string | string[] | undefined
  longitude: string | string[] | undefined
}) {
    console.log('latitude bixi compn', latitude);
    console.log('longitude bixi compn', longitude);
    const data = await fetchStationInfoData();
    console.log('bs info', data);

    return (
        <p>
            Bixi Station
            <br/>
            User coords:
            <br/>
            LAT: {latitude}
            <br/>
            LONG: {longitude}
        </p>
    )
} 