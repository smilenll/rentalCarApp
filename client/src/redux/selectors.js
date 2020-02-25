export const getContractsState = (store) => store.allContracts;

export const getSingleContract = (store, id) => getContractsState(store).find(
  (contract) => contract.id === id,
);
