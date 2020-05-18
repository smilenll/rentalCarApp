import React from 'react';
import PropTypes from 'prop-types';
import './search.css';

const Search = ({ q, setQ, setClearFilter }) => (
  <>
    <div className="row">
      <div className="col-lg-8">
        <h6 className="title">Search</h6>
      </div>
      <div className="col-lg-4 text-right">
        <button
        type="button"
        className="clear-filters-btn"
        onClick={() => {
          setClearFilter(true)
        }}
        >Clear all</button>
      </div>
    </div>
    <input
      className="form-control mb-2"
      type="search"
      placeholder="Search"
      aria-label="Search"
      value={q}
      onChange={(e) => {
        setClearFilter(false)
        setQ(e.target.value)}}
    />
  </>
);

Search.propTypes = {
  setQ: PropTypes.func.isRequired,
  setClearFilter: PropTypes.func.isRequired,
};

export default Search;
