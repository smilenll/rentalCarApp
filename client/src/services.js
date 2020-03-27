import axios from 'axios';

export const returnCar = async (contractId, returnDate) => {
  let response;
  await axios.put(`http://localhost:4000/api/contracts/${contractId}`, returnDate)
    .then((contract) => response = contract.data)
    .catch((error) => response = error);

  return response;
};

export const singleCar = async (carId) => {
  let car = {};
  await axios.get(`http://localhost:4000/api/cars/${carId}`)
    .then((response) => car = response.data)
    .catch((error) => console.log(error));
  return car;
};