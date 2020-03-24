import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Car from '../../components/car/car';
import './search.css';

const Search = ({ items }) => {
  const [result, setResult] = useState();
  const [q, setQ] = useState();

  const searchItem = (searchFor) => items
    .filter((item) => item.model.toLowerCase().includes(searchFor.toLowerCase()));

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="row">
          <div className="col-3">
            <input
              className="form-control mb-2"
              type="search"
              value={q}
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="col-1">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
              onClick={() => setResult(searchItem(q))}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {
      result
      && (
        result.length > 0 ? (
          <div className="row col-lg-12">
            <h3 className="col-lg-12 my-3 mx-auto">Search result</h3>
            {
              result.map((item) => (
                <Car key={item.id} car={item} />
              ))
            }
          </div>
        )
          : (
            <div className="row col-lg-12 not-found mt-3">
              <h5 className="col-lg-12 mx-auto mt-1 text-center">
                <strong>No result!</strong>Car not found or is busy right now.
                {' '}
              </h5>
            </div>
          )
      )
    }
      <hr />
    </div>
  );
};

Search.propTypes = {
  items: PropTypes.array,
};

// not working properly
Car.defaultProps = {
  items: {
    allCars: [],
    error: '',
    loading: true,
  },
};

export default Search;
