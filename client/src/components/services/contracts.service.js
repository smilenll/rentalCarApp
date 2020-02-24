const getContracts = () => (
  fetch('http://localhost:4000/api/contracts')
    .then((res) => res.json())
    .then(
      (result) => result,
      (error) => ({
        massage: error,
      }),
    )
);

const getCars = () => (
  fetch('http://localhost:4000/api/cars')
    .then((res) => res.json())
    .then(
      (result) => result,
      (error) => ({
        massage: error,
      }),
    )
);

export {
  getContracts,
  getCars,
};
