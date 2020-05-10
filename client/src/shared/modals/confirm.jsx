import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './comfirm.css';

const Confirm = ({
  texts, show, setShow, submit,
}) => {
  const handleClose = () => setShow(false);
  const handleShow = () => submit();

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="special_modal"
    >
      <Modal.Body>{texts.massage}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleShow}>{texts.submit}</Button>
      </Modal.Footer>
    </Modal>
  );
};

Confirm.propTypes = {
  texts: PropTypes.shape({
    massage: PropTypes.string,
    submit: PropTypes.string,
  }).isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};

export default Confirm;
