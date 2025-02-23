import React from "react";

interface WeatherButtonsProps {
    setMetric: React.Dispatch<React.SetStateAction<"temp" | "pressure" | "humidity" | "wind">>;
}

const WeatherButtons: React.FC<WeatherButtonsProps> = ({ setMetric }) => {
    return (
        <div className="flex gap-2 mb-4">
            <button onClick={() => setMetric("temp")} className="p-2 border">Температура</button>
            <button onClick={() => setMetric("pressure")} className="p-2 border">Давление</button>
            <button onClick={() => setMetric("humidity")} className="p-2 border">Влажность</button>
            <button onClick={() => setMetric("wind")} className="p-2 border">Ветер</button>
        </div>
    );
};

export default WeatherButtons;

