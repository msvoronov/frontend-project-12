import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { sendRemoveChannel } from '../slices/channelsSlice.js';
import { hideModal } from '../slices/modalSlice.js';

const Remove = (props) => {
  const { processedChannel } = props;

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const removeHandler = () => {
    dispatch(sendRemoveChannel({ id: processedChannel.id, token: auth.token }));
    dispatch(hideModal());
  };

  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          Удалить канал
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={() => dispatch(hideModal())}>Отменить</Button>
          <Button type="button" variant="danger" onClick={removeHandler}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
