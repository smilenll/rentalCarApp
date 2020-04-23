import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCars } from '../../redux';
import Car from '../car/car';
import Search from '../../shared/search/search';
import Filter from '../../shared/filter/filter';
import {
  getManufacturesFilter,
  getModelsFilter,
  setManufacturesFilter,
  setModelsFilter,
  setCarClassFilter, getCarClassesFilter,
} from '../../shared/filters';

const Cars = ({ cars, storageCars }) => {
  const [result, setResult] = useState(false);
  const [q, setQ] = useState(false);
  const [manufacture, setManufacture] = useState(false);
  const [model, setModel] = useState(false);
  const [carClass, setCarClass] = useState();
  // const [age, setAge] = useState();
  const [availableFilters, setAvailableFilters] = useState({
    manufacturersFilters: [],
    modelsFilters: [],
    carClassFilters: [],
  });

  const carsArray = cars.allCars.data;

  const getFiltersForCurrentCars = (carsResult) => ({
    manufacturersFilters: getManufacturesFilter(carsResult),
    modelsFilters: getModelsFilter(carsResult),
    carClassFilters: getCarClassesFilter(carsResult),
  });

  useEffect(() => {
    storageCars();
  }, []);

  useEffect(() => {
    if (carsArray) {
      setResult(carsArray);
    }
  }, [carsArray]);

  useEffect(() => {
    let filtered = carsArray;

    if (q) {
      filtered = result
        .filter((item) => {
          const searchIn = `${item.model.manufacture.name} ${item.model.name}`;
          return searchIn.toLowerCase().includes(q.toLowerCase());
        });
    }
    if (manufacture) {
      filtered = setManufacturesFilter(filtered, manufacture);
    }
    if (model) {
      filtered = setModelsFilter(filtered, model);
    }
    if (carClass) {
      filtered = setCarClassFilter(filtered, carClass);
    }
    setResult(filtered);
  }, [q, manufacture, model, carClass]);

  useEffect(() => {
    if (result) {
      setAvailableFilters(getFiltersForCurrentCars(result));
    }
  }, [result]);

  return cars.loading ? (
    <h3>Loading</h3>
  ) : cars.error ? (
    <h3>{cars.error}</h3>
  ) : (
    <div className="container mt-4">
      <Search items={carsArray} setQ={setQ} />
      <Filter
        name="Manufacture"
        setFilter={setManufacture}
        availableFilters={availableFilters.manufacturersFilters}
      />
      <Filter
        name="Model"
        setFilter={setModel}
        availableFilters={availableFilters.modelsFilters}
      />
      <Filter
        name="Class"
        setFilter={setCarClass}
        availableFilters={availableFilters.carClassFilters}
      />
      {/* <Filter cars={carsArray} name="Age" /> */}
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
