import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './car.css';
import { findCarAmortizationFilter } from '../../shared/filters';

const Car = ({ car, amortizations }) => {
  const [amortization, setAmortization] = useState();

  const btnLink = `/rent/${car.id}`;
  const imgRoute =`http://localhost:4000/public/${car.img}.jpg`
  useEffect(() => {
    if (amortizations) {
      const filter = findCarAmortizationFilter(amortizations, car);
      setAmortization(filter);
    }
  }, [amortizations]);

  return (
    <>
      <NavLink to={btnLink}>
        <div className="card-bar bt-2">
          <div className="row">
            <div className="col-lg-6">
              <h6 className="card-text-color ml-2 mt-2" data-car='name'>
                {car.model.manufacture.name}
                {' '}
                {car.model.name}
              </h6>
              <p className="card-text-color ml-2 mb-1">
                {amortization && amortization.name}
              </p>
            </div>
            <div className="col-lg-6  pl-2 pt-2">
              <h6 className="card-text-color text-right mr-2">
                Price:
                {car.model.carClass.price}
                {' '}
                $
              </h6>
              <p className="card-text-color text-right mr-2 mb-1">
                {car.yearOfManufacture}
              </p>
            </div>
          </div>
        </div>
        <div className="card bg-dark text-white mt-1">
          <img
            className="card-img"
            src={imgRoute}
            alt="Card"
          />
          <div data-car="select" className="card-img-overlay">
            <p className="card-text">
              <strong className="car-class">
                {car.model.carClass.name}
              </strong>
            </p>
          </div>
        </div>
      </NavLink>
    </>
  );
};


Car.propTypes = {
  car: PropTypes.shape(
    {
      id: PropTypes.number,
      model: PropTypes.shape(
        {
          id: PropTypes.number,
          name: PropTypes.string,
          carClass: PropTypes.shape(
            {
              price: PropTypes.number,
              name: PropTypes.string,
            },
          ),
          manufacture: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
          }),
        },
      ),
      img: PropTypes.string,
      yearOfManufacture: PropTypes.number.isRequired,
    },
  ),
  amortizations: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

Car.defaultProps = {
  car: {
    id: 'No ID',
    model: 'No model',
    img: 'No image',
    carClass: {
      price: 'No price',
      name: 'No name',
    },
  },
};

export default Car;
