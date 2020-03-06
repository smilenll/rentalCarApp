import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { calcDays,
  calculateTotalBill,
  calculateReturnPrice,
} from '../../shered/calculator';
import { returnCar } from '../../services';

const Contract = ({ contract }) => {
  const [date, setDate] = useState(new Date());
  const currentDateTime = new Date(date).toISOString();
  const currentDays = calcDays(contract.initialDate, currentDateTime);
  const estimatedDays = calcDays(contract.initialDate, contract.expectedReturnDate);
  const estimatedBill = calculateTotalBill(contract.age, contract.car, estimatedDays);
  const finalPrice = calculateReturnPrice(contract, estimatedDays, currentDays);

  function tick() {
    setDate(new Date());
  }

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
      <td>{moment(contract.initialDate).format('Do MMMM  YYYY, H:mm')}</td>
      <td>{moment(contract.expectedReturnDate).format('Do MMMM  YYYY, H:mm')}</td>
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
        <button
          type="button"
          className="btn btn-outline-primary btn-block"
          onClick={() => returnCar(contract.id, { returnDateTime: currentDateTime })}
        >
          Return car
        </button>
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
