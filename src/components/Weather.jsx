import { useState } from "react";
import sunImg from "../Images/Ellipse 1.png";
import cloudImg from "../Images/Vector.png";
import frameImg from "../Images/Frame.png";


export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const api = {
    key: "22dc920f7c5e49ca160c5de4cd87a173",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const getData = async (e) => {
    e.preventDefault();
    
    if (!city) {
      setError("Please enter a city name!");
      return;
    }
  
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=22dc920f7c5e49ca160c5de4cd87a173`
      );
      const data = await response.json();
      console.log("API Response:", data); // Debugging
  
      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setError("");
        setWeather(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch weather data.");
    }
  };
  
  const dateFunction = (d) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return `${days[d.getDay()]}, ${d.getDate()} ${
      months[d.getMonth()]
    } ${d.getFullYear()}`;
  };

  return (
    <div className="container-weather">
      <div className="head-container">
      <header className="head">
          <p className="date">{dateFunction(new Date())}</p>
      
      <img src={sunImg} alt="" className="sun" />
        </header>
      { weather ? null :
      <div className="welcome">
        <h2 className="welcome-msg">Never get caught in the rain again</h2>
        <p>Stay ahead of the weather with our accurate forecasts</p>
      </div>
      }

    <div className="search-section">
      <div className="search-sect">
        <form action="">
        <input
          type="text"
          className="search"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          />
        <button className="btn-get-weather" onClick={() => getData(event)}>
          Get Weather
        </button>
          </form>
      </div>
          </div>
    </div>

      {error && <p className="error">{error}</p>}

            {weather ? null : 
                <div className="cloud">
                  <img src={cloudImg} alt="" className="cloud-img"/>
              </div>
              } 

      {weather && (
        <div className="weather-container">
            <div className="weather-content">
          <h3 className="city">
            {weather.name}, {weather.sys.country}
          </h3>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="weather">{weather.weather[0].main}</p>
            </div>

          <div className="weather-content2">
            <div className="temprange det">
            <img src={frameImg} alt="" className="weather-icon"/>

                <h5>Temp Range</h5>
          <p className="temp-range">
            {Math.round(weather.main.temp_min)}°C /{" "}
            {Math.round(weather.main.temp_max)}°C
          </p>
            </div>
            <div className="humiditys det">
                <img src={frameImg} alt="" className="weather-icon"/>
                <h5>Humidity</h5>
          <p className="humidity">{weather.main.humidity}%</p>
            </div>

            <div className="pressures det">
              
                <img src={frameImg} alt="" className="weather-icon" />
                <h5>Pressure</h5>
          <p className="pressure">{weather.main.pressure}mBar</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
