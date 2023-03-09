import React, { useState } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9a0c6342f6920368ab29b5c528e370a5`;

  const searchLocation = (e) => {
    if (e.key == "Enter") {
      axios
        .get(url)
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          value={location}
          onKeyPress={searchLocation}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter City"
        />
      </div>
      {/* container        divided int 2 parts ..... 1.top    2.bottom*/}

      <div className="container">
        {/* <top> */}
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h1>
              {data.main ? (
                <>
                  {Math.floor(data.main.temp - 273.15)} <sup>o</sup>C
                </>
              ) : null}
            </h1>
          </div>
        </div>
        {/* </top> */}

        {/* bottom */}
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">
                {data.main ? (
                  <>{Math.floor(data.main.feels_like - 273.15)}</>
                ) : null}
                <sup>o</sup>C
              </p>
              <p>feels_like</p>
            </div>

            <div className="humidity">
              <p className="bold">
                {data.main ? <>{data.main.humidity}</> : null}%
              </p>
              <p>Humidity</p>
            </div>

            <div className="wind">
              <p className="bold">
                {data.main ? <>{Math.floor(data.wind.speed)}</> : null}KMPH
              </p>
              <p>wind speed</p>
            </div>
          </div>
        )}

        {/* </bottom> */}
      </div>

      {/* </container> */}
    </div>
  );
}

export default App;
