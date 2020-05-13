import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

const Filter = ({ availableFilters, setFilter, name }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <>
      <div className="col-lg-2">
        <h6>{name}</h6>
        <DropdownButton
          id={`dropdown-variants-${name}`}
          variant="info"
          title={activeFilter}
          block
        >
          <Dropdown.Item
            onClick={() => {
              setActiveFilter('All');
              setFilter(false);
            }}
          >
            All
          </Dropdown.Item>
          {availableFilters
            .map((filter) => (
              <Dropdown.Item
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.name);
                  setFilter(filter);
                }}
              >
                {filter.name}
              </Dropdown.Item>
            ))}
        </DropdownButton>
        {' '}
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
