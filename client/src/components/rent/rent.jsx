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
import DateInput from '../../shared/forms/DateInput';
import validateForm from '../../shared/forms/validate-form';

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
    model: 'Default CAR',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT02WvrL6ErmOuV8XfhAyOdRP_PzRC3RzFyYaLRoIvULYitBol4',
    isFree: true,
    carClass: {
      id: 1,
      name: 'A',
      price: 0,
    },
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

  const validate = () => {
    setErrors(validateForm(firstName, lastName, age, calculatedDays));
  };

  useEffect(buildBill, [age, deliveryDate]);
  useEffect(validate, [age, firstName, lastName, deliveryDate]);
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
