import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


const Car = ({ car }) => {
  const btnLink = `/rent/${car.id}`;

  return (
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
          <NavLink activeClassName="active" className="btn btn-dark" to={btnLink}>Rent</NavLink>
        </div>
      </div>
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
