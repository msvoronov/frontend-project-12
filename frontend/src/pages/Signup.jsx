import React, { useEffect, useRef } from 'react';
import {
  Button, Form, Card, Image, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import avatarSignup from '../assets/avatarSignup.jpg';
import { routes } from '../routes/routes.js';
import { signUp } from '../slices/authSlice.js';

const Signup = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    if (auth.loggedIn) navigate(routes.chat);
  });
  useEffect(() => {
    inputRef.current.focus();
  }, [auth.error]);

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('signup.schema.min3'))
      .max(20, t('signup.schema.max20'))
      .required(t('signup.schema.required')),
    password: yup
      .string()
      .min(6, t('signup.schema.min6'))
      .required(t('signup.schema.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('signup.schema.mustMatch'))
      .required(t('signup.schema.required')),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit: (values) => dispatch(signUp(values)),
  });
  const isInputInvalid = (input) => auth.status === 'failed' || (formik.errors[input] && formik.touched[input]);
  const feedabckErrorText = (defaultText) => (auth.error === 'Request failed with status code 409'
    ? t('signup.errors.alreadyExists')
    : defaultText);

  return (
    <div className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image src={avatarSignup} roundedCircle alt="Регистрация" />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signup.title')}</h1>
                <Form.Group className="form-floating mb-3" controlId="username">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('signup.username')}
                    ref={inputRef}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    isInvalid={isInputInvalid('username')}
                  />
                  <Form.Label>{t('signup.username')}</Form.Label>
                  {auth.status === 'failed'
                    ? null
                    : <Form.Control.Feedback tooltip type="invalid" placement="right">{formik.errors.username}</Form.Control.Feedback>}
                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="password">
                  <Form.Control
                    name="password"
                    autoComplete="new-password"
                    required
                    placeholder={t('signup.password')}
                    type="password"
                    aria-describedby="passwordHelpBlock"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={isInputInvalid('password')}
                  />
                  <Form.Label>{t('signup.password')}</Form.Label>
                  {auth.status === 'failed'
                    ? null
                    : <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>}
                </Form.Group>
                <Form.Group className="form-floating mb-4" controlId="confirmPassword">
                  <Form.Control
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                    placeholder={t('signup.confirmPassword')}
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={isInputInvalid('confirmPassword')}
                  />
                  <Form.Label>{t('signup.confirmPassword')}</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">{feedabckErrorText(formik.errors.confirmPassword)}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="w-100 mb-3" variant="outline-primary">{t('signup.send')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('signup.hasAccount')}</span>
                <a href="/login">{t('signup.enter')}</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default Signup;
