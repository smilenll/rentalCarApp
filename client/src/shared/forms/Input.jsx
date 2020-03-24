import React from 'react';
import PropTypes from 'prop-types';
import Car from '../../components/car/car';

const Input = ({
  label, type, id, value, error, setInput, formStartValidation
}) => (

  <div className="col-md-12 mb-3">
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      className={`form-control ${error && formStartValidation && 'is-invalid'}`}
      id={id}
      placeholder={label}
      value={value}
      onChange={(e) => setInput(e.target.value)}
      required
    />
    <div className="invalid-feedback">
      {formStartValidation && error}
    </div>
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.string,
  setInput: PropTypes.func,
  formStartValidation: PropTypes.bool,
};

// not working properly
Car.defaultProps = {
  label: '',
  type: '',
  id: '',
  value: '',
  error: '',
  setInput: '',
  formStartValidation: false,
};

export default Input;
