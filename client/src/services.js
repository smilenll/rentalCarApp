import axios from 'axios';

export const returnCar = async (contractId, returnDate) => {
  axios.put(`http://localhost:4000/api/contracts/${contractId}`, returnDate)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};
