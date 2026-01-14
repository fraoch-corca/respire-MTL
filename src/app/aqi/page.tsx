import NodeCache from 'node-cache';

interface Main {
  aqi: number;
}

interface ListItem {
  main: Main;
}

interface AirQuality {
  list: ListItem[]; 
}

const AQI_API = "http://api.openweathermap.org/data/2.5/air_pollution?lat=45.5088&lon=-73.5878&appid=b98e39bbfd36a8436269e3a3a112e989";

const aqiCache = new NodeCache();

function validateData (data: AirQuality) {
    const error = "Data does not conform to AirQuality interface";

    if (!data.list || !Array.isArray(data.list) || !data.list.length) {
        throw new Error(error);
    }

    if (!data.list[0].main?.aqi) {
      throw new Error(error);
    }
}

async function fetchAirQualityData(): Promise<number> {
    const cachedData = aqiCache.get<number>("aqiValue");
    
    if (cachedData) {
        console.log('Found AQI cache, ', cachedData);
        return cachedData;
    }

    const response = await fetch(AQI_API);

    if (!response.ok) {
        throw new Error('AQI data fetch fail');
    }

    const data: AirQuality = await response.json();

    validateData(data);

    const aqi = data.list[0].main.aqi;

    aqiCache.set("aqiValue", aqi, 3600);

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