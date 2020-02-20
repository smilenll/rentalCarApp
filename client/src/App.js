import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">SML rent</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Dashboard
                  <span
                    className="sr-only"
                  >
                    (current)
                  </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Cars</a>
              </li>
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <div className="row">
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
                alt="Card image"
              />
              <div className="card-img-overlay">
                <h5 className="card-title">Ferrari F40</h5>
                <p className="card-text">A</p>
                <p className="card-text">100$</p>
                <p className="card-text" />
                <button className="card-btn" type="button" className="btn btn-dark">Dark</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">Car</th>
                <th scope="col">Customer</th>
                <th scope="col">From</th>
                <th scope="col">Estimated return date</th>
                <th scope="col">Estimated days return</th>
                <th scope="col">Estimated price per day</th>
                <th scope="col">Current days returned</th>
                <th scope="col">Current price per day</th>
                <th scope="col">Current total price</th>
                <th scope="col" />
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>
                  <button type="button" className="btn btn-light btn-block">Light</button>
                </td>

              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>
                  <button type="button" className="btn btn-light btn-block">Light</button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>Bird</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>
                  <button type="button" className="btn btn-light btn-block">Light</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
            <h2>Estimated price</h2>
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
    </div>
  );
}

export default App;
