import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCars } from '../../redux';
import Car from '../car/car';

const Cars = ({ cars, storageCars }) => {
  useEffect(() => {
    storageCars();
  }, []);

  return cars.loading ? (
    <h2>Loading</h2>
  ) : cars.error ? (
    <h2>{cars.error}</h2>
  ) : (
    <div className="container mt-4">
      <div className="row">
        {cars
                && cars.allCars.data
                && cars.allCars.data.map((item) => (
                  <Car key={item.id} car={item} />
                ))}
      </div>
    </div>
  );
};

Cars.propTypes = {
  cars: PropTypes.shape({
    allCars: PropTypes.shape({
      data: PropTypes.any.isRequired,
    }),
    error: PropTypes.string,
    loading: PropTypes.bool,
  }),
  storageCars: PropTypes.func.isRequired,
};

// not working properly
Car.defaultProps = {
  cars: {
    allCars: {
      data: [
        {
          id: 'no id',
        },
      ],
    },
  },
};

const mapStateToProps = (state) => ({ cars: state.CarReducers });

const mapDispatchToProps = (dispatch) => ({
  storageCars: () => dispatch(getCars()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
