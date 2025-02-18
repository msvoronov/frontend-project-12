import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../slices/authSlice.js';

const HeaderNavbar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Navbar expand="lg" bg="white" class="shadow-sm">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {auth.loggedIn
          ? <Button type="button" onClick={() => dispatch(logOut())}>Выйти</Button>
          : null}
      </Container>
    </Navbar>
  );
};

export default HeaderNavbar;
