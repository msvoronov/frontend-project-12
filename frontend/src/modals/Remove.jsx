import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { sendRemoveChannel } from '../slices/channelsSlice.js';
import { hideModal } from '../slices/modalSlice.js';

const Remove = (props) => {
  const { processedChannel } = props;

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const removeHandler = () => {
    dispatch(sendRemoveChannel({ id: processedChannel.id, token: auth.token }))
      .then(() => {
        dispatch(hideModal());
        toast.success(t('remove.removed'));
      })
      .catch(() => {
        toast.error(t('errors.networkError'));
      });
  };

  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('remove.title')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('remove.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={() => dispatch(hideModal())}>{t('remove.cancel')}</Button>
          <Button type="button" variant="danger" onClick={removeHandler}>{t('remove.send')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
