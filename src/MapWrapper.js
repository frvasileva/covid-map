import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { useState } from "react";
import CustomMarker from "./components/CustomMarker";
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
                    <CustomMarker element={element} />
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
