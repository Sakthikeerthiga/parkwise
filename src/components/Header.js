import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <span className="me-2" style={{fontSize: '1.5rem'}}>
            <span role="img" aria-label="car">🚗</span>
          </span>
          ParkWise
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item mx-2">
              <a className="nav-link fw-semibold" href="#">FIND PARKING</a>
            </li>
            <li className="nav-item mx-2">
              <a className="nav-link fw-semibold" href="#">ABOUT</a>
            </li>
            <li className="nav-item mx-2">
              <a className="btn btn-primary px-4 fw-semibold" href="#">LOGIN</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header; 