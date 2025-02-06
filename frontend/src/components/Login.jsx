import React from 'react';
import { Formik, Field, Form } from 'formik';
import avatar from '../assets/avatar.jpg';

const Login = () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={({ setSubmitting }) => {
      console.log('!!!');
      setSubmitting(false);
    }}
  >
    {() => (
      <div className="d-flex flex-column h-100">
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body row p-5">
                  <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                    <img src={avatar} className="rounded-circle" alt="Войти" />
                  </div>
                  <Form className="col-12 col-md-6 mt-3 mt-md-0">
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                      <Field
                        name="username"
                        autocomplete="username"
                        required
                        placeholder="Ваш ник"
                        id="username"
                        class="form-control"
                      />
                      <label className="form-label" htmlFor="username">Ваш ник</label>
                    </div>
                    <div className="form-floating mb-4">
                      <Field
                        name="password"
                        autocomplete="current-password"
                        required
                        placeholder="Пароль"
                        type="password"
                        id="password"
                        class="form-control"
                      />
                      <label className="form-label" htmlFor="password">Пароль</label>
                      <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
                    </div>
                    <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                  </Form>
                </div>
                <div className="card-footer p-4">
                  <div className="text-center">
                    <span>Нет аккаунта?</span>
                    {' '}
                    <a href="/signup">Регистрация</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </Formik>
);

export default Login;
