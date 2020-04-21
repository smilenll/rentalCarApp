import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postAmortization } from '../../redux';
import Input from '../../shared/forms/Input';
import { validateAmortizationForm } from '../../shared/forms/validate-form';
import PropTypes from 'prop-types';


class CreateAmortization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      from: 0,
      to: 0,
      errors: {},
    };
    this.updateName = this.updateName.bind(this);
    this.updateFrom = this.updateFrom.bind(this);
    this.updateTo = this.updateTo.bind(this);
    this.handleSendForm = this.handleSendForm.bind(this);
  }

  async updateName(name) {
    await this.setState({ name });
    await this.setState({ errors: this.validate() });
  }

  async updateFrom(from) {
    await this.setState({ from: +from });
    await this.setState({ errors: this.validate() });
  }

  async updateTo(to) {
    await this.setState({ to: +to });
    await this.setState({ errors: this.validate() });
  }

  validate() {
    return validateAmortizationForm(this.state.name, this.state.from, this.state.to);
  }

  async handleSendForm() {
    if (this.validate().errors !== 0) {
      await this.setState({ errors: this.validate().errors });
    }

    const { name, from, to } = this.state;
    const { sendAmortizationForm } = this.props;

    return sendAmortizationForm({
      name,
      from,
      to,
    });
  }

  render() {
    const {
      name,
      from,
      to,
      errors,
    } = this.state;

    return (
      <div>
        <h2>Create Amortization range</h2>
        <Input
          label="Name"
          type="text"
          id="Name"
          value={name}
          error={errors.name}
          setInput={this.updateName}
          formStartValidation
        />
        <Input
          label="From"
          type="number"
          id="From"
          value={from}
          error={errors.from}
          setInput={this.updateFrom}
          formStartValidation
        />
        <Input
          label="To"
          type="number"
          id="To"
          value={to}
          error={errors.to}
          setInput={this.updateTo}
          formStartValidation
        />
        <button
          type="button"
          className="btn btn-outline-success btn-block"
          onClick={this.handleSendForm}
        >
          Add Amortization range
        </button>
      </div>
    );
  }
}

CreateAmortization.propTypes = {
  sendAmortizationForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendAmortizationForm: (formData) => dispatch(postAmortization(formData)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateAmortization);
