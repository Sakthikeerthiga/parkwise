import React, { useEffect, useState } from 'react';
import { FaWalking } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import ParkingMap from '../components/ParkingMap';

function ParkingList() {
  const location = useLocation();
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');

  // Add fallback images for parking spots with no image_url
  const fallbackImages = [
    process.env.PUBLIC_URL + '/parking1.jpg',
    process.env.PUBLIC_URL + '/parking2.jpg',
    process.env.PUBLIC_URL + '/parking3.jpg',
    process.env.PUBLIC_URL + '/parking4.jpg'
  ];

  useEffect(() => {
    if (location.state) {
      const { lat, lng, vehicleType } = location.state;
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
      fetch(`${backendUrl}/nearby-parking?lat=${lat}&lon=${lng}&radius_km=10&vehicle_type=${vehicleType}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(apiData => {
          // The API returns a simple array, so we map it to the structure our component expects.
          const formattedSpots = apiData
            .map(spot => {
              // Only map if valid lat/lng/latitude/longitude present
              const latitude = spot.latitude ?? spot.lat ?? null;
              const longitude = spot.longitude ?? spot.lng ?? spot.lon ?? null;
              if (
                latitude === null ||
                longitude === null ||
                isNaN(Number(latitude)) ||
                isNaN(Number(longitude))
              ) {
                return null;
              }
              return {
                id: spot.id,
                name: spot.name,
                distance_km: spot.distance_km,
                free_places: spot.free_places,
                image_url: spot.image_url,
                latitude: Number(latitude),
                longitude: Number(longitude),
              };
            })
            .filter(Boolean); // Remove nulls
          setParkingSpots(formattedSpots);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
          setParkingSpots([]);
        });
    } else {
        setLoading(false);
        setError("No location provided to search for parking.");
    }
  }, [location.state]);

  // Sort logic
  let sortedSpots = [...parkingSpots];
  if (sortBy === 'distance') {
    sortedSpots.sort((a, b) => (a.distance_km || Infinity) - (b.distance_km || Infinity));
  } else if (sortBy === 'spaces') {
    const available = sortedSpots.filter(s => s.free_places > 0)
      .sort((a, b) => (b.free_places || 0) - (a.free_places || 0));
    const unavailable = sortedSpots.filter(s => !s.free_places || s.free_places === 0);
    sortedSpots = [...available, ...unavailable];
  }
  // If 'relevance', keep original order

  if (loading) return <div style={{ textAlign: 'center', paddingTop: '10rem' }}>Loading...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', paddingTop: '10rem' }}>Error: {error}</div>;

  // Defensive: Only allow valid selectedSpot
  const validSpots = parkingSpots.filter(
    spot =>
      spot.latitude !== undefined &&
      spot.longitude !== undefined &&
      !isNaN(Number(spot.latitude)) &&
      !isNaN(Number(spot.longitude))
  );
  const validSelectedSpot = selectedSpot &&
    selectedSpot.latitude !== undefined &&
    selectedSpot.longitude !== undefined &&
    !isNaN(Number(selectedSpot.latitude)) &&
    !isNaN(Number(selectedSpot.longitude))
    ? selectedSpot : null;

  console.log('Invalid spots:', parkingSpots.filter(spot => !spot.latitude || !spot.longitude));

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 70px)', backgroundColor: '#f0f2f5' }}>
      {/* Left Panel */}
      <div style={{ width: '40%', overflowY: 'auto', padding: '20px' }}>
     
          {/* Sort by */}
        <div className="d-flex justify-content-end mb-3">
            <select
              className="form-select"
              style={{ width: 'auto' }}
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="distance">Sort by Distance</option>
              <option value="spaces">Sort by Available Space</option>
            </select>
        </div>

        {/* Parking List */}
        <div>
          {sortedSpots.length > 0 ? sortedSpots.map(spot => (
            <div key={spot.id} 
                 className="card mb-3 shadow-sm"
                 onMouseEnter={() => setSelectedSpot(spot)}
                 onMouseLeave={() => setSelectedSpot(null)}
                 style={{cursor: 'pointer', position: 'relative', border: selectedSpot?.id === spot.id ? '2px solid #0d6efd' : 'none' }}>

              <div className="row g-0">
                <div className="col-md-4 d-flex align-items-center justify-content-center p-2">
                  <img
                    src={spot.image_url && spot.image_url.trim() !== "" ? spot.image_url : fallbackImages[spot.id % fallbackImages.length]}
                    className="img-fluid rounded"
                    alt={spot.name}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body d-flex flex-column h-100">
                    <h5 className="card-title">{spot.name || 'Parking Garage'}</h5>
                    
                    <p className={`card-text ${spot.free_places === 0 ? 'text-danger' : 'text-success'}`}>
                        Free Spaces: {spot.free_places !== undefined ? spot.free_places : 'N/A'}
                    </p>
                    
                    <p className="card-text mb-auto">
                        <FaWalking /> 
                        {spot.distance_km ? ` ${(spot.distance_km * 12).toFixed(0)} min` : ''} 
                        ({spot.distance_km ? `${spot.distance_km.toFixed(2)} km` : 'Distance not available'})
                    </p>

                    <div className="d-flex justify-content-end align-items-center mt-2">
                      <button className="btn btn-link text-decoration-none me-2">Details</button>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${spot.lat},${spot.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Directions
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : <p>No parking spots found.</p>}
        </div>
      </div>

      {/* Right Panel: Map */}
      <div style={{ width: '60%', height: '100%' }}>
        <ParkingMap spots={validSpots} selectedSpot={validSelectedSpot} />
      </div>
    </div>
  );
}

export default ParkingList; 