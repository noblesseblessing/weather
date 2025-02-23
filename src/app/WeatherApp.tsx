'use client'

import React, { useState } from "react";
import axios from "axios";
import WeatherInput from "./WeatherInput";
import WeatherButtons from "./WeatherButtons";
import WeatherChart, {ForecastItem} from "./WeatherChart";


const WeatherApp: React.FC = () => {
    const [cities, setCities] = useState<string[]>([]);
    const [weatherData, setWeatherData] = useState<{ [city: string]: ForecastItem[] }>({});
    const [metric, setMetric] = useState<"temp" | "pressure" | "humidity" | "wind">("temp");
    const [isDailyView, setIsDailyView] = useState<boolean>(false);

    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    const fetchWeatherData = async (city: string) => {
        if (!city) return;
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
            );
            const forecastData: ForecastItem[] = response.data.list.map((item: any) => ({
                time: new Date(item.dt_txt).toISOString(),
                temp: item.main.temp,
                pressure: item.main.pressure,
                humidity: item.main.humidity,
                wind: item.wind
            })).sort((a: { time: string | number | Date; }, b: { time: string | number | Date; }) => new Date(a.time).getTime() - new Date(b.time).getTime());


            setWeatherData((prevData) => ({ ...prevData, [city]: forecastData }));
            if (!cities.includes(city)) {
                setCities([...cities, city]);
            }
        } catch (error) {
            console.log("Ошибка при загрузке данных", error);
            console.log("Api key", API_KEY);

        }
    };

    return (
        <div className="p-4 max-w-3xl mx-auto px-4 sm:px-8 md:px-16">
            <WeatherInput onAddCity={fetchWeatherData} />

            <WeatherChart weatherData={weatherData} metric={metric} isDailyView={isDailyView} />

                <WeatherButtons setMetric={setMetric} />

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setIsDailyView((prev) => !prev)}
                >
                    {isDailyView ? "Показать каждые 3 часа" : "Показать 5 дней"}
                </button>
            </div>
    );
};

export default WeatherApp;
