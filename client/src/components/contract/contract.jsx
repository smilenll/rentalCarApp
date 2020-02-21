import React from 'react';

const Contract = ({ contract }) => (
  <tr>
    <th scope="row">{contract.car.model}</th>
    <td>{contract.firstName + ' ' + contract.lastName}</td>
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

export default Contract;
