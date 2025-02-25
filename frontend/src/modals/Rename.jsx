import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useSendRenameChannel } from '../services/api.js';
import { hideModal } from '../slices/modalSlice.js';
import { removeLocalAuth } from '../slices/authSlice.js';

const Rename = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [sendRenameChannel, { data, error }] = useSendRenameChannel();
  const { processedChannel } = useSelector((state) => state.modal);
  const channels = useSelector((state) => state.channels);
  const channelsName = Object.values(channels.entities)
    .map((channel) => channel.name);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
    inputRef.current.select();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(hideModal());
      toast.success(t('rename.renamed'));
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

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, t('rename.schema.min3'))
      .max(20, t('rename.schema.max20'))
      .required(t('rename.schema.required'))
      .notOneOf(channelsName, t('rename.schema.mustUnique')),
  });

  const formik = useFormik({
    initialValues: { name: processedChannel.name },
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const channel = { name: filter.clean(values.name), id: processedChannel.id };
      sendRenameChannel(channel);
    },
  });
  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('rename.title')}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              className="mb-2"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <Form.Label visuallyHidden>{t('rename.name')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" variant="secondary" className="me-2" onClick={() => dispatch(hideModal())}>{t('rename.cancel')}</Button>
              <Button type="submit" variant="primary">{t('rename.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
