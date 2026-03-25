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

  const [dataColor, setDataColor] = useState("header");
  const [color, setTextColor] = useState("black");
  // determine color from data
  useEffect(() => {
    if (temp[0] < 37) {
      setDataColor("header_normal");
      setTextColor("green");
    } else if (temp[0] >= 37 && temp[0] < 37.5) {
      setDataColor("header_risk");
      setTextColor("gold");
    } else if (temp[0] > 37.5) {
      setDataColor("header_high");
      setTextColor("red");
    }
  }, [temp]);

  return (
    <>
      <center>
        <img
          src={`./${dataColor}.png`}
          alt="An infared temperature sensor pointing at Malaysia."
          className="w-full lg:w-3xl"
        />
      </center>
      <div>
        {" "}
        <h1
          className="text-center"
          style={{
            fontSize: "5em",
            color,
          }}
        >
          {temp.length != 0 ? `${temp?.[0].toFixed(1)}°C` : "..."}
        </h1>
        <h4 className="text-center">
          {temp.length != 0
            ? `Based on results from ${
                temp?.[1]
              } locations. Original non-adjusted temperature is ${temp?.[2].toFixed(
                1,
              )}°C (diff: ${(temp?.[0] ?? 0) - (temp?.[2] ?? 0)}°C)`
            : ""}
        </h4>
        <p className="text-center">
          data from the Malaysian Meteorological Department via{" "}
          <a href="https://data.gov.my">data.gov.my</a>. Used under CC BY 4.0.
          Original images from Wikimedia Commons (
          <a href="https://en.wikipedia.org/wiki/File:Blank_malaysia_map.svg">
            Malaysia map
          </a>
          ,{" "}
          <a href="https://commons.wikimedia.org/wiki/File:Hand_holding_non-contact_infrared_thermometer_checking_a_person_temprature._COVID-19_Concept.jpg">
            Infared temperature sensor
          </a>
          ).{" "}
          <a href="https://github.com/weareblahs/comically_large_thermometer">
            Source code
          </a>
        </p>
      </div>
    </>
  );
}

export default App;
