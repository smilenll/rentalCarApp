import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './filter.css';

const Filter = ({ availableFilters, setFilter, name }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <>
      <div className="dropdown col-lg-2">
        <h6>{name}</h6>
        <button className="dropbtn">{activeFilter}</button>
        <div className="dropdown-content">
          <a
            onClick={() => {
              setActiveFilter('All');
              setFilter(false);
            }}
          >
            All
          </a>
          {availableFilters
            .map((filter) => (
              <a
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.name);
                  setFilter(filter);
                }}
              >
                {filter.name}
              </a>
            ))}
        </div>
      </div>
    </>
  );
};

Filter.propTypes = {
  availableFilters: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
  }).isRequired,
  setFilter: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Filter;
