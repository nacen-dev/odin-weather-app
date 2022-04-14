import React from "react";
import { TemperatureUnit } from "./WeatherScreen";

type Props = {
  city: string;
  temperatureUnit: TemperatureUnit;
  onCityNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  fetchWeather: (city: string) => void;
  onTemperatureUnitChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const WeatherHeader = ({
  city,
  temperatureUnit,
  onCityNameChange,
  onKeyEnter,
  fetchWeather,
  onTemperatureUnitChange,
}: Props) => {
  return (
    <header className="flex px-3 py-2 items-center justify-between">
      <h1 className="text-3xl font-bold">Weather</h1>

      <div className="flex items-center gap-3">
        <label htmlFor="city" className="text-2xl">
          City
        </label>
        <div>
          <input
            type="text"
            name="city"
            id="city"
            className="py-1 px-2 text-black rounded-md rounded-r-none"
            value={city}
            onChange={onCityNameChange}
            onKeyDown={onKeyEnter}
          />
          <button
            className=" bg-cyan-800 py-1 px-4 rounded-md rounded-l-none"
            type="button"
            onClick={() => fetchWeather(city)}
          >
            Search
          </button>
        </div>

        <div className="ml-2 p-2 flex items-center">
          <p className="text-xl mr-2">Display</p>
          <ul className="flex items-center">
            <li>
              <input
                type="radio"
                name="temperature-unit"
                id="celsius"
                className="peer opacity-0 absolute"
                checked={temperatureUnit === "celsius"}
                value="celsius"
                onChange={onTemperatureUnitChange}
              />
              <label
                htmlFor="celsius"
                className="px-3 text-xl cursor-pointer peer-checked:bg-cyan-300 peer-checked:text-slate-800 bg-cyan-800"
              >
                °C
              </label>
            </li>
            <li>
              <input
                type="radio"
                name="temperature-unit"
                id="fahrenheit"
                className="peer opacity-0 absolute"
                checked={temperatureUnit === "fahrenheit"}
                value="fahrenheit"
                onChange={onTemperatureUnitChange}
              />
              <label
                htmlFor="fahrenheit"
                className="px-3 text-xl cursor-pointer peer-checked:bg-cyan-300 peer-checked:text-slate-800 bg-cyan-800"
              >
                °F
              </label>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export { WeatherHeader };
