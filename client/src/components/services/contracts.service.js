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

export default getContracts;
