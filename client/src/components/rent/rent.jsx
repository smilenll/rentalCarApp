import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postRent } from '../../redux';
import Car from '../car/car';
import {
  calcDays,
  calculateTotalBill,
} from '../../shared/calculator';
import './rent.css';
import { singleCar } from '../../services';
import Input from '../../shared/forms/Input';

const Rent = ({
  cars, match, sendRentForm, redirectTo,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const currentDateTime = new Date().toISOString();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [formStartValidation, setFormStartValidation] = useState(false);
  const [age, setAge] = useState(0);
  const [car, setCar] = useState({
    id: 1,
    model: 'VW polo',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT02WvrL6ErmOuV8XfhAyOdRP_PzRC3RzFyYaLRoIvULYitBol4',
    isFree: true,
    carClass: {
      id: 1,
      name: 'A',
      price: 0,
    },
  });
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

    if (firstName.length < 3) {
      currentErrors.errors += 1;
      currentErrors.firstName = 'First name must be at lease 3 characters';
    }
    if (lastName.length < 3) {
      currentErrors.errors += 1;
      currentErrors.lastName = 'Last name must be at lease 3 characters';
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
  useEffect(() => {
    if (cars.allCars.data) {
      setCar(cars.allCars.data.find((item) => item.id === +match.params.carid));
    } else {
      setIsLoading(true);
      const fetchData = async () => {
        const result = await singleCar(match.params.carid);
        setCar(result);
        setIsLoading(false);
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
              onClick={() => {
                setFormStartValidation(true);
                errors.errors === 0 && sendRentForm(createRequest())}}
            >
              Rent car
            </button>
          </div>
        </div>
        <div className="col-6 mt-5">
          <h4 className="text-right">Estimated price</h4>
          {
            bill.price <= 1.2
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
