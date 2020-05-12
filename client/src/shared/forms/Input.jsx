import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Car from '../../components/car/car';

const Input = ({
  label, type, id, value, error, setInput, formStartValidation,
}) => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (formStartValidation) {
      setShowError(true);
    }
  }, [formStartValidation]);

  return (
    <div className="col-md-12 mb-3">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className={`form-control ${error && showError && 'is-invalid'}`}
        id={id}
        placeholder={label}
        value={value}
        onChange={(e) => {
          setShowError(true);
          setInput(e.target.value);
        }}
        required
      />
      <div className="invalid-feedback">
        {showError && error}
      </div>
    </div>
  );
};

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
