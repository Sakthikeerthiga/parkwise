import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCrosshairs, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ParkingMap from '../components/ParkingMap';

const staticSuggestions = [
  { label: 'Use Current Location', icon: <FaCrosshairs className="me-2 text-primary" />, isCurrent: true },
  { label: 'Paris Charles de Gaulle Airport (CDG)', icon: <FaSearch className="me-2" /> },
  { label: 'Paris Expo Porte de Versailles', icon: <FaSearch className="me-2" /> },
  { label: 'La Défense Arena, Nanterre', icon: <FaSearch className="me-2" /> },
  { label: 'Orly (ORY), Paris', icon: <FaSearch className="me-2" /> },
];

function formatDate(date) {
  if (!date) return '';
  return date.toISOString().slice(0, 10);
}

function formatTime(date) {
  if (!date) return '';
  let hour = date.getHours();
  const min = date.getMinutes().toString().padStart(2, '0');
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${min} ${ampm}`;
}

function Home() {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [arriving, setArriving] = useState(new Date());
  const [leaving, setLeaving] = useState(new Date(Date.now() + 2 * 60 * 60 * 1000)); // 2 hours later
  const datePickerRef = useRef(null);
  const now = new Date();
  const navigate = useNavigate();

  // Helper for minTime logic
  function getMinTime(date) {
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) {
      return now;
    }
    return new Date(date.setHours(0, 0, 0, 0));
  }

  function getLeavingMinTime() {
    if (!arriving || !leaving) return now;
    const isSameDay = arriving.toDateString() === leaving.toDateString();
    if (isSameDay) {
      return arriving;
    }
    return new Date(leaving.setHours(0, 0, 0, 0));
  }

  // Helper to determine if a place is selected
  const isPlaceSelected = search && (
    search === 'Use Current Location' ||
    staticSuggestions.some(s => s.label === search)
  );

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClick(e) {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showDropdown]);

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      {/* Hero + Search Section */}
      <section
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{
          minHeight: '60vh',
          background: `url('/parking-bg.jpg') center center/cover no-repeat`,
          position: 'relative',
        }}
      >
        {/* Overlay for readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.75)',
            zIndex: 1,
          }}
        />
        <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '0', position: 'relative', zIndex: 2, maxWidth: 900 }}>
          <h1 className="fw-bold mb-3" style={{ fontSize: '2.5rem', color: '#222', textShadow: '0 2px 8px rgba(255,255,255,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Smart Event-Aware Parking Prediction System
          </h1>
          <p className="lead mb-4" style={{ color: '#222', fontWeight: 500, fontSize: '1.15rem', textShadow: '0 2px 8px rgba(255,255,255,0.5)' }}>
            Predict future parking availability near you based on real-time data and city events
          </p>

          {/* Search Field */}
          <div className="mb-4 position-relative" style={{ maxWidth: 540, margin: '0 auto' }}>
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-white border-end-0"><FaSearch /></span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Where are you going?"
                value={search}
                onChange={e => { setSearch(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                style={{ borderLeft: 0 }}
                autoComplete="off"
              />
              {search && (
                <button
                  className="btn btn-link px-2"
                  style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', zIndex: 11, color: '#888' }}
                  tabIndex={-1}
                  onClick={() => { setSearch(''); setShowDropdown(false); }}
                >
                  &times;
                </button>
              )}
            </div>
            {showDropdown && (
              <div ref={datePickerRef} className="shadow rounded position-absolute w-100 bg-white border mt-1" style={{ zIndex: 10, padding: '0.5rem 0.5rem 0.5rem 0.5rem', left: 0, top: '110%' }}>
                {/* Use Current Location always shown */}
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <button
                    className="dropdown-item d-flex align-items-center py-2 mb-0"
                    style={{ fontWeight: 600, color: '#1976d2', background: 'transparent', border: 'none', outline: 'none', paddingLeft: 0 }}
                    onMouseDown={() => { setSearch('Use Current Location'); setShowDropdown(false); }}
                  >
                    <FaCrosshairs className="me-2 text-primary" />
                    <span>Use Current Location</span>
                  </button>
                </div>
                {/* Places label and suggestions */}
                {search.trim() && staticSuggestions.filter(s => !s.isCurrent && s.label.toLowerCase().includes(search.toLowerCase())).length > 0 && (
                  <>
                    <div className="px-3 pt-2 pb-1 text-secondary text-start" style={{ fontSize: '1rem', fontWeight: 500 }}>Places</div>
                    <div style={{ maxHeight: 180, overflowY: 'auto' }}>
                      {staticSuggestions.filter(s => !s.isCurrent && s.label.toLowerCase().includes(search.toLowerCase())).map((s, idx) => {
                        // Bold the matching part
                        const matchIdx = s.label.toLowerCase().indexOf(search.toLowerCase());
                        let before = s.label.slice(0, matchIdx);
                        let match = s.label.slice(matchIdx, matchIdx + search.length);
                        let after = s.label.slice(matchIdx + search.length);
                        return (
                          <button
                            key={idx}
                            className="dropdown-item d-flex align-items-center py-2"
                            style={{ fontWeight: 400, color: '#222', background: 'transparent', border: 'none', outline: 'none', paddingLeft: 0 }}
                            onMouseDown={() => { setSearch(s.label); setShowDropdown(false); }}
                          >
                            {s.icon}
                            <span>
                              {before}<b>{match}</b>{after}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
                <div className="px-3 pt-2 text-end" style={{ fontSize: '0.9rem', color: '#888' }}>
                  powered by <span style={{ color: '#4285F4', fontWeight: 700 }}>G</span><span style={{ color: '#EA4335', fontWeight: 700 }}>o</span><span style={{ color: '#FBBC05', fontWeight: 700 }}>o</span><span style={{ color: '#4285F4', fontWeight: 700 }}>g</span><span style={{ color: '#34A853', fontWeight: 700 }}>l</span><span style={{ color: '#EA4335', fontWeight: 700 }}>e</span>
                </div>
              </div>
            )}
          </div>

          {/* Arriving and Leaving Pickers - always reserve space, fade in/out */}
          <div style={{ minHeight: 220, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <div
              style={{
                width: '100%',
                maxWidth: 540,
                opacity: isPlaceSelected ? 1 : 0,
                pointerEvents: isPlaceSelected ? 'auto' : 'none',
                transition: 'opacity 0.3s',
                position: 'relative',
              }}
            >
              {isPlaceSelected && (
                <>
                  <div className="d-flex flex-column flex-md-row gap-2 justify-content-center align-items-stretch" style={{ marginBottom: '2.5rem' }}>
                    {/* Arriving */}
                    <div className="flex-fill bg-white rounded shadow-sm p-3 d-flex flex-column align-items-center" style={{ minWidth: 220 }}>
                      <div className="text-muted mb-2" style={{ fontWeight: 500 }}>Arriving</div>
                      <DatePicker
                        selected={arriving}
                        onChange={date => setArriving(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd h:mm aa"
                        className="form-control text-center"
                        calendarClassName="w-100"
                        minDate={now}
                        minTime={getMinTime(arriving)}
                        maxTime={new Date(arriving.setHours(23, 59, 59, 999))}
                      />
                    </div>
                    {/* Leaving */}
                    <div className="flex-fill bg-white rounded shadow-sm p-3 d-flex flex-column align-items-center" style={{ minWidth: 220 }}>
                      <div className="text-muted mb-2" style={{ fontWeight: 500 }}>Leaving</div>
                      <DatePicker
                        selected={leaving}
                        onChange={date => setLeaving(date)}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd h:mm aa"
                        className="form-control text-center"
                        calendarClassName="w-100"
                        minDate={arriving || now}
                        minTime={getLeavingMinTime()}
                        maxTime={new Date(leaving.setHours(23, 59, 59, 999))}
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary btn-lg w-100 rounded-pill fw-semibold" style={{ fontSize: '1.25rem' }}
                    onClick={() => navigate('/parking-list')}
                  >
                    Find Parking Spots
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="fw-bold mb-4" style={{ fontSize: '2.3rem', textAlign: 'center' }}>How ParkWise Works</h2>
          <div className="row text-center gy-5 gx-4 justify-content-center">
            <div className="col-12 col-md-4 d-flex flex-column align-items-center">
              {/* Clock Icon SVG */}
              <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: 70 }}>
                <span style={{ background: '#1976d2', borderRadius: '50%', padding: 18, display: 'inline-flex' }}>
                  <svg width="34" height="34" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff"/><path d="M12 6v6l4 2" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
              <h5 className="fw-bold mb-2">Save Time, Reduce Stress</h5>
              <div className="text-secondary" style={{ fontSize: '1.05rem' }}>Reduce parking availability while commuting.</div>
            </div>
            <div className="col-12 col-md-4 d-flex flex-column align-items-center">
              {/* Calendar Icon SVG */}
              <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: 70 }}>
                <span style={{ background: '#1976d2', borderRadius: '50%', padding: 18, display: 'inline-flex' }}>
                  <svg width="34" height="34" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff"/><rect x="7" y="9" width="10" height="7" rx="2" stroke="#1976d2" strokeWidth="2"/><path d="M8 7v2M16 7v2" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
              </div>
              <h5 className="fw-bold mb-2">Event-Aware Forecasting</h5>
              <div className="text-secondary" style={{ fontSize: '1.05rem' }}>Rapidly push alerts anytime to relevant on-horizon time event automatically.</div>
            </div>
            <div className="col-12 col-md-4 d-flex flex-column align-items-center">
              {/* City Icon SVG */}
              <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: 70 }}>
                <span style={{ background: '#1976d2', borderRadius: '50%', padding: 18, display: 'inline-flex' }}>
                  <svg width="34" height="34" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff"/><rect x="7" y="13" width="3" height="4" fill="#1976d2"/><rect x="14" y="10" width="3" height="7" fill="#1976d2"/><rect x="11" y="7" width="2" height="10" fill="#1976d2"/></svg>
                </span>
              </div>
              <h5 className="fw-bold mb-2">Sustainable City Mobility</h5>
              <div className="text-secondary" style={{ fontSize: '1.05rem' }}>Strick smarter, lastmile unneeding spotlight ahead.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Parking Spots section */}
      <section className="py-5" style={{ background: '#f6f6f6' }}>
        <div className="w-100 px-0">
          <div className="row g-0 bg-white rounded-4 shadow-sm align-items-center overflow-hidden mx-0" style={{ minHeight: 320, padding: '39px' }}>
            {/* Image on the left */}
            <div className="col-12 col-md-5 d-flex justify-content-center align-items-center p-0" style={{ background: '#f3f3f3' }}>
              <img src="/eiffel.jpg" alt="Eiffel Tower Paris" style={{ width: '100%', height: '100%', maxHeight: 400, objectFit: 'cover' }} />
            </div>
            {/* Text and parking list on the right */}
            <div className="col-12 col-md-7 p-4 p-md-5">
              <h3 className="fw-bold mb-2" style={{ fontSize: '2rem', color: '#222' }}>Popular Parking Spots</h3>
              <div className="mb-3" style={{ fontSize: '1.15rem', color: '#444' }}>
                Enjoy the convenience of booking a parking spot at the venue ahead of time, ensuring you have a space when you arrive for games, concerts, and more.
              </div>
              <div className="mb-4" style={{ maxWidth: 400 }}>
                <a href="#" className="d-block mb-3 fw-semibold text-primary" style={{ fontSize: '1.15rem', textDecoration: 'underline' }}>Book Madison Square Garden Parking</a>
                <a href="#" className="d-block mb-3 fw-semibold text-primary" style={{ fontSize: '1.15rem', textDecoration: 'underline' }}>Book Oracle Park Stadium Parking</a>
                <a href="#" className="d-block mb-3 fw-semibold text-primary" style={{ fontSize: '1.15rem', textDecoration: 'underline' }}>Book SoFi Stadium Parking</a>
                <a href="#" className="d-block mb-3 fw-semibold text-primary" style={{ fontSize: '1.15rem', textDecoration: 'underline' }}>Book Soldier Field Parking</a>
                <a href="#" className="d-block mb-3 fw-semibold text-primary" style={{ fontSize: '1.15rem', textDecoration: 'underline' }}>Book TD Garden Parking</a>
                <a href="#" className="d-block mb-4 fw-semibold text-primary" style={{ fontSize: '1.15rem', textDecoration: 'underline' }}>Book Rogers Centre Parking</a>
              </div>
              <button className="btn btn-primary btn-lg rounded-pill fw-semibold px-5" style={{ fontSize: '1.15rem' }}>
                View All Parking
              </button>
            </div>
          </div>
        </div>
      </section>
      <ParkingMap />
    </div>
  );
}

export default Home; 


