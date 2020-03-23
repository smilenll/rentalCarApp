import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCars } from '../../redux';
import Car from '../car/car';
import Search from '../../shered/search/search';

const Cars = ({cars, storageCars}) => {
  useEffect(() => {
    storageCars();
  }, []);

  const carsArray = cars.allCars.data;

  return cars.loading ? (
    <h3>Loading</h3>
  ) : cars.error ? (
    <h3>{cars.error}</h3>
  ) : (
    <div className="container mt-4">
      <Search items={carsArray} />
      <div className="row">
        <h3 className="my-3 mx-auto">OURS CARS</h3>
      </div>
      <div className="row">
        {cars
        && cars.allCars.data
        && carsArray.map((item) => (
          <div className="col-lg-4 mb-4">
            <Car key={item.id} car={item} />
          </div>
        ))}
      </div>
    </div>

  );
};

Cars.propTypes = {
  cars: PropTypes.shape({
    allCars: PropTypes.any.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
  }),
  storageCars: PropTypes.func.isRequired,
};

// not working properly
Car.defaultProps = {
  cars: {
    allCars: [],
    error: '',
    loading: true,
  },
  storageCars: [],
};

const mapStateToProps = (state) => ({cars: state.CarReducers});

const mapDispatchToProps = (dispatch) => ({
  storageCars: () => dispatch(getCars()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
