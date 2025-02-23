import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";


export interface ForecastItem {
    time: string;
    temp: number;
    pressure: number;
    humidity: number;
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
}


interface WeatherChartProps {
    weatherData: { [city: string]: ForecastItem[] };
    metric: "temp" | "pressure" | "humidity" | "wind";
    isDailyView: boolean;
}


const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d84315"];

const WeatherChart: React.FC<WeatherChartProps> = ({ weatherData, metric, isDailyView }) => {
    const allTimestamps = Array.from(
        new Set(
            Object.values(weatherData)
                .flat()
                .map((item) => item.time)
        )
    ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const combinedData = allTimestamps.map((time) => {
        const entry: Record<string, any> = { time };
        Object.keys(weatherData).forEach((city) => {
            let filteredItem: ForecastItem | undefined;

            if (isDailyView) {
                filteredItem = weatherData[city].find(
                    (item) => item.time === time && new Date(item.time).getHours() === 12
                );
            } else {
                const hour = new Date(time).getHours();
                if (hour % 3 === 0) {
                    filteredItem = weatherData[city].find((item) => item.time === time);
                }
            }

            if (filteredItem) {
                entry[city] = metric === 'wind' ? filteredItem.wind?.speed : filteredItem[metric];
            } else {
                entry[city] = null;
            }
        });
        return entry;
    });

    console.log("combinedData:", combinedData);
    console.log("weatherData:", weatherData);

    return (
        <div className="p-4 mx-auto max-w-3xl">
            <h2 className="text-lg font-bold mb-2 text-center">Сравнение погоды</h2>
            <div className="w-full max-w-[90%] mr-4">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={combinedData}>
                        <XAxis
                            dataKey="time"
                            tickFormatter={(time) =>
                                new Date(time).toLocaleDateString("ru-RU", {
                                    day: "2-digit",
                                    month: "short",
                                })
                            }
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        {Object.keys(weatherData).map((city, index) => {
                            const cityData = combinedData.map(entry => entry[city]);

                            if (cityData.every(value => value === null)) {
                                return null;
                            }

                            return (
                                <Line
                                    key={city}
                                    type="monotone"
                                    dataKey={city}
                                    stroke={COLORS[index % COLORS.length]}
                                    name={city}
                                    connectNulls={true}
                                />
                            );
                        })}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WeatherChart;
