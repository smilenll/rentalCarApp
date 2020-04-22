import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

const Filter = ({
  cars, avableFilters, setFilter, name,
}) => (
  <>
    <DropdownButton
      as={name}
      id={`dropdown-variants-${name}`}
      variant="info"
      title={name}
    >
      <Dropdown.Item eventKey="1">Action</Dropdown.Item>
      <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
      <Dropdown.Item eventKey="3" active>
        Active Item
      </Dropdown.Item>
    </DropdownButton>
    {' '}
  </>

);

export default Filter;
