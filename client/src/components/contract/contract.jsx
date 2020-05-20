import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { toast } from 'react-toastify';
import {
  calcDays,
  calculateTotalBill,
  calculateReturnPrice,
} from '../../shared/calculator';
import { returnCar } from '../../services';
import './contact.css';
import { findCarAmortizationFilter } from '../../shared/filters';
import Notificator from '../notificator/notificator';
import Confirm from '../../shared/modals/confirm';

const Contract = ({ contract, amortizationFilters }) => {
  const [date, setDate] = useState(new Date());
  const [btnDisable, setBtnDisable] = useState(false);
  const [show, setShow] = useState(false);
  const currentDateTime = new Date(date).toISOString();
  const currentDays = calcDays(contract.initialDateTime, currentDateTime);
  const estimatedDays = calcDays(contract.initialDateTime, contract.expectedReturnDateTime);
  const estimatedBill = calculateTotalBill(contract.age, contract.car, estimatedDays);
  const finalPrice = calculateReturnPrice(contract, estimatedDays, currentDays);
  console.log(amortizationFilters.length);
  const amortizationCoefficient = amortizationFilters.length > 0 && findCarAmortizationFilter(amortizationFilters, contract.car)
    .priceCoefficient;

  function tick() {
    setDate(new Date());
  }
  const sendReturnCarRequest = async () => {
    try {
      await returnCar(contract.id, { returnDateTime: currentDateTime });
      setBtnDisable(true);
      setShow(false);
    } catch (e) {
      setBtnDisable(false);
      toast(<Notificator massage={e.message} />);
    }
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 10000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  return (
    <>
      <tr
        className={(btnDisable ? 'flipOut table-row returned' : 'table-row')}
        data-toggle="tooltip "
        data-placement="top"
        title={`Class ${contract.car.model.carClass.name}, regular price per day ${contract.car.model.carClass.price}`}
      >
        <td scope="row">{contract.car.model.name}</td>
        <td className="contract-user-name">{`${contract.firstName} ${contract.lastName}`}</td>
        <td>{moment(contract.initialDateTime).format('Do MMMM  YYYY, H:mm')}</td>
        <td>{moment(contract.expectedReturnDateTime).format('Do MMMM  YYYY, H:mm')}</td>
        <td>
          {estimatedDays}
        </td>
        <td>
          {
          amortizationCoefficient
          ? ((estimatedBill.price / estimatedDays) * amortizationCoefficient).toFixed(2)
          : ((estimatedBill.price / estimatedDays)).toFixed(2)
          }
          {' '}
          $/days
        </td>
        <td>{currentDays}</td>
        <td>
        {
          amortizationCoefficient
          ? ((finalPrice / currentDays) * amortizationCoefficient).toFixed(2)
          : ((finalPrice / currentDays)).toFixed(2)
          }
          {' '}
          $/days
        </td>
        <td>
          {
          amortizationCoefficient
          ?(finalPrice * amortizationCoefficient).toFixed(2)
          :(finalPrice).toFixed(2)
          }
          {' '}
          $
        </td>
        <td>
          {
          btnDisable
            ? (
              <button
                type="button"
                className="return-car-btn"
                disabled
                data-testid="toggle"
              >
                Returned
              </button>
            )
            : (
              <button
                type="button"
                className="return-car-btn"
                onClick={() => setShow(true)}
                data-testid="toggle"
              >
                Return
              </button>
            )
        }
        </td>
      </tr>
      <Confirm
        texts={{ massage: 'Do you want to return this car?', submit: 'Return car', cancel: 'No' }}
        setShow={setShow}
        show={show}
        submit={sendReturnCarRequest}
      />
    </>
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
      age: PropTypes.number,
      pickUpDateTime: PropTypes.string,
      days: PropTypes.number,
      car: PropTypes.shape({
        model: PropTypes.shape({
          name: PropTypes.string,
          carClass: PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
          }),
        }),
      }).isRequired,
    },
  ).isRequired,
  amortizationFilters: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Contract;
