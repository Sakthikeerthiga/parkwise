import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// Fix default icon issue with Leaflet in React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Static parking locations (Paris)
const parkingSpots = [
  { id: 1, name: 'Parking Indigo Paris Haussmann', lat: 48.872, lng: 2.332 },
  { id: 2, name: 'Parking Saint-Lazare', lat: 48.876, lng: 2.326 },
  { id: 3, name: 'Parking Opéra-Meyerbeer', lat: 48.872, lng: 2.332 },
  { id: 4, name: 'Parking Madeleine-Tronchet', lat: 48.870, lng: 2.324 },
  { id: 5, name: 'Parking Vinci Park', lat: 48.866, lng: 2.331 },
];

export default function ParkingMap() {
  return (
    <section className="py-5" style={{ background: '#e9f5ff' ,paddingTop: '0px !important',paddingBottom: '0px !important'}}>
      <div className="container-fluid px-0">
        {/* <h2 className="fw-bold mb-4 text-center" style={{ fontSize: '2.1rem' }}>Nearby Parking Map</h2> */}
        <div style={{ width: '100%', height: '420px' }}>
          <MapContainer center={[48.870, 2.332]} zoom={13} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {parkingSpots.map(spot => (
              <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={DefaultIcon}>
                <Popup>
                  <b>{spot.name}</b>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
} 