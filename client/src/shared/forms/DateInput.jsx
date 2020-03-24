import React from 'react';
import PropTypes from 'prop-types';

const DateInput = ({
  currentDateTime, setDeliveryDate,
}) => (
  <div className="col-md-12 mb-3">
    <label htmlFor="dropOff">Date</label>
    <input
      type="date"
      min={currentDateTime.slice(0, 10)}
      className="form-control"
      onChange={(e) => {
        const time = currentDateTime.slice(10);
        const addTimeToDate = e.target.value.concat(time);
        setDeliveryDate(addTimeToDate);
      }}
      id="dropOff"
      placeholder="Last name"
      required
    />
  </div>
);

DateInput.propTypes = {
  currentDateTime: PropTypes.string,
  setDeliveryDate: PropTypes.func,
};

export default DateInput;
