import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAmortizations, getContracts } from '../../redux';
import DashboardTable from './dashboard-table';

const Dashboard = ({
  contracts, amortizations, storageContracts, storageAmortizations,
}) => {
  useEffect(() => {
    storageContracts();
    storageAmortizations();
  }, []);

  return contracts.loading
    ? (<h2>Loading</h2>)
    : (
      <DashboardTable
        contracts={contracts}
        amortizations={amortizations}
      />
    );
};

Dashboard.propTypes = {
  contracts: PropTypes.shape({
    loading: PropTypes.bool,
  }).isRequired,
  amortizations: PropTypes.shape({}).isRequired,
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
