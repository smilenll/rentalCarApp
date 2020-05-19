import React from 'react';
import PropTypes from 'prop-types';

const Bill = ({ bill, carPrice, currentAmortizationFilter }) => (
  <>
    {
        bill.price <= 1.2
          ? (
            <h6 className="text-right empty-form-msg">For estimated price fill the form.</h6>
          )
          : (
            <table className="table-custom-style mt-3 mb-3">
              <tbody className="table-custom-style">
                {bill && bill.massages.map((item) => (
                  <tr className="table-row" key={item}>
                    <td colSpan="2" className="text-right">
                      {item}
                    </td>
                  </tr>
                ))}
                {/* Where to put this? In calc or hear */}
                <tr className="table-row">
                  <td colSpan="2" className="text-right">
                    Car is
                    {' '}
                    {currentAmortizationFilter.name}
                    {' '}
                    and price is changed to
                    {' '}
                    {(carPrice * currentAmortizationFilter.priceCoefficient)
                      .toFixed(2)}
                      {' '}
                    $/day
                  </td>
                </tr>
                <tr className="table-row">
                  <td>
                    <h5 className="estimation-table-total">
                      Total
                    </h5>
                  </td>
                  <td className="text-right">
                    <h5 className="estimation-table-total">
                      {(bill.price * currentAmortizationFilter.priceCoefficient).toFixed(2)}
                      {' '}
                      $
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          )
      }
  </>
);

Bill.propTypes = {
  bill: PropTypes.shape({
    massages: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
  }).isRequired,
  carPrice: PropTypes.number,
  currentAmortizationFilter: PropTypes.shape({
    name: PropTypes.string,
    priceCoefficient: PropTypes.number,
  }).isRequired,
};

Bill.defaultProps = {
  carPrice: 0,
};

export default Bill;
