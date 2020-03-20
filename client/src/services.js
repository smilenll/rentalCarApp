import axios from 'axios';

export const returnCar = async (contractId, returnDate) => {
  axios.put(`http://localhost:4000/api/contracts/${contractId}`, returnDate)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

export const singleCar = async (carId) => {
  let car = {}
  await axios.get(`http://localhost:4000/api/cars/${carId}`)
    .then((response) => car = response.data)
    .catch((error) => console.log(error));
  return car;
};