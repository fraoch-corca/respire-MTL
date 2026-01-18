import { getLocale } from "next-intl/server";
import NodeCache from 'node-cache';

interface Weather {
    main: string;
    description: string;
}

interface Wind {
    speed: number;
    deg: number;
    gust?: number;
}

interface Main {
    temp: number;
    humidity: number;
}

interface Conditions {
    weather: Weather[];
    wind: Wind;
    main: Main;
}

const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?lat=45.5088&lon=-73.5878&appid=b98e39bbfd36a8436269e3a3a112e989";
const WEATHER_PROPERTIES = ['main', 'description'];
const MAIN_PROPERTIES = ['temp', 'humidity'];
const WIND_PROPERTIES = ['deg', 'speed']; // gust isn't always in the request payload

// const weatherCache = new NodeCache();

function validateData (data: Conditions) {
    if (!data.weather || !Array.isArray(data.weather) || !data.weather.length) {
        throw new Error('data Weather does not conform to Conditions interface');
    }

    WEATHER_PROPERTIES.forEach((property) => {
        if (!data.weather[0].hasOwnProperty(property)) {
            throw new Error(`Expected Weather ${property} for Conditions interface`);
        }
    });

    WIND_PROPERTIES.forEach((property) => {
        if (!data.wind.hasOwnProperty(property)) {
            throw new Error(`Expected Wind ${property} for Conditions interface`);
        }
    });

    MAIN_PROPERTIES.forEach((property) => {
        if (!data.main.hasOwnProperty(property)) {
            throw new Error(`Expected Main ${property} for Conditions interface`);
        }
    });
}

async function fetchWeatherData(): Promise<Conditions> {
    // should check here for fetched data?

    const locale = await getLocale();
    const api = locale === 'fr' ? `${WEATHER_API}&lang=fr` : WEATHER_API;
    const response = await fetch(api, { next: { revalidate: 3600 }});

    if (!response.ok) {
        throw new Error('Weather request failed');
    }

    const data: Conditions = await response.json();

    validateData(data);

    const weatherData = {
        weather: data.weather.map((w: Weather) => ({
            main: w.main,
            description: w.description,
        })),
        wind: {
            speed: data.wind.speed,
            deg: data.wind.deg,
            gust: data.wind.gust,
        },
        main: {
            temp: data.main.temp,
            humidity: data.main.humidity,
        },
    };

    return weatherData;
}

export default async function WeatherPage() {

    const data = await fetchWeatherData();

    return ( 
        <p>
            Weather: {data.weather[0].description}
        </p>
    )
}