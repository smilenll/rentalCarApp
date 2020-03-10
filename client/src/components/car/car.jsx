import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


const Car = ({ car }) => {
  const btnLink = `/rent/${car.id}`;

  return (
    <div className="col-4">
      <NavLink to={btnLink}>
        <div className="card bg-dark text-white">
          <img
            className="card-img"
            src={car.img}
            alt="Card"
          />
          <div data-car="select" className="card-img-overlay">
            <h5 className="card-title"><strong>{car.model}</strong></h5>
            <p className="card-text"><strong>{car.carClass.price}</strong></p>
            <p className="card-text"><strong>{car.carClass.name}</strong></p>
          </div>
        </div>
      </NavLink>
    </div>

  );
};


Car.propTypes = {
  car: PropTypes.shape(
    {
      id: PropTypes.number,
      model: PropTypes.string,
      img: PropTypes.string,
      carClass: PropTypes.shape(
        {
          price: PropTypes.number,
          name: PropTypes.string,
        },
      ),
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
