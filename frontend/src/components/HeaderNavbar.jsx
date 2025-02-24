import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeLocalAuth } from '../slices/authSlice.js';

const HeaderNavbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <Navbar expand="lg" bg="white" class="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {auth.loggedIn
          ? <Button type="button" onClick={() => dispatch(removeLocalAuth())}>{t('navbar.logout')}</Button>
          : null}
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;
