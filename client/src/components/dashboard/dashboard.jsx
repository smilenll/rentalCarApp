import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContracts } from '../../redux';
import Contract from '../contract/contract';

const Dashboard = ({ contracts, storageContracts }) => {
  useEffect(() => {
    storageContracts();
  }, []);

  return contracts.loading ? (
    <h2>Loading</h2>
  ) : contracts.error ? (
    <h2>{contracts.error}</h2>
  ) : (
    <div className="row">
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
            </tr>
          </thead>
          <tbody>
            {contracts
          && contracts.allContracts.data
          && contracts.allContracts.data.map((item) => (
            <Contract key={item.id} contract={item} />
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  contracts: PropTypes.shape({
    allContracts: PropTypes.any.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
  }),
  storageContracts: PropTypes.func,
};
Dashboard.defaultProps = {
  contracts: {
    allContracts: [],
    error: 'No error',
    loading: 'Loading',
  },
  storageContracts: PropTypes.func,
};


const mapStateToProps = (state) => ({ contracts: state.ContractReducers });

const mapDispatchToProps = (dispatch) => ({
  storageContracts: () => dispatch(getContracts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
