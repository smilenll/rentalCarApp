import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCars } from '../../redux';
import Car from '../car/car';
import Search from '../../shared/search/search';
import Filter from '../../shared/filter/filter';

const Cars = ({ cars, storageCars }) => {
  const [result, setResult] = useState();
  const [manufacture, setManufacture] = React.useState();
  const [model, setModel] = React.useState();
  const [carClass, setCarClass] = React.useState();
  const [age, setAge] = React.useState();

  useEffect(() => {
    storageCars();
  }, []);

  const carsArray = cars.allCars.data;
  useEffect(() => {
    if (carsArray) {
      const results = carsArray
        .filter((item) => item.model.name.toLowerCase().includes(q.toLowerCase()));
      setResult(results);
    }
  }, [q]);

  return cars.loading ? (
    <h3>Loading</h3>
  ) : cars.error ? (
    <h3>{cars.error}</h3>
  ) : (
    <div className="container mt-4">
      <Search items={carsArray} setQ={setQ} />
      <Filter cars={carsArray} name="Manufacture" />
      <Filter cars={carsArray} name="Model" />
      <Filter cars={carsArray} name="Class" />
      <Filter cars={carsArray} name="Age" />
      <div className="row mt-4">
        {result
          ? result.map((item) => (
            <div key={item.id} className="col-lg-4 mb-4">
              <Car car={item} />
            </div>
          ))
          : carsArray
          && carsArray.map((item) => (
            <div key={item.id} className="col-lg-4 mb-4">
              <Car car={item} />
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
  }).isRequired,
  storageCars: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ cars: state.CarReducers });

const mapDispatchToProps = (dispatch) => ({
  storageCars: () => dispatch(getCars()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
