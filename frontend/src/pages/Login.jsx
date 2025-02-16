import React, { useEffect, useRef } from 'react';
import {
  Button, Form, Card, Image,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar.jpg';
import { routes } from '../routes/routes.js';
import { logIn } from '../slices/authSlice.js';

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    if (auth.loggedIn) navigate(routes.chat);
  });
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => dispatch(logIn(values)),
  });
  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <Image src={avatar} variant="roundedCircle" alt="Войти" />
                </div>
                <Form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group className="form-floating mb-3" controlId="username">
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      required
                      placeholder="Ваш ник"
                      ref={inputRef}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={auth.status === 'failed'}
                    />
                    <Form.Label>Ваш ник</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4" controlId="password">
                    <Form.Control
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder="Пароль"
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={auth.status === 'failed'}
                    />
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control.Feedback tooltip type="invalid">Неверные имя пользователя или пароль</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" className="w-100 mb-3" variant="outline-primary">Войти</Button>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <a href="/signup">Регистрация</a>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
