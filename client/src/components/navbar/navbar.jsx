import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark">
    <div className="container">
      <a className="navbar-brand" href="/">SML rent</a>
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
          <li className="nav-item ">
            <NavLink activeClassName="active" className="nav-link" to="/">Dashboard</NavLink>
          </li>
          <li className="nav-item ">
            <NavLink activeClassName="active" className="nav-link" to="/cars">Cars</NavLink>
          </li>
        </ul>
        <form className="form-inline mt-2 mt-md-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
);

export default Navbar;
