import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-2 mb-md-0">
          <span className="fw-bold">ParkWise</span> &copy; {new Date().getFullYear()} All rights reserved.
        </div>
        <div>
          <a href="#" className="text-light me-3 text-decoration-none">Privacy Policy</a>
          <a href="#" className="text-light me-3 text-decoration-none">Terms of Service</a>
          <a href="#" className="text-light text-decoration-none">Contact</a>
        </div>
      </div>
    </footer>
  );
} 