import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CovidTableInfo from "./CovidTableInfo";

import MapWrapper from "./MapWrapper";

function App() {
  const [jsonDataState, setJsonData] = useState(null);
  var geoJson;

  async function mapEffect({ leafletElement: map } = {}) {
    let response;

    try {
      console.log("axios call");
      response = await axios
        .get("https://corona.lmao.ninja/v2/countries")
        .then((response) => {
          const { data = [] } = response;
          const hasData = Array.isArray(data) && data.length > 0;
          console.log("response", response.data);
          if (!hasData) return;

          geoJson = {
            type: "FeatureCollection",
            features: data.map((country = {}) => {
              const { countryInfo = {} } = country;
              const { lat, long: lng } = countryInfo;
              return {
                type: "Feature",
                properties: {
                  ...country,
                },
                geometry: {
                  type: "Point",
                  coordinates: [lng, lat],
                },
              };
            }),
          };

          setJsonData(geoJson);
          console.log("jsonDataState", jsonDataState);
        });
    } catch (e) {
      console.log(`Failed to fetch countries: ${e.message}`, e);
      return;
    }
  }

  useEffect(() => {
    mapEffect();
  }, []);

  if (!jsonDataState) return <div>Loading...</div>;
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="app-title">Covid information</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <MapWrapper covidData={jsonDataState} />
            <CovidTableInfo covidData={jsonDataState} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
