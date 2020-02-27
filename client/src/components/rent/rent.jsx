import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { postRent } from '../../redux';
import Car from '../car/car';

const Rent = ({ cars, match, sendRentForm }) => {
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
    taxes: [],
  });
  const [errors, setErrors] = useState({
    errors: 0,
    firstName: '',
    lastName: '',
    age: '',
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

  const rentForm = {
    firstName,
    lastName,
    age,
    days: 2,
    pickUpDateTime: '2020-02-19T13:19:06.000Z',
  };

  const getTaxes = (pricePerDay, differenceInDays) => {
    const calculatedBill = {
      price: 0,
      taxes: [],
    };
    calculatedBill.price = pricePerDay * differenceInDays;
    const basicPrice = {
      newPrice: calculatedBill.price,
      massage: `Car class ${car.carClass.name} for ${car.carClass.price}$/day for ${differenceInDays} days`,
    };
    calculatedBill.taxes.push(basicPrice);

    if (differenceInDays > 2 && differenceInDays <= 6) {
      calculatedBill.price *= 0.85;
      const tax = {
        newPrice: calculatedBill.price,
        massage: '15% Discount for 2 to 6 days',
      };
      calculatedBill.taxes.push(tax);
    }
    if (differenceInDays >= 7) {
      calculatedBill.price *= 0.75;
      const tax = {
        newPrice: calculatedBill.price,
        massage: '25% Discount up to 7 days',
      };
      calculatedBill.taxes.push(tax);
    }
    if (rentForm.age < 25) {
      calculatedBill.price *= 1.25;
      const tax = {
        newPrice: calculatedBill.price,
        massage: 'Yong fee increase price buy 20%',
      };
      calculatedBill.taxes.push(tax);
    }

    return calculatedBill;
  };

  const calculateBull = () => {
    const today = new Date().getTime();
    const delivery = new Date(deliveryDate).getTime();
    const differenceInTime = delivery - today;
    const days = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    const pricePerDay = car.carClass.price;

    setBill(getTaxes(pricePerDay, days));
  };

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
    setErrors(currentErrors);
  };

  useEffect(calculateBull, [age, deliveryDate]);
  useEffect(validateForm, [age, firstName, lastName, deliveryDate]);

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
              type="button"
              className="btn btn-dark"
              onClick={() => {
                const formErrors = validateForm(rentForm);
                if (formErrors.errors > 0) {
                  return setErrors(formErrors);
                }
                return sendRentForm(rentForm);
              }}
            >
              Dark
            </button>
          </div>
        </div>
        <div className="col-4">
          <h2>Estimated pronChangeice</h2>
          <table className="table table-striped table-dark">
            <tbody>
              {bill && bill.taxes.map((item) => (
                <tr key={item.massage}>
                  <td>
                    {item.newPrice}
                    $
                  </td>
                  <td>{item.massage}</td>
                </tr>
              ))}
              <tr>
                <td>
                  Total
                </td>
                <td>
                  {bill.price}
                  {' '}
                  $/day
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   numOfCakes: state.cake.numOfCakes,
// });

const mapStateToProps = (state) => ({ cars: state.CarReducers });

const mapDispatchToProps = (dispatch) => ({
  sendRentForm: (formData) => dispatch(postRent(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Rent);
