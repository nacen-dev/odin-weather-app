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
    <header className="grid grid-cols-1 md:grid-cols-[auto-1fr] lg:grid-cols-[1fr_auto] p-4 items-center justify-items-center gap-4">
      <h1 className="text-3xl font-bold">Weather</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-items-center">
        <div className="flex">
          <input
            type="text"
            name="city"
            id="city"
            className="py-1 px-2 text-black rounded-md rounded-r-none"
            value={city}
            onChange={onCityNameChange}
            onKeyDown={onKeyEnter}
            placeholder="City Name"
          />
          <button
            className=" bg-cyan-800 py-1 px-4 rounded-md rounded-l-none"
            type="button"
            onClick={() => fetchWeather(city)}
          >
            Search
          </button>
        </div>

        <div className="ml-2 p-2 flex items-center flex-wrap">
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
