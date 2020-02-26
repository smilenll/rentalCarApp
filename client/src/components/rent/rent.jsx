import React, { useState} from 'react';

const Rent = ({ match }) => {
  console.log(match.params.carid);
  // Make it work with REDUX
  const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();
  // const [age, setAge] = useState();
  // const [days, setDays] = useState();

  console.log(firstName);
  const currentDateTime = new Date().toISOString();
  return (
    <div className="container">
      <duv className="row">
        <div className="col-4">
          <div className="card bg-dark text-white">
            <img
              className="card-img"
              src="https://www.internationalcollectables.com/blobs/Images/Cars/16/d9c4ca99-5150-491e-b0bb-76756f701d35.jpg?width=2000&height=1333"
              alt="Card"
            />
            <div className="card-img-overlay">
              <h5 className="card-title">Ferrari F40</h5>
              <p className="card-text">A</p>
              <p className="card-text">100$</p>
              <button type="button" className="btn btn-dark">Dark</button>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                className="form-control is-valid"
                id="firstName"
                placeholder="First name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                className="form-control is-valid"
                id="lastName"
                placeholder="Last name"
                value="Otto"
                required
              />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                className="form-control is-valid"
                id="age"
                placeholder="Last name"
                value="Otto"
                required
              />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="validationServer02">Date</label>
              <input
                type="datetime-local"
                min={currentDateTime.substring(0, currentDateTime.length - 1)}
                className="form-control is-valid"
                id="validationServer02"
                placeholder="Last name"
                value="Otto"
                required
              />
              <div className="valid-feedback">
                Looks good!
              </div>
            </div>
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
      </duv>
    </div>
  )
};

export default Rent;
