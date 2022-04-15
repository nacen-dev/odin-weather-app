import React from "react";
import { TemperatureUnit, Weather } from "./WeatherScreen";
import { getDay, unixToDateTime } from "../utils";

type Props = {
  temperature: (tempUnit: TemperatureUnit, temp: number) => string;
  weatherData: Weather;
  temperatureUnit: TemperatureUnit;
};

const WeatherContent = ({
  temperatureUnit,
  temperature,
  weatherData,
}: Props) => {
  return (
    <main className="p-4 grid gap-4 sm:grid-rows-[15%, 25%, 40%, 20%] sm:gap-3">
      <div className="w-full flex items-center justify-center  mb-4">
        <h2 className="text-3xl font-bold">City of {weatherData.city}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-center align-center">
        <div className="text-center">
          <h3 className="text-2xl font-semibold">Temperature</h3>
          <p className="text-xl">
            {temperature(temperatureUnit, weatherData.daily[0].temp.day)}
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold">Humidity</h3>
          <p className="text-xl">{weatherData.daily[0].humidity}%</p>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold">Chance of Rain</h3>
          <p className="text-xl">
            {weatherData.daily[0].rain ? weatherData.daily[0].rain : 0}%
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col">
        <h3 className="text-2xl font-semibold">Weather Forecast</h3>
        <p className="text-xl">
          {weatherData.daily[0].weather[0].description[0].toUpperCase() +
            weatherData.daily[0].weather[0].description.slice(1)}
        </p>
      </div>
      <div>
        <h3 className="text-center text-2xl font-semibold mb-2">
          Daily Forecast
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          {weatherData.daily.slice(1).map((dailyWeather: Weather) => {
            return (
              <div key={dailyWeather.dt} className="text-center">
                <p className="text-xl font-semibold">
                  {getDay(unixToDateTime(dailyWeather.dt))}
                </p>
                <p className="text-lg">
                  {temperature(temperatureUnit, dailyWeather.temp.day)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export { WeatherContent };
