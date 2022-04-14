import React, { useEffect, useState } from "react";
import background from "../assets/james-donovan-kFHz9Xh3PPU-unsplash.jpg";
import { Footer } from "./Footer";
import { Loading } from "./Loading/Loading";
import { WeatherHeader } from "./WeatherHeader";

type Props = {};

type Weather = {
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
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},PHL&limit=3&appid=27197d7c5f1afaeb5cc9fec999440b71`
      );
      const locationData = await location.json();
      const lat = locationData[0].lat;
      const lon = locationData[0].lon;
      const weather = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely,current&appid=27197d7c5f1afaeb5cc9fec999440b71`
      );
      const weatherData = await weather.json();
      setWeatherData(weatherData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const convertTemperature = (temperature: number, unit: TemperatureUnit) => {
    if (unit === "celsius") {
      return temperature * (9 / 5) + 32;
    } else if (unit === "fahrenheit") {
      return (temperature - 32) * (5 / 9);
    }
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

  const unixToDateTime = (unixTimeStamp: number) => {
    return new Date(unixTimeStamp * 1000);
  };

  return (
    <div
      className="h-screen bg-no-repeat bg-center bg-cover"
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
        <div className="h-full grid grid-rows-[10%_80%_10%] text-white">
          <WeatherHeader
            city={city}
            fetchWeather={fetchWeather}
            onCityNameChange={onCityNameChange}
            temperatureUnit={temperatureUnit}
            onKeyEnter={onKeyEnter}
            onTemperatureUnitChange={onTemperatureUnitChange}
          />
          <main className="p-4">
            <div className="w-full flex items-center justify-center text-2xl font-bold">
              City Name
            </div>
            <div className="grid grid-cols-3">
              <div>
                <p>Temperature</p>
                <p>31°C</p>
              </div>
              <div>
                <p>Humidity</p>
                <p>67%</p>
              </div>
              <div>
                <p>Chance of Rain</p>
                <p>0.7%</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              Weather Description
            </div>
            <div className="grid grid-cols-7">
              <div>
                <p>Monday</p>
                <p>34°C</p>
              </div>

              <div>
                <p>Tuesday</p>
                <p>26°C</p>
              </div>

              <div>
                <p>Wednesday</p>
                <p>25°C</p>
              </div>

              <div>
                <p>Thursday</p>
                <p>33°C</p>
              </div>
              <div>
                <p>Friday</p>
                <p>35°C</p>
              </div>
              <div>
                <p>Saturday</p>
                <p>36°C</p>
              </div>
              <div>
                <p>Sunday</p>
                <p>30°C</p>
              </div>
            </div>
          </main>
          <Footer className="bg-neutral-900 flex justify-center items-center p-2" />
        </div>
      )}
    </div>
  );
};

export { WeatherScreen };
