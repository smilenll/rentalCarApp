import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { getAmortizations, postRent } from '../../redux';
import Car from '../car/car';
import {
  calcDays,
  calculateTotalBill,
} from '../../shared/calculator';
import './rent.css';
import { singleCar } from '../../services';
import Input from '../../shared/forms/Input';
import DateInput from '../../shared/forms/DateInput';
import { validateRentForm } from '../../shared/forms/validate-form';
import Notificator from '../notificator/notificator';
import { findCarAmortizationFilter } from '../../shared/filters';
import Bill from '../bill/bill';

const Rent = ({
  cars, amortizations, match, sendRentForm, redirectTo, storageAmortizations,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const currentDateTime = new Date().toISOString();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [formStartValidation, setFormStartValidation] = useState(false);
  const [age, setAge] = useState(0);
  const [car, setCar] = useState({
    id: 1,
    model: {
      id: 1,
      name: 'test',
      carClass: {
        id: 1,
        name: 'A',
        price: 0,
      },
      manufacture: {
        id: 1,
        name: 'test',
      },
    },
    img: 'demo',
    isFree: true,
  });
  const [deliveryDate, setDeliveryDate] = useState(currentDateTime);
  const [bill, setBill] = useState({
    price: 0,
    massages: [],
  });
  const [errors, setErrors] = useState({
    errors: 0,
  });

  const calculatedDays = calcDays(new Date(), deliveryDate);

  let currentAmortizationFilter = {};

  // This can be made better
  if (amortizations.allAmortizationFilters.data && car) {
    currentAmortizationFilter = findCarAmortizationFilter(
      amortizations.allAmortizationFilters.data, car,
    );
  }

  const createRequest = () => ({
    firstName,
    lastName,
    age: +age,
    car: +match.params.carid,
    initialDateTime: new Date().toISOString(),
    expectedReturnDateTime: new Date(deliveryDate).toISOString(),
  });

  const buildBill = () => setBill(calculateTotalBill(age, car, calculatedDays));

  const validate = () => {
    setErrors(validateRentForm(firstName, lastName, age, calculatedDays));
  };

  useEffect(buildBill, [age, deliveryDate]);
  useEffect(validate, [age, firstName, lastName, deliveryDate]);
  useEffect(() => {
    storageAmortizations();
    if (cars.allCars.data) {
      setCar(cars.allCars.data.find((item) => item.id === +match.params.carid));
    } else {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const result = await singleCar(match.params.carid);
          setCar(result);
          setIsLoading(false);
        } catch (e) {
          setIsLoading(false);
          toast(<Notificator massage={e.message} />);
        }
      };
      fetchData();
    }
  }, []);

  if (redirectTo.redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <div className="container">
      <div className="row">
        {isLoading ? <div>Loading</div> : <div className="col-lg-12"><Car car={car} /></div>}
        <div className="col-lg-6 mt-5">
          <div className="form-row">
            <Input
              label="First name"
              type="text"
              id="firstName"
              value={firstName}
              error={errors.firstName}
              setInput={setFirstName}
              formStartValidation={formStartValidation}
            />
            <Input
              label="Last name"
              type="text"
              id="lastName"
              value={lastName}
              error={errors.lastName}
              setInput={setLastName}
              formStartValidation={formStartValidation}
            />
            <Input
              label="Age"
              type="number"
              id="age"
              value={age}
              error={errors.age}
              setInput={setAge}
              formStartValidation={formStartValidation}
            />
            <DateInput
              currentDateTime={currentDateTime}
              setDeliveryDate={setDeliveryDate}
            />
            <button
              id="car-submit-btn"
              type="button"
              className="btn btn-outline-success btn-block"
              onClick={() => {
                setFormStartValidation(true);
                errors.errors === 0 && sendRentForm(createRequest());
              }}
            >
              Rent car
            </button>
          </div>
        </div>
        <div className="col-6 mt-5">
          <Bill
            bill={bill}
            car={car.model.price}
            currentAmortizationFilter={currentAmortizationFilter}
          />
        </div>
      </div>
    </div>
  );
};

Rent.propTypes = {
  cars: PropTypes.shape({
    allCars: PropTypes.any.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  amortizations: PropTypes.shape({
    allAmortizationFilters: PropTypes.any.isRequired,
    loading: PropTypes.bool,
  }).isRequired,
  match: PropTypes.shape({}).isRequired,
  storageAmortizations: PropTypes.func.isRequired,
  sendRentForm: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
};


const mapStateToProps = (state) => ({
  cars: state.CarReducers,
  amortizations: state.AmortizationReducers,
  redirectTo: state.RedirectReducers,
});

const mapDispatchToProps = (dispatch) => ({
  sendRentForm: (formData) => dispatch(postRent(formData)),
  storageAmortizations: () => dispatch(getAmortizations()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rent);
