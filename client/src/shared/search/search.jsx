import React from 'react';
import PropTypes from 'prop-types';
import './search.css';

const Search = ({ setQ }) => (
  <>
    <h6>Search</h6>
    <input
      className="form-control mb-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
      onChange={(e) => setQ(e.target.value)}
    />
  </>
);

Search.propTypes = {
  setQ: PropTypes.func.isRequired,
};

export default Search;
