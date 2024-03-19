import React, { useState } from "react";
import './Weather.css';
const api = {
  key: "1bc0a807f2a888e63e672495f9a336a4",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setquery] = useState("");
  const [weather, setweather] = useState({});
  const dateBuilder = (d) => {
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "october",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuseday",
      "Wednesday",
      "Thrusday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setweather(result);
          setquery("");
          console.log(result);
        });
    }
  };
  return (
    <div className="super">
    <div className= {(typeof weather.main!="undefined")?((weather.main.temp>16)?'app warm':'app cold'):'normal'}>
      <h1 className="heading">open weather</h1>
      <main>
        <div className="search-box">
          <input
            type="text"
            name=""
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={(e) => setquery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div className="loco-box-main">
            <div className="location-box">
              <div className="location"> {weather.name},{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
            </div>
            <div className="weather">
              {weather.weather[0].main}
            </div>
          </div>
        ) : (
          " "
        )}
      </main>
    </div>
    </div>
  );
};

export default Weather;
