import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { sendNewChannel } from '../slices/channelsSlice.js';
import { hideModal } from '../slices/modalSlice.js';

const Add = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const channels = useSelector((state) => state.channels);
  const { t } = useTranslation();
  const channelsName = Object.values(channels.entities)
    .map((channel) => channel.name);

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
      const channel = { name: values.name };
      dispatch(sendNewChannel({ channel, token: auth.token }));
      dispatch(hideModal());
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
