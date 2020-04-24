import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './car.css';

const Car = ({ car }) => {
  const btnLink = `/rent/${car.id}`;
  return (
    <>
      <NavLink to={btnLink}>
        <div className="card bg-dark text-white">
          <img
            className="card-img"
            src={car.img}
            alt="Card"
          />
          <div data-car="select" className="card-img-overlay">
            <h5 className="card-title">
              <strong className="car-text-board">
                {car.model.manufacture.name}
                {' '}
                {car.model.name}
              </strong>
            </h5>
            <p className="card-text">
              <strong className="car-text-board">
                Price:
                {car.model.carClass.price}
                {' '}
                $
              </strong>
            </p>
            <p className="card-text">
              <strong className="car-text-board">
                {car.yearOfManufacture}
              </strong>
            </p>
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
