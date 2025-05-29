import { useEffect, useState } from "react";

import "./App.css";
import { tempCheck } from "./scripts/tempCheck";

function App() {
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    async function getData() {
      const data = await tempCheck();
      setTemp(data);
    }

    getData();
  }, []);
  return (
    <>
      <center>
        <img
          src="./header.png"
          alt="An infared temperature sensor pointing at Malaysia."
          className="w-75"
        />
      </center>
      <h1 className="text-center" style={{ fontSize: "5em", color: "green" }}>
        {temp.length != 0 ? `${temp?.[0].toFixed(1)}°C` : "..."}
      </h1>
      <h4 className="text-center">
        {temp.length != 0 ? `based on results from ${temp?.[1]} locations` : ""}
      </h4>
      <p className="text-center">
        data from the Malaysian Meteorological Department via{" "}
        <a href="https://data.gov.my">data.gov.my</a>. Used under CC BY 4.0.
        Original images from Wikimedia Commons (
        <a href="https://en.wikipedia.org/wiki/File:Blank_malaysia_map.svg">
          Malaysia map
        </a>
        ,{" "}
        <a href="https://commons.wikimedia.org/wiki/File:Hand_with_gloves_holding_non-contact_infrared_thermometer_on_blue_background_with_copy_space.jpg">
          Infared temperature sensor
        </a>
        ).{" "}
        <a href="https://github.com/weareblahs/comically_large_thermometer">
          Source code
        </a>
      </p>
    </>
  );
}

export default App;
