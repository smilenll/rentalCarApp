import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCars } from '../../redux';
import Car from '../car/car';

const Cars = ({ cars, storageCars }) => {
  const [search, setSearch] = useState();
  const [q, setQ] = useState();
  useEffect(() => {
    storageCars();
  }, []);

  const carsArray = cars.allCars.data;

  const searchCar = (car) => carsArray
    .filter((item) => item.model.toLowerCase().includes(car.toLowerCase()));

  return cars.loading ? (
    <h2>Loading</h2>
  ) : cars.error ? (
    <h2>{cars.error}</h2>
  ) : (
    <div className="container mt-4">
      <div className="row">
        <div className="active-cyan-3 active-cyan-4 mb-4">
          <input
            className="form-control mb-2"
            type="text"
            value={q}
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
            onClick={() => setSearch(searchCar(q))}
          >
            Search
          </button>
        </div>
      </div>
      {
        search
        && (
        <div className="row">
          <h1>Search result</h1>
          <div className="row">
            {
              search.map((item) => (
                <Car key={item.id} car={item} />
              ))
            }
          </div>
        </div>
        )
      }
      <hr />
      <div className="row">
        <h1>All cars</h1>
        <div className="row">
          {cars
          && cars.allCars.data
          && carsArray.map((item) => (
            <Car key={item.id} car={item} />
          ))}
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
