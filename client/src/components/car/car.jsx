import React from 'react';
import PropTypes from 'prop-types';

const Car = ({ car }) => (
  <div className="col-4">
    <div className="card bg-dark text-white">
      <img
        className="card-img"
        src={car.img}
        alt="Card"
      />
      <div className="card-img-overlay">
        <h5 className="card-title">{car.model}</h5>
        <p className="card-text">{car.carClass.price}</p>
        <p className="card-text">{car.carClass.name}</p>
        <button type="button" className="btn btn-dark">Dark</button>
      </div>
    </div>
  </div>
);

Car.propTypes = {
  car: PropTypes.shape(
    {
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
    model: 'No model',
    img: 'No image',
    carClass: {
      price: 'No price',
      name: 'No name',
    },
  },
};

export default Car;
