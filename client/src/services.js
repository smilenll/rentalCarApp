import axios from 'axios';
import { API_DOMAIN_NAME } from './configs/configs';

export const returnCar = (contractId, returnDate) => axios.put(`${API_DOMAIN_NAME}/contracts/${contractId}`, returnDate)
  .then((contract) => contract.data);

export const singleCar = (carId) => axios.get(`${API_DOMAIN_NAME}/cars/${carId}`)
  .then((response) => response.data);
