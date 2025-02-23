import React, { useState } from "react";

interface WeatherInputProps {
    onAddCity: (city: string) => void;
}

const WeatherInput: React.FC<WeatherInputProps> = ({ onAddCity }) => {
    const [city, setCity] = useState("");

    return (
        <div className="flex gap-2 mb-4">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Введите город"
                style={{ color: "black", placeholderColor: "gray" }}
                className="border p-2 flex-1 rounded-md"
            />
            <button
                onClick={() => {
                    if (city) {
                        onAddCity(city);
                        setCity("");
                    }
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
                Добавить
            </button>
        </div>
    );
};

export default WeatherInput;
