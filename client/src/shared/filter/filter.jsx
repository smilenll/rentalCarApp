import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

const Filter = ({ availableFilters, setFilter, name }) => (
  <>
    <DropdownButton
      id={`dropdown-variants-${name}`}
      variant="info"
      title={name}
    >
      <Dropdown.Item
        onClick={() => {
          setFilter(false);
        }}
      >
        All
      </Dropdown.Item>
      {availableFilters
        .map((filter) => (
          <Dropdown.Item
            eventKey={filter.id}
            onClick={() => {
              setFilter(filter);
            }}
          >
            {filter.name}
          </Dropdown.Item>
        ))}
      <Dropdown.Item eventKey="3" active>Active Item</Dropdown.Item>
    </DropdownButton>
    {' '}
  </>
);

Filter.propTypes = {
  availableFilters: PropTypes.any.isRequired,
  setFilter: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Filter;
