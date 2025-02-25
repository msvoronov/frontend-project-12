import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useSendNewChannel } from '../services/api.js';
import { hideModal } from '../slices/modalSlice.js';
import { removeLocalAuth } from '../slices/authSlice.js';
import { changeChannel } from '../slices/channelsSlice.js';

const Add = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [sendNewChannel, { data, error }] = useSendNewChannel();
  const channels = useSelector((state) => state.channels);
  const channelsName = Object.values(channels.entities)
    .map((channel) => channel.name);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(hideModal());
      dispatch(changeChannel(data));
      toast.success(t('add.created'));
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
      .min(3, t('add.schema.min3'))
      .max(20, t('add.schema.max20'))
      .required(t('add.schema.required'))
      .notOneOf(channelsName, t('add.schema.mustUnique')),
  });

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const channel = { name: filter.clean(values.name) };
      sendNewChannel(channel);
    },
  });
  return (
    <Modal show aria-labelledby="contained-modal-title-vcenter" centered onHide={() => dispatch(hideModal())}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('add.title')}
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
            <Form.Label visuallyHidden>{t('add.name')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="button" variant="secondary" className="me-2" onClick={() => dispatch(hideModal())}>{t('add.cancel')}</Button>
              <Button type="submit" variant="primary">{t('add.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
