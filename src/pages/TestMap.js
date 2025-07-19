import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

export default function TestMap() {
  const [viewport, setViewport] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 13,
    width: '100%',
    height: 400,
  });

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2xvY2F0aW9uYXBpIn0.abc123..."
        onViewportChange={setViewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker latitude={48.8566} longitude={2.3522}>
          <div style={{ color: '#e53935', fontSize: 32 }}>📍</div>
        </Marker>
      </ReactMapGL>
    </div>
  );
}
