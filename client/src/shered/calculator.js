export const calcDays = (expectedReturnDate) => {
  const today = new Date().getTime();
  const delivery = new Date(expectedReturnDate).getTime();
  const differenceInTime = delivery - today;

  return Math.ceil(differenceInTime / (1000 * 3600 * 24));
};

export const calculateDiscounts = (differenceInDays) => {

  let tax = {
    price: 0,
    massage: '',
  };

  if (differenceInDays > 2 && differenceInDays <= 6) {
    tax = {
      price: 0.85,
      massage: '15% Discount for 2 to 6 days',
    };
    return tax;
  }
  if (differenceInDays >= 7) {
    tax = {
      price: 0.75,
      massage: '25% Discount up to 7 days',
    };

    return tax;
  }
  return false;
};

export const calculateTaxes = (age) => (
  age < 25 && {
    price: 1.20,
    massage: 'Yong fee increase price buy 20%',
  }
);

export const calculateBasePrice = (car, differenceInDays) => (
  {
    price: car.carClass.price * differenceInDays,
    massage: `Car class ${car.carClass.name} for ${car.carClass.price}$/day for ${differenceInDays} days`,
  }
);

export const calculateTotalBill = (age, car, calculatedDays) => {
  const getBill = [
    calculateBasePrice(car, calculatedDays),
    calculateDiscounts(calculatedDays),
    calculateTaxes(age),
  ];
  return getBill.reduce((acc, item) => {
    acc.price = item && item.price
      ? item.price * acc.price
      : acc.price;
    acc.massages = item && item.massage
      ? [...acc.massages, item.massage]
      : acc.massages;
    return acc;
  }, {
    price: 1,
    massages: [],
  });
};

export const calculateReturnPrice = (contractDays, actualDays, price) => ('test');