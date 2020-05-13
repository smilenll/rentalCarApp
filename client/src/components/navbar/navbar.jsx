import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-md navbar-light bg-light">
    <div className="container">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/dashboard">Dashboard</NavLink>
          </li>
          <li className="nav-item ">
            <NavLink activeClassName="active" cars="goToAllCars" className="nav-link" to="/cars">Cars</NavLink>
          </li>
          <li className="nav-item ">
            <NavLink activeClassName="active" className="nav-link" to="/amortization">Amortization</NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
