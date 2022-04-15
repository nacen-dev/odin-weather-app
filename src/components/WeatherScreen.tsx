import React, { useEffect, useState } from "react";
import background from "../assets/james-donovan-kFHz9Xh3PPU-unsplash.jpg";
import { Footer } from "./Footer";
import { Loading } from "./Loading/Loading";
import { WeatherHeader } from "./WeatherHeader";
import { round } from "../utils";
import { WeatherContent } from "./WeatherContent";

type Props = {};

export type Weather = {
  [name: string]: any;
};

export type TemperatureUnit = "fahrenheit" | "celsius";

const WeatherScreen = (props: Props) => {
  const [weatherData, setWeatherData] = useState<Weather>();
  const [city, setCity] = useState<string>("");
  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>("celsius");

  const fetchWeather = async (cityName = "Marikina") => {
    try {
      const location = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},PHL&limit=3&appid=27197d7c5f1afaeb5cc9fec999440b71`
      );
      const locationData = await location.json();
      const lat = locationData[0].lat;
      const lon = locationData[0].lon;
      const weather = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely,current&appid=27197d7c5f1afaeb5cc9fec999440b71`
      );
      const weatherData = await weather.json();
      setWeatherData({ ...weatherData, city: locationData[0].name });
    } catch (error) {
      alert("Invalid City")
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const convertToFahrenheit = (celsius: number) => {
    return celsius * (9 / 5) + 32;
  };

  const temperature = (temperatureUnit: TemperatureUnit, temp: number) => {
    return temperatureUnit === "celsius"
      ? `${round(temp, 1)} °C`
      : `${round(convertToFahrenheit(temp), 1)} °F`;
  };

  const onCityNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const onKeyEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    fetchWeather(city);
  };

  const onTemperatureUnitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTemperatureUnit(event.target.value as TemperatureUnit);
  };

  return (
    <div
      className="h-full sm:h-screen bg-no-repeat bg-center bg-cover"
      style={{
        backgroundImage: `linear-gradient(
        to right,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.6)
      ),url(${background})`,
      }}
    >
      {!weatherData ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="h-full grid grid-rows-[auto_1fr_auto] text-white">
          <WeatherHeader
            city={city}
            fetchWeather={fetchWeather}
            onCityNameChange={onCityNameChange}
            temperatureUnit={temperatureUnit}
            onKeyEnter={onKeyEnter}
            onTemperatureUnitChange={onTemperatureUnitChange}
          />
          <WeatherContent
            temperature={temperature}
            weatherData={weatherData}
            temperatureUnit={temperatureUnit}
          />
          <Footer className="bg-neutral-900 flex justify-center items-center p-2" />
        </div>
      )}
    </div>
  );
};

export { WeatherScreen };
