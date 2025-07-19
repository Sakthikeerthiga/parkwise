import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import ParkingList from './pages/ParkingList';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parking-list" element={<ParkingList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
