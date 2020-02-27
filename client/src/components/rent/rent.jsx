import React, { useState } from 'react';
import { connect } from 'react-redux';
import { postRent } from '../../redux';
import Car from '../car/car';

const Rent = ({ cars, match, sendRentForm }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState();
  const [pickUpDateTime, setPickUpDateTime] = useState();
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
    car = cars.allCars.data.find((item) => item.id == match.params.carid);
  }

  const rentForm = {
    firstName,
    lastName,
    age,
    days: 2,
    pickUpDateTime: '2020-02-19T13:19:06.000Z',
  };

  const validateForm = (values) => {
    const currentErrors = { errors: 0 };

    if (values.firstName.trim() === '') {
      currentErrors.errors += 1;
      currentErrors.firstName = 'First name must be not empty';
    }
    if (values.lastName.trim() === '') {
      currentErrors.errors += 1;
      currentErrors.lastName = 'Last name must be not empty';
    }
    if (!values.age) {
      currentErrors.errors += 1;
      currentErrors.age = 'Age must be not empty';
    }
    if (values.age && values.age < 18) {
      currentErrors.errors += 1;
      currentErrors.age = 'You are too yong to drive';
    }

    return currentErrors;
  };

  const currentDateTime = new Date().toISOString();
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
              <label htmlFor="validationServer02">Date</label>
              <input
                type="datetime-local"
                min={currentDateTime.substring(0, currentDateTime.length - 1)}
                className="form-control is-valid"
                value={pickUpDateTime}
                onChange={(e) => setPickUpDateTime(e.target.value)}
                id="validationServer02"
                placeholder="Last name"
                required
              />
              <div className="invalid-feedback">
                {errors.firstName}
              </div>
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
              <tr>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Thornton</td>
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
