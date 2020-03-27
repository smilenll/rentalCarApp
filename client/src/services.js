import axios from 'axios';

export const returnCar = (contractId, returnDate) => {

  return axios.put(`http://localhost:4000/api/contracts/${contractId}`, returnDate)
    .then((contract) => contract.data);

};

export const singleCar = async (carId) => {
  let car = {};
  await axios.get(`http://localhost:4000/api/cars/${carId}`)
    .then((response) => car = response.data)
    .catch((error) => console.log(error));
  return car;
};