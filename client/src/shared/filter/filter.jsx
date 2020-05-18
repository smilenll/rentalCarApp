import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './filter.css';
import { useEffect } from 'react';

const Filter = ({ availableFilters, setFilter, name, clearFilter, setClearFilter }) => {
  const defaultText = 'Clear';
  const [activeFilter, setActiveFilter] = useState(defaultText);
  useEffect(() => {
    if(clearFilter){
      setActiveFilter(defaultText);
    }
  }, [clearFilter]);
  return (
    <>
      <div className="dropdown col-lg-2">
        <h6>{name}</h6>
        <button className="dropbtn">{activeFilter}</button>
        <div className="dropdown-content">
          <a
            onClick={() => {
              setActiveFilter(defaultText);
              setFilter(false);
            }}
          >
            {defaultText}
          </a>
          {availableFilters
            .map((filter) => (
              <a
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.name);
                  setFilter(filter);
                  setClearFilter(false)
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
