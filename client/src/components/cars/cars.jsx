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
        <div className="col-4">
          <div className="card bg-dark text-white">
            <img
              className="card-img"
              src="https://www.internationalcollectables.com/blobs/Images/Cars/16/d9c4ca99-5150-491e-b0bb-76756f701d35.jpg?width=2000&height=1333"
              alt="car"
            />
            <div className="card-img-overlay">
              <h5 className="card-title">Ferrari F40</h5>
              <p className="card-text">A</p>
              <p className="card-text">100$</p>
              <p className="card-text" />
              <button type="button" className=" card-btn btn btn-dark">Dark</button>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card bg-dark text-white">
            <img
              className="card-img"
              src="https://www.internationalcollectables.com/blobs/Images/Cars/16/d9c4ca99-5150-491e-b0bb-76756f701d35.jpg?width=2000&height=1333"
              alt="Card"
            />
            <div className="card-img-overlay">
              <h5 className="card-title">Ferrari F40</h5>
              <p className="card-text">A</p>
              <p className="card-text">100$</p>
              <p className="card-text" />
              <button type="button" className="btn btn-dark">Dark</button>
            </div>
          </div>
        </div>
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
