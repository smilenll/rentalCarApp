import React from 'react';
import PropTypes from 'prop-types';

const Bill = ({ bill, carPrice, currentAmortizationFilter }) => (
  <>
    <h4 className="text-right">Estimated price</h4>
    {
        bill.price <= 1.2
          ? (
            <h5 className="text-right empty-form-msg">For estimated price fill the form</h5>
          )
          : (
            <table className="table table-striped table-dark ">
              <tbody>
                {bill && bill.massages.map((item) => (
                  <tr key={item}>
                    <td colSpan="2" className="text-right">
                      {item}
                    </td>
                  </tr>
                ))}
                {/*Where to put this? In calc or hear*/}
                <tr>
                  <td colSpan="2" className="text-right">
                    Car is
                    {' '}
                    {currentAmortizationFilter.name}
                    {' '}
                    and price is changed to
                    {' '}
                    {(carPrice * currentAmortizationFilter.priceCoefficient)
                      .toFixed(2)}
                    $/day
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2>
                      Total
                    </h2>
                  </td>
                  <td className="text-right">
                    <h2>
                      {(bill.price * currentAmortizationFilter.priceCoefficient).toFixed(2)}
                      {' '}
                      $
                    </h2>
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
    massages: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  carPrice: PropTypes.number.isRequired,
  currentAmortizationFilter: PropTypes.shape({
    name: PropTypes.string,
    priceCoefficient: PropTypes.number,
  }).isRequired,
};

export default Bill;