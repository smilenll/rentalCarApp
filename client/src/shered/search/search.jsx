import React, { useState } from 'react';
import Car from '../../components/car/car';
import PropTypes, {array} from 'prop-types';

const Search = ({ items }) => {
  const [result, setResult] = useState();
  const [q, setQ] = useState();

  const searchItem = (searchFor) => items
    .filter((item) => item.model.toLowerCase().includes(searchFor.toLowerCase()));

  return (
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
      <div className="row">
        {
      result
      && (
        result.length > 0 ? (
          <div className="row">
            <h3 className="col-lg-12">Search result</h3>
            <div className="row">
              {
                  result.map((item) => (
                    <Car key={item.id} car={item} />
                  ))
                }
            </div>
          </div>
        )
          : (
            <div className="row">
              <h2 className="notFound">No result</h2>
            </div>
          )
      )
    }
        <hr />
      </div>
    </div>
  );
};

Search.propTypes = {
  items: PropTypes.array
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
