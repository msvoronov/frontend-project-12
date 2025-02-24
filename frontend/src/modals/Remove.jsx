import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSendRemoveChannelMutation } from '../slices/channelsApi.js';
import { hideModal } from '../slices/modalSlice.js';
import { removeLocalAuth } from '../slices/authSlice.js';

const Remove = () => {
  const { processedChannel } = useSelector((state) => state.modal);
  const auth = useSelector((state) => state.auth);

  const [sendRemoveChannel, { data, error }] = useSendRemoveChannelMutation();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const removeHandler = () => sendRemoveChannel({ token: auth.token, id: processedChannel.id });

  useEffect(() => {
    if (data) {
      dispatch(hideModal());
      toast.success(t('remove.removed'));
    }
    if (error) {
      if (error.status === 401) {
        toast.error(t('errors.fetchError'));
        dispatch(removeLocalAuth());
      } else {
        toast.error(t('errors.networkError'));
      }
    }
  }, [data, error, dispatch, t]);

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
