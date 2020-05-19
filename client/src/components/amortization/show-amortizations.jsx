import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAmortization, getAmortizations } from '../../redux';
import AmortizationRow from './amortization-row';

class ShowAmortization extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteAmortization = this.handleDeleteAmortization.bind(this);
  }

  componentDidMount() {
    const { storageAmortizations } = this.props;
    storageAmortizations();
  }

  async handleDeleteAmortization(id) {
    const { storageDeleteAmortization, storageAmortizations } = this.props;
    await storageDeleteAmortization(id);
    await storageAmortizations();
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
        <table className="table-custom-style mt-4">
          <thead>
            <tr className="table-header">
              <th>Name</th>
              <th>From</th>
              <th>To</th>
              <th>Coefficient</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {amortizationsArray.map((item) => (
              <AmortizationRow item={item} deleteItem={this.handleDeleteAmortization} />
            ))}
          </tbody>
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
  storageDeleteAmortization: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({ amortizations: state.AmortizationReducers });

const mapDispatchToProps = (dispatch) => ({
  storageAmortizations: () => dispatch(getAmortizations()),
  storageDeleteAmortization: (id) => dispatch(deleteAmortization(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowAmortization);
