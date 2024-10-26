import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons in React Leaflet by importing custom icon handling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Sample crime locations with latitude, longitude, and description
const crimeLocations = [
  { lat: 28.7041, lon: 77.1025, description: "Robbery in Delhi" }, // Delhi, India
  { lat: 19.0760, lon: 72.8777, description: "Assault in Mumbai" }, // Mumbai, India
  { lat: 51.5074, lon: -0.1278, description: "Burglary in London" }, // London, UK
  { lat: 40.7128, lon: -74.0060, description: "Fraud in New York" }, // New York, USA
  { lat: -33.8688, lon: 151.2093, description: "Homicide in Sydney" }, // Sydney, Australia
];

const MapComponent = () => {
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default position in India
  const [locationName, setLocationName] = useState(""); // Input for city/area name

  // Function to fetch coordinates from Nominatim API using city/area name
  const updatePositionByLocation = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`
    );
    const data = await response.json();

    if (data.length > 0) {
      const newLatitude = parseFloat(data[0].lat);
      const newLongitude = parseFloat(data[0].lon);
      setPosition([newLatitude, newLongitude]); // Update map position
    } else {
      alert("Location not found. Please enter a valid city or area name.");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          City or Area Name:
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
          />
        </label>
        <button onClick={updatePositionByLocation}>Update Location</button>
      </div>

      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "70vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Display markers for crime locations */}
        {crimeLocations.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lon]}>
            <Popup>{location.description}</Popup>
          </Marker>
        ))}

        {/* Marker for the manually updated position */}
        <Marker position={position}>
          <Popup>Location: {locationName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
