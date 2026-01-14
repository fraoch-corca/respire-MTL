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
    weather: Weather[];
    wind: Wind;
    main: Main;
}

const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?lat=45.5088&lon=-73.5878&appid=b98e39bbfd36a8436269e3a3a112e989";
const WEATHER_PROPERTIES = ['main', 'description'];
const WIND_PROPERTIES = ['gust', 'deg', 'speed'];
const MAIN_PROPERTIES = ['temp', 'humidity'];

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
    const response = await fetch(WEATHER_API);

    if (!response.ok) {
        throw new Error('Weather request failed');
    }

    const data: Conditions = await response.json();

    validateData(data);

    // Extract required properties, return as per Conditions interface
    return {
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