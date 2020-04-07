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
              <th data-toggle="tooltip" data-placement="top" title="First & Last name" scope="col">Customer</th>
              <th scope="col" data-toggle="tooltip " data-placement="top" title="First & Last name">From</th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="Estimated return date">To</th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="Estimated days">days</th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="Estimated price per day">price</th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="Days until today">On day</th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="The price per day which customer has to pay today">Current price</th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="Total price for now">Total price</th>
              <th scope="col">Actions</th>
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
