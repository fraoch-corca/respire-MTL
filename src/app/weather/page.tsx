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

