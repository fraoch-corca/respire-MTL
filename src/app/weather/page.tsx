// import NodeCache from 'node-cache';

interface Weather {
    main: string;
    description: string;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number
}

interface Main {
    temp: number;
    humidity: number;
}

interface Conditions {
    weather: Weather;
    wind: Wind;
    main: Main;
}

const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?lat=45.5088&lon=-73.5878&appid=b98e39bbfd36a8436269e3a3a112e989";

async function fetchWeatherData(): Promise<Conditions> {
    
    const response = await fetch(WEATHER_API);

    if (!response.ok) {
        throw new Error('Weather request failed');
    }

    const data: Conditions = await response.json();

    console.log('conditions ', data);

    return data;
}

export default async function WeatherPage() {
    const weather = await fetchWeatherData();

    console.log('weather data ', weather);

    return ( 
        <p>
            Weather data here
        </p>
    )
}