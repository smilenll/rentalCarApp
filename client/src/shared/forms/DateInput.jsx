import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const DateInput = ({
  currentDateTime, setDeliveryDate, error, formStartValidation,
}) => {
  const handleUpdate = (e) => {
    const time = currentDateTime.slice(10);
    const addTimeToDate = e.target.value.concat(time);
    setDeliveryDate(addTimeToDate);
  };

  const errorStyle = {
    fontSize: '80%',
    color: '#dc3545',
  };

  return (
    <div className="col-md-12 mb-3">
      <label htmlFor="dropOff">Return date</label>
      <input
        type="date"
        min={moment(currentDateTime).add(1, 'd').toISOString().slice(0, 10)}
        className="form-control"
        onChange={(e) => {
          handleUpdate(e);
        }}
        id="dropOff"
        placeholder="Last name"
        required
      />
      <p style={errorStyle}>
        {formStartValidation && error}
      </p>
    </div>
  );
};

DateInput.propTypes = {
  currentDateTime: PropTypes.string.isRequired,
  setDeliveryDate: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  formStartValidation: PropTypes.bool.isRequired,
};

export default DateInput;
