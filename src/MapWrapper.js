import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import axios from "axios";
import { useState, useEffect } from "react";

function MapWrapper() {
  const [jsonDataState, setJsonData] = useState(null);
  var geoJson;

  async function mapEffect({ leafletElement: map } = {}) {
    let response;

    try {
      console.log("axios call");
      response = await axios
        .get("https://corona.lmao.ninja/v2/countries")
        .then((response) => {
          debugger;
          const { data = [] } = response;
          const hasData = Array.isArray(data) && data.length > 0;

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

  if (!jsonDataState) return <div></div>;
  else
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="wrapper">
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={true}
                className="map-wrapper"
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {jsonDataState.features.map((element) => (
                  <div>
                    <Circle
                      center={[
                        parseInt(element.geometry.coordinates[0]),
                        parseInt(element.geometry.coordinates[1]),
                      ]}
                      radius={500}
                      fillOpacity={0.5}
                      fillColor={"red"}
                      stroke={false}
                      key={
                        "key-" +
                        element.geometry.coordinates[0] +
                        element.geometry.coordinates[1]
                      }
                    ></Circle>
                    <span>
                      {[
                        element.geometry.coordinates[0],
                        element.geometry.coordinates[1],
                      ]}
                    </span>
                  </div>
                ))}

                <Circle
                  center={[51.505, -0.09]}
                  radius={500}
                  fillOpacity={0.5}
                  fillColor={"red"}
                  stroke={false}
                ></Circle>

                <Circle
                  center={[51.52, -0.09]}
                  radius={500}
                  fillOpacity={0.5}
                  fillColor={"blue"}
                  stroke={false}
                ></Circle>

                <Marker position={[51.505, -0.09]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    );
}

export default MapWrapper;
