import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Confirm from '../../shared/modals/confirm';

const AmortizationRow = ({ item, deleteItem }) => {
  const [show, setShow] = useState(false);
  const handleDelete = () => {
    deleteItem(item.id);
  };

  return (
    <>
      <tr className={"table-row"} key={item.id}>
        <td>{item.name}</td>
        <td>{item.from}</td>
        <td>{item.to}</td>
        <td>{item.priceCoefficient}</td>
        <td className="text-right">
          <button
            type="button"
            className="delete-amortization-btn"
            onClick={() => setShow(true)}
          >
            Delete
          </button>
        </td>
      </tr>
      <Confirm
        show={show}
        setShow={setShow}
        submit={handleDelete}
        texts={{
          massage: 'Do you want to delete this amortization?',
          submit: 'Delete',
          cancel: 'Back',
        }}
      />
    </>
  );
};

AmortizationRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    from: PropTypes.number,
    to: PropTypes.number,
    priceCoefficient: PropTypes.number,
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default AmortizationRow;
