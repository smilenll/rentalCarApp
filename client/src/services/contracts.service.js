import fetch from 'cross-fetch';

const getCars = () => (
  fetch('http://localhost:4000/api/contracts')
    .then((res) => res.json())
    .then(
      (result) => result,
      (error) => ({
        massage: error,
      }),
    )
);

export {
  getCars,
};
