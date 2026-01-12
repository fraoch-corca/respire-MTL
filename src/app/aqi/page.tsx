// import NodeCache from 'node-cache';

interface Main {
  aqi: number;
}

interface ListItem {
  main: Main;
}

interface AirQualityResponse {
  list: ListItem[]; 
}

const AQI_API = "http://api.openweathermap.org/data/2.5/air_pollution?lat=45.5088&lon=-73.5878&appid=b98e39bbfd36a8436269e3a3a112e989";

// const aqiCache = new NodeCache();

async function fetchAirQualityData(): Promise<number> {
    // const cachedData = aqiCache.get<AirQualityResponse[]>("apiData");
    // if (cachedData) {
    //     return cachedData;
    // }

    const response = await fetch(AQI_API);

    if (!response.ok) {
        throw new Error('AQI data fetch fail');
    }

    const data: AirQualityResponse = await response.json();

    console.log('les data sont ', data);

    const aqi = data.list[0]?.main.aqi;
    return aqi;
}

export default async function AQIPage() {
    const aqi = fetchAirQualityData();

    return (
        <p>
            Air quality is {aqi}
        </p>
    )
}