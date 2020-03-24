const validateForm = (firstName, lastName, age, calculatedDays) => {
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
    currentErrors.age = 'You are too yong to drive';
  }
  if (calculatedDays < 1) {
    currentErrors.errors += 1;
    currentErrors.date = 'You date is invalid';
  }

  return currentErrors;
};

export default validateForm;
