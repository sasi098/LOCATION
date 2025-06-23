import React, { useEffect, useState } from "react";

const LocationTracker = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError("");
      },
      (err) => {
        setError(`Error: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

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
    </div>
  );
};

export default LocationTracker;
