import React from 'react';
import PropTypes from 'prop-types';
import Contract from '../contract/contract';

const DashboardTable = ({ contracts, amortizations }) => (contracts.error
  ? (<h3>{contracts.error}</h3>)
  : (
    <div className="row mt-4">
      <div className="col-12">
        <table className="table-custom-style">
          <thead>
            <tr className="table-header">
              <th scope="col">Car</th>
              <th data-toggle="tooltip" data-placement="top" title="First & Last name" scope="col">Customer</th>
              <th scope="col" data-toggle="tooltip " data-placement="top" title="First & Last name">From</th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="Estimated return date">To</th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="Estimated days">days</th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="Estimated price per day">
                price $/days
              </th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="Days until today">On day</th>
              <th
                scope="col"
                data-toggle="tooltip"
                data-placement="top"
                title="The price per day which customer has to pay today"
              >
                Current price
              </th>
              <th scope="col" data-toggle="tooltip" data-placement="top" title="Total price for now">Total price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contracts
            && contracts.allContracts
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
  ));

DashboardTable.propTypes = {
  contracts: PropTypes.shape({
    allContracts: PropTypes.any.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  amortizations: PropTypes.shape({
    allAmortizationFilters: PropTypes.any.isRequired,
    loading: PropTypes.bool,
  }).isRequired,
};

export default DashboardTable;
