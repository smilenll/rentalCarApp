import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postAmortization } from '../../redux';
import Input from '../../shared/forms/Input';
import { validateAmortizationForm } from '../../shared/forms/validate-form';


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

    return this.props.sendAmortizationForm({
      name: this.state.name,
      from: this.state.from,
      to: this.state.to,
    });
  }

  render() {
    return (
      <div>
        <h2>From ADD Todo</h2>
        <Input
          label="Name"
          type="text"
          id="Name"
          value={this.state.name}
          error={this.state.errors.name}
          setInput={this.updateName}
          formStartValidation
        />
        <Input
          label="From"
          type="number"
          id={this.state.from}
          value={this.state.from}
          error={this.state.errors.from}
          setInput={this.updateFrom}
          formStartValidation
        />
        <Input
          label="To"
          type="number"
          id="To"
          value={this.state.to}
          error={this.state.errors.to}
          setInput={this.updateTo}
          formStartValidation
        />
        <button
          className="btn btn-outline-success btn-block"
          onClick={this.handleSendForm}
        >
          Add Amortization range
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendAmortizationForm: (formData) => dispatch(postAmortization(formData)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CreateAmortization);
