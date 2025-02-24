import React, { useEffect, useRef } from 'react';
import {
  Button, Form, Card, Image,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import avatarLogin from '../assets/avatarLogin.jpg';
import { routes } from '../routes/routes.js';
import { useLogInMutation } from '../slices/authApi.js';
import { setLocalAuth } from '../slices/authSlice.js';

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const [logIn, { data, error }] = useLogInMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    if (auth.loggedIn) navigate(routes.chat);
  }, [auth.loggedIn, navigate]);

  useEffect(() => {
    if (data) dispatch(setLocalAuth(data));
    if (error) inputRef.current.focus();
  }, [data, error, dispatch]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => logIn(values),
  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={avatarLogin} roundedCircle alt="Войти" />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('login.enter')}</h1>
                <Form.Group className="form-floating mb-3" controlId="username">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('login.username')}
                    ref={inputRef}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={error}
                  />
                  <Form.Label>{t('login.username')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4" controlId="password">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder={t('login.password')}
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={error}
                  />
                  <Form.Label>{t('login.password')}</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">{t('login.feedback')}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="w-100 mb-3" variant="outline-primary">{t('login.enter')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.noAccount')}</span>
                <Link to="/signup">{t('login.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
