import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useState } from "react";
import "./MapWrapper.scss";

function MapWrapper(props) {
  var data = props.covidData;
  const [mapCenter] = useState(props.mapCenter);

  if (!data) return <div></div>;
  else
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="wrapper">
              <MapContainer
                center={mapCenter}
                zoom={7}
                scrollWheelZoom={true}
                className="map-wrapper"
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data.features.map((element) => (
                  <div>
                    <Circle
                      center={[
                        element.geometry.coordinates[1],
                        element.geometry.coordinates[0],
                      ]}
                      radius={element.properties.activePerOneMillion}
                      metric={true}
                      fillOpacity={0.5}
                      fillColor={"red"}
                      stroke={false}
                      key={
                        (element.geometry.coordinates[1],
                        element.geometry.coordinates[0])
                      }
                    />

                    <Marker
                      position={[
                        element.geometry.coordinates[1],
                        element.geometry.coordinates[0],
                      ]}
                      key={
                        "key" +
                        (element.geometry.coordinates[1],
                        element.geometry.coordinates[0])
                      }
                    >
                      <Popup
                        className="popup-covid-info"
                        key={
                          "popup" +
                          (element.geometry.coordinates[1],
                          element.geometry.coordinates[0])
                        }
                      >
                        <img
                          src={element.properties.countryInfo.flag}
                          className="popup-country-flag"
                        />
                        {element.properties.country} <br />
                        <ul className="covid-info-list">
                          <li className="item-info">
                            <span>Active:</span>
                            <strong>
                              {element.properties.active.toLocaleString()}
                            </strong>
                          </li>
                          <li className="item-info">
                            <span>Critical:</span>
                            <strong>
                              {element.properties.critical.toLocaleString()}
                            </strong>
                          </li>
                          <li className="item-info">
                            <span>Today cases:</span>
                            <strong>
                              {element.properties.todayCases.toLocaleString()}
                            </strong>
                          </li>
                        </ul>
                      </Popup>
                    </Marker>
                  </div>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    );
}

export default MapWrapper;
