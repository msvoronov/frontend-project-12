import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar.jpg';
import { routes } from '../routes/routes.js';
import { logIn } from '../slices/authSlice.js';

const Login = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();  
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.loggedIn) navigate(routes.chat);

    const controls = document.querySelectorAll('.form-control');
    if (auth.status === 'failed') {
      controls.forEach((control) => control.classList.add('is-invalid'));
    } else {
      controls.forEach((control) => control.classList.remove('is-invalid'));
    }
  });

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
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={avatar} className="rounded-circle" alt="Войти" />
                </div>
                <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">Войти</h1>
                  <div className="form-floating mb-3">
                    <input
                      name="username"
                      autoComplete="username"
                      required
                      placeholder="Ваш ник"
                      id="username"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    <label className="form-label" htmlFor="username">Ваш ник</label>
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder="Пароль"
                      type="password"
                      id="password"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <label className="form-label" htmlFor="password">Пароль</label>
                    <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
                  </div>
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
                </form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <a href="/signup">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
