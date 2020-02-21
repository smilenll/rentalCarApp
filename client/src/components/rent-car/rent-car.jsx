import React from 'react';

const RentCar = () => (
  <div className="container">
    <duv className="row">
      <div className="col-4">
        <div className="card bg-dark text-white">
          <img
            className="card-img"
            src="https://www.internationalcollectables.com/blobs/Images/Cars/16/d9c4ca99-5150-491e-b0bb-76756f701d35.jpg?width=2000&height=1333"
            alt="Card image"
          />
          <div className="card-img-overlay">
            <h5 className="card-title">Ferrari F40</h5>
            <p className="card-text">A</p>
            <p className="card-text">100$</p>
            <button className="card-btn" type="button" className="btn btn-dark">Dark</button>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="form-row">
          <div className="col-md-12 mb-3">
            <label htmlFor="validationServer01">First name</label>
            <input
              type="text"
              className="form-control is-valid"
              id="validationServer01"
              placeholder="First name"
              value="Mark"
              required
            />
            <div className="valid-feedback">
              Looks good!
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="validationServer02">Last name</label>
            <input
              type="text"
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
          <div className="col-md-12 mb-3">
            <label htmlFor="validationServer02">Age</label>
            <input
              type="text"
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
          <div className="col-md-12 mb-3">
            <label htmlFor="validationServer02">Date</label>
            <input
              type="text"
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
);

export default RentCar;
