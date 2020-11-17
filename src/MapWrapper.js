import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

function MapWrapper(){
    axios.get(`https://corona.lmao.ninja/v2/countries`).then((res) => {
        const persons = res.data;
        console.log(persons);
      });

      
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