import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  calcDays,
  calculateTotalBill,
  calculateReturnPrice,
} from '../../shared/calculator';
import { returnCar } from '../../services';

const Contract = ({ contract }) => {
  const [date, setDate] = useState(new Date());
  const [btnDisable, setBtnDisable] = useState(false);
  const currentDateTime = new Date(date).toISOString();
  const currentDays = calcDays(contract.initialDateTime, currentDateTime);
  const estimatedDays = calcDays(contract.initialDateTime, contract.expectedReturnDateTime);
  const estimatedBill = calculateTotalBill(contract.age, contract.car, estimatedDays);
  const finalPrice = calculateReturnPrice(contract, estimatedDays, currentDays);

  function tick() {
    setDate(new Date());
  }

  const sendReturnCarRequest = async () => {
    setBtnDisable(true);
    const car = await returnCar(contract.id, { returnDateTime: currentDateTime });
    car && setBtnDisable(false);
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 10000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  return (
    <tr>
      <th scope="row">{contract.car.model}</th>
      <td className="contract-user-name">{`${contract.firstName} ${contract.lastName}`}</td>
      <td>{moment(contract.initialDateTime).format('Do MMMM  YYYY, H:mm')}</td>
      <td>{moment(contract.expectedReturnDateTime).format('Do MMMM  YYYY, H:mm')}</td>
      <td>
        {estimatedDays}
        {' '}
        days
      </td>
      <td>{estimatedBill.price / estimatedDays}</td>
      <td>{currentDays}</td>
      <td>{(finalPrice / currentDays).toFixed(2)}</td>
      <td>{finalPrice}</td>
      <td>
        {
          btnDisable
            ? (
              <button
                type="button"
                className="btn btn-outline-primary btn-block"
                disabled
              >
                Return car
              </button>
            )
            : (
              <button
                type="button"
                className="btn btn-outline-primary btn-block"
                onClick={() => sendReturnCarRequest()}
              >
                Return car
              </button>
            )
        }
      </td>
    </tr>
  );
};

Contract.propTypes = {
  contract: PropTypes.shape(
    {
      id: PropTypes.number,
      initialDateTime: PropTypes.string,
      expectedReturnDateTime: PropTypes.string,
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
    initialDateTime: 'no date',
    expectedReturnDateTime: 'no date',
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
