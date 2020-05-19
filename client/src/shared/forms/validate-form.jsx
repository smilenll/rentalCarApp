export const validateRentForm = (firstName, lastName, age, calculatedDays) => {
  const currentErrors = { errors: 0 };

  if (firstName.length < 3) {
    currentErrors.errors += 1;
    currentErrors.firstName = 'First name must be at lease 3 characters';
  }
  if (lastName.length < 3) {
    currentErrors.errors += 1;
    currentErrors.lastName = 'Last name must be at lease 3 characters';
  }
  if (!age) {
    currentErrors.errors += 1;
    currentErrors.age = 'Age must be not empty';
  }
  if (age && age < 18) {
    currentErrors.errors += 1;
    currentErrors.age = 'You should be at least 18 years old';
  }
  if (calculatedDays < 1) {
    currentErrors.errors += 1;
    currentErrors.date = 'You date is invalid';
  }

  return currentErrors;
};

export const validateAmortizationForm = (name, from, to, priceCoefficient) => {
  const currentErrors = { errors: 0 };

  if (name.length < 1) {
    currentErrors.errors += 1;
    currentErrors.name = 'First name must be at lease 1 characters';
  }

  if (from >= to) {
    currentErrors.errors += 1;
    currentErrors.from = 'From must be be for "To"';
  }

  if (to <= from) {
    currentErrors.errors += 1;
    currentErrors.to = 'At leas one year from "From" ';
  }

  if (priceCoefficient <= 0) {
    currentErrors.errors += 1;
    currentErrors.priceCoefficient = 'Price coefficient must be positive number';
  }

  return currentErrors;
};
