import React from 'react';
import PropTypes from 'prop-types';
import Car from '../../components/car/car';
import './search.css';

const Search = ({ setQ }) => (
  <div className="row">
    <div className="col-lg-12">
      <div className="row">
        <div className="col-4">
          <input
            className="form-control mb-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>
    </div>
    <hr />
  </div>
);

Search.propTypes = {
  setQ: PropTypes.func,
};

export default Search;
