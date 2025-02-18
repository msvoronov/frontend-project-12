import React, { useEffect, useRef } from 'react';
import {
  Button, Form, Card, Image, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import avatarSignup from '../assets/avatarSignup.jpg';
import { routes } from '../routes/routes.js';
import { signUp } from '../slices/authSlice.js';

const Signup = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    if (auth.loggedIn) navigate(routes.chat);
  });
  useEffect(() => {
    inputRef.current.focus();
  }, [auth.error]);

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup
      .string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Обязательное поле'),
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
    ? 'Такой пользователь уже существует'
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
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3" controlId="username">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Имя пользователя"
                    ref={inputRef}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    isInvalid={isInputInvalid('username')}
                  />
                  <Form.Label>Имя пользователя</Form.Label>
                  {auth.status === 'failed'
                    ? null
                    : <Form.Control.Feedback tooltip type="invalid" placement="right">{formik.errors.username}</Form.Control.Feedback>}
                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="password">
                  <Form.Control
                    name="password"
                    autoComplete="new-password"
                    required
                    placeholder="Пароль"
                    type="password"
                    aria-describedby="passwordHelpBlock"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    isInvalid={isInputInvalid('password')}
                  />
                  <Form.Label>Пароль</Form.Label>
                  {auth.status === 'failed'
                    ? null
                    : <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>}
                </Form.Group>
                <Form.Group className="form-floating mb-4" controlId="confirmPassword">
                  <Form.Control
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                    placeholder="Подтвердите пароль"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    isInvalid={isInputInvalid('confirmPassword')}
                  />
                  <Form.Label>Подтвердите пароль</Form.Label>
                  <Form.Control.Feedback tooltip type="invalid">{feedabckErrorText(formik.errors.confirmPassword)}</Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="w-100 mb-3" variant="outline-primary">Зарегистрироваться</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Уже есть аккаунт? </span>
                <a href="/login">Войти</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </div>
  );
};

export default Signup;
