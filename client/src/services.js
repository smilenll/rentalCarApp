import axios from 'axios';

export const returnCar = (contractId, returnDate) => axios.put(`http://localhost:4000/api/contracts/${contractId}`, returnDate)
  .then((contract) => contract.data);

export const singleCar = (carId) => axios.get(`http://localhost:4000/api/cars/${carId}`)
  .then((response) => response.data);
