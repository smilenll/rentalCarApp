import React from 'react';

const Cars = () => (
  <div className="container mt-4">
    <div className="row">
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
        <div className="card bg-dark text-white">
          <img
            className="card-img"
            src="https://www.internationalcollectables.com/blobs/Images/Cars/16/d9c4ca99-5150-491e-b0bb-76756f701d35.jpg?width=2000&height=1333"
            alt="car"
          />
          <div className="card-img-overlay">
            <h5 className="card-title">Ferrari F40</h5>
            <p className="card-text">A</p>
            <p className="card-text">100$</p>
            <p className="card-text" />
            <button type="button" className=" card-btn btn btn-dark">Dark</button>
          </div>
        </div>
      </div>
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
            <p className="card-text" />
            <button type="button" className="btn btn-dark">Dark</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Cars;