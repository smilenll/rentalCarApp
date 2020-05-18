import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAmortizations, getCars } from '../../redux';
import Car from '../car/car';
import Search from '../../shared/search/search';
import Filter from '../../shared/filter/filter';
import {
  getManufacturesFilter,
  getModelsFilter,
  getCarClassesFilter,
  getAmortizationsFilters,
  setManufacturesFilter,
  setModelsFilter,
  setCarClassFilter, setAmortizationsFilter,
} from '../../shared/filters';
import './cars.css';

const Cars = ({
  cars, amortizations, storageCars, storageAmortizations,
}) => {
  const defaultFilters = {
    manufacturersFilters: [],
    modelsFilters: [],
    carClassFilters: [],
    amortizationFilters: [],
  }
  const [result, setResult] = useState(false);
  const [q, setQ] = useState(false);
  const [manufacture, setManufacture] = useState(false);
  const [model, setModel] = useState(false);
  const [carClass, setCarClass] = useState(false);
  const [amortization, setAmortization] = useState();
  const [availableFilters, setAvailableFilters] = useState(defaultFilters);
  const [clearFilter, setClearFilter] = useState(false);

  const carsArray = cars.allCars.data;
  const amortizationArray = amortizations.allAmortizationFilters.data;

  const getFiltersForCurrentCars = (carsResult) => ({
      manufacturersFilters: getManufacturesFilter(carsResult),
      modelsFilters: getModelsFilter(carsResult),
      carClassFilters: getCarClassesFilter(carsResult),
      amortizationFilters: getAmortizationsFilters(carsResult, amortizationArray),
    });

  const handleClear = () => {
    setQ(false)
    setAmortization(false);
    setModel(false);
    setManufacture(false);
    setCarClass(false);
  }

  useEffect(() => {
    if (clearFilter) {
      handleClear();
      console.log(clearFilter);
    }
  }, [clearFilter]);

  useEffect(() => {
    if (carsArray) {
      setResult(carsArray);
    }
  }, [carsArray]);

  useEffect(() => {
    storageCars();
    storageAmortizations();
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
    if (amortization) {
      filtered = setAmortizationsFilter(filtered, amortization);
    }
    setResult(filtered);
  }, [q, manufacture, model, carClass, amortization]);

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
      <div className="row search-nav">
        <div className="col-lg-4">
          <Search
          items={carsArray}
          q={q || ''}
          setQ={setQ}
          setClearFilter={setClearFilter}
          clearFilter={clearFilter} 
          />
        </div>
        <Filter
          name="Manufacture"
          setFilter={setManufacture}
          availableFilters={availableFilters.manufacturersFilters}
          setClearFilter={setClearFilter}
          clearFilter={clearFilter}
        />
        <Filter
          name="Model"
          setFilter={setModel}
          availableFilters={availableFilters.modelsFilters}
          setClearFilter={setClearFilter}
          clearFilter={clearFilter}
        />
        <Filter
          name="Class"
          setFilter={setCarClass}
          availableFilters={availableFilters.carClassFilters}
          setClearFilter={setClearFilter}
          clearFilter={clearFilter}
        />
        <Filter
          name="Amortization"
          setFilter={setAmortization}
          availableFilters={availableFilters.amortizationFilters}
          setClearFilter={setClearFilter}
          clearFilter={clearFilter}
        />
      </div>
      
      
      <div className="row mt-4">
        {result
        && amortizationArray
          ? result.map((item) => (
            <div key={item.id} className="col-lg-4 mb-4">
              <Car car={item} amortizations={amortizationArray} />
            </div>
          ))
          : carsArray
          && amortizationArray
          && carsArray.map((item) => (
            <div key={item.id} className="col-lg-4 mb-4">
              <Car car={item} amortizations={amortizationArray} />
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
  amortizations: PropTypes.shape({
    allAmortizationFilters: PropTypes.any.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  storageAmortizations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cars: state.CarReducers,
  amortizations: state.AmortizationReducers,
});

const mapDispatchToProps = (dispatch) => ({
  storageCars: () => dispatch(getCars()),
  storageAmortizations: () => dispatch(getAmortizations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
