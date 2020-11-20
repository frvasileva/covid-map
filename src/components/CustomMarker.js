import { Marker, Popup } from "react-leaflet";

function CustomMarker(props) {
  var element = props.element;
  return (
    <Marker
      position={[
        element.geometry.coordinates[1],
        element.geometry.coordinates[0],
      ]}
      key={
        "key" +
        (element.geometry.coordinates[1], element.geometry.coordinates[0])
      }
    >
      <Popup
        className="popup-covid-info"
        key={
          "popup" +
          (element.geometry.coordinates[1], element.geometry.coordinates[0])
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
            <strong>{element.properties.active.toLocaleString()}</strong>
          </li>
          <li className="item-info">
            <span>Critical:</span>
            <strong>{element.properties.critical.toLocaleString()}</strong>
          </li>
          <li className="item-info">
            <span>Today cases:</span>
            <strong>{element.properties.todayCases.toLocaleString()}</strong>
          </li>
        </ul>
      </Popup>
    </Marker>
  );
}

export default CustomMarker;
