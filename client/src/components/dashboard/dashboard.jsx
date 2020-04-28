import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAmortizations, getContracts } from '../../redux';
import Contract from '../contract/contract';

const Dashboard = ({
  contracts, amortizations, storageContracts, storageAmortizations,
}) => {
  useEffect(() => {
    storageContracts();
    storageAmortizations();
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
              <th scope="col" data-toggle="tooltip" data-placement="top" title="Estimated price per day">price $/days</th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="Days until today">On day</th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="The price per day which customer has to pay today">Current price</th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="Total price for now">Total price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts
          && contracts.allContracts.data
          && amortizations.allAmortizationFilters.data
          && contracts.allContracts.data.map((item) => (
            <Contract
              key={item.id}
              contract={item}
              amortizationFilters={amortizations.allAmortizationFilters.data}
            />
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
  }).isRequired,
  amortizations: PropTypes.shape({
    allAmortizationFilters: PropTypes.any.isRequired,
    loading: PropTypes.bool,
  }).isRequired,
  storageContracts: PropTypes.func.isRequired,
  storageAmortizations: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
  contracts: state.ContractReducers,
  amortizations: state.AmortizationReducers,
});

const mapDispatchToProps = (dispatch) => ({
  storageContracts: () => dispatch(getContracts()),
  storageAmortizations: () => dispatch(getAmortizations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
