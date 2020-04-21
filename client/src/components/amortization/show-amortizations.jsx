import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAmortization, getAmortizations } from '../../redux';

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
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <td>Name</td>
              <td>From</td>
              <td>To</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {amortizationsArray.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.from}</td>
                <td>{item.to}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-block"
                    onClick={() => this.handleDeleteAmortization(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
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
