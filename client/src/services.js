import axios from 'axios';
import { API_DOMAIN_NAME } from './configs/configs';

export const returnCar = (contractId, returnDate) => axios.put(`${API_DOMAIN_NAME}/contracts/${contractId}`, returnDate)
  .then((contract) => contract.data);

export const singleCar = (carId) => {
  axios.get(`http://localhost:4000/api/cars/${carId}`)
    .then((response) => response.data ,(err) => {
      console.log("err", err);
      throw Error("parser errror")
    }).catch((err) => {
      console.log("err2", err);
    });
};
