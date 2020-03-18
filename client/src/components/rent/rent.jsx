import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postRent } from '../../redux';
import Car from '../car/car';
import {
  calcDays,
  calculateTotalBill,
} from '../../shered/calculator';
import './rent.css';

const Rent = ({
  cars, match, sendRentForm, redirectTo,
}) => {
  const currentDateTime = new Date().toISOString();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState(
    currentDateTime
      .substring(0, currentDateTime.length - 1)
      .slice(0, 16),
  );
  const [bill, setBill] = useState({
    price: 0,
    massages: [],
  });
  const [errors, setErrors] = useState({
    errors: 0,
    firstName: '',
    lastName: '',
    age: '',
    date: '',
  });

  const demoCar = {
    id: 1,
    model: 'DEMO CAR',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3A…02WvrL6ErmOuV8XfhAyOdRP_PzRC3RzFyYaLRoIvULYitBol4',
    isFree: false,
    isDeleted: false,
    carClass: {
      id: 1,
      name: 'A',
      price: 20,
      isDeleted: false,
    },
  };

  let car = {};
  if (cars.allCars.length <= 0) {
    car = demoCar;
  } else {
    car = cars.allCars.data.find((item) => item.id === +match.params.carid);
  }

  const calculatedDays = calcDays(new Date(), deliveryDate);

  const createRequest = () => ({
    firstName,
    lastName,
    age: +age,
    car: +match.params.carid,
    initialDateTime: new Date().toISOString(),
    expectedReturnDateTime: new Date(deliveryDate).toISOString(),
  });
  // BUG on empty Form
  const buildBill = () => setBill(calculateTotalBill(age, car, calculatedDays));

  const validateForm = () => {
    const currentErrors = { errors: 0 };

    if (firstName.trim() === '') {
      currentErrors.errors += 1;
      currentErrors.firstName = 'First name must be not empty';
    }
    if (lastName.trim() === '') {
      currentErrors.errors += 1;
      currentErrors.lastName = 'Last name must be not empty';
    }
    if (!age) {
      currentErrors.errors += 1;
      currentErrors.age = 'Age must be not empty';
    }
    if (age && age < 18) {
      currentErrors.errors += 1;
      currentErrors.age = 'You are too yong to drive';
    }
    if (calculatedDays < 1) {
      currentErrors.errors += 1;
      currentErrors.date = 'You date is invalid';
    }
    setErrors(currentErrors);
  };

  useEffect(buildBill, [age, deliveryDate]);
  useEffect(validateForm, [age, firstName, lastName, deliveryDate]);

  if (redirectTo.redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <div className="container">
      <div className="row">
        <Car car={car} />
        <div className="col-4">
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                className={`form-control ${errors.firstName && 'is-invalid'}`}
                id="firstName"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <div className="invalid-feedback">
                {errors.firstName}
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                className={`form-control ${errors.lastName && 'is-invalid'}`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
                placeholder="Last name"
                required
              />
              <div className="invalid-feedback">
                {errors.lastName}
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className={`form-control ${errors.age && 'is-invalid'}`}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                id="age"
                placeholder="Last name"
                required
              />
              <div className="invalid-feedback">
                {errors.age}
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="dropOff">Date</label>
              <input
                type="datetime-local"
                min={currentDateTime.substring(0, currentDateTime.length - 1).slice(0, 16)}
                className="form-control"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                id="dropOff"
                placeholder="Last name"
                required
              />
            </div>
            <button
              id="car-submit-btn"
              type="button"
              className="btn btn-outline-success btn-block"
              onClick={() => errors.errors === 0 && sendRentForm(createRequest())}
            >
              Rent car
            </button>
          </div>
        </div>
        <div className="col-4">
          <h4 className="text-right">Estimated price</h4>
          {
            bill.price === 1.2
              ? (
                <h5 className="text-right empty-form-msg">For estimated price fill the form</h5>
              )
              : (
                <table className="table table-striped table-dark ">
                  <tbody>
                    {bill && bill.massages.map((item) => (
                      <tr key={item}>
                        <td colSpan="2" className="text-right">
                          {item}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td>
                        <h2>
                          Total
                        </h2>
                      </td>
                      <td className="text-right">
                        <h2>
                          {bill.price}
                          {' '}
                          $
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )
          }
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => ({
  cars: state.CarReducers,
  redirectTo: state.RedirectReducers,
});

const mapDispatchToProps = (dispatch) => ({
  sendRentForm: (formData) => dispatch(postRent(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rent);
