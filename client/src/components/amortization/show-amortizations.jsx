import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAmortizations } from '../../redux';

class ShowAmortization extends Component {
  componentDidMount() {
    const { storageAmortizations } = this.props;
    storageAmortizations();
  }

  render() {
    const { amortizations } = this.props;
    const amortizationsArray = amortizations.allAmortizationFilters.data;

    if (amortizations.loading) {
      return <h4>Loading</h4>;
    }
    if (amortizations.error) {
      return <h4>{amortizations.error}</h4>;
    }
    if (amortizationsArray) {
      return (
        <table className="table table-hover table-dark">
          <tr>
            <td>Name</td>
            <td>From</td>
            <td>To</td>
            <td>Actions</td>
          </tr>
          {amortizationsArray.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.from}</td>
              <td>{item.to}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-block"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      );
    }
    return <h1>Loading</h1>;
  }
}

ShowAmortization.propTypes = {
  amortizations: PropTypes.shape({
    allAmortizationFilters: PropTypes.any.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool,
  }).isRequired,
  storageAmortizations: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({ amortizations: state.AmortizationReducers });

const mapDispatchToProps = (dispatch) => ({
  storageAmortizations: () => dispatch(getAmortizations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowAmortization);
