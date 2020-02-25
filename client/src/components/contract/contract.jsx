import React from 'react';
import PropTypes from 'prop-types';

const Contract = ({ contract }) => {
  return (
    <tr>
      <th scope="row">{contract.car.model}</th>
      <td>{`${contract.firstName} ${contract.lastName}`}</td>
      <td>{contract.pickUpDateTime}</td>
      <td>@mdo</td>
      <td>{contract.days}</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>
        <button type="button" className="btn btn-outline-primary btn-block">Return car</button>
      </td>

    </tr>
  );
};

Contract.propTypes = {
  contract: PropTypes.shape(
    {
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      pickUpDateTime: PropTypes.string,
      days: PropTypes.number,
      car: PropTypes.shape({
        model: PropTypes.string,
      }),
    },
  ),
};

Contract.defaultProps = {
  contract: {
    firstName: 'No name',
    lastName: 'No name',
    pickUpDateTime: 'No name',
    days: 'No name',
    car: {
      model: 'No name',
      name: 'No name',
    },
  },
};

export default Contract;
