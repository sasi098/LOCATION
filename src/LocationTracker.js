import React, { useState } from "react";

const LocationTracker = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState("");

  const getLocation = () => {
    setError("");
    setLocation({ lat: null, lng: null });

    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError(`Error: ${err.message}. Please enable GPS and try again.`);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000, // ⬆ give more time
        maximumAge: 0,
      }
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🌍 My Location</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {location.lat && location.lng ? (
        <div>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
          <a
            href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Google Maps
          </a>
        </div>
      ) : (
        !error && <p>Fetching location...</p>
      )}
      <button onClick={getLocation}>🔄 Retry Location</button>
    </div>
  );
};

export default LocationTracker;
