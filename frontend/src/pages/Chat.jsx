import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, Nav, Row, Col, Form, InputGroup,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  changeChannel, getChannels, addChannel, renameChannel, removeChannel,
} from '../slices/channelsSlice.js';
import { getMessages, sendMessage, addMessage } from '../slices/messagesSlice.js';
import { showModal } from '../slices/modalSlice.js';
import getModal from '../modals/index.js';
import useApi from '../hooks/useApi.js';

const Chat = () => {
  const modal = useSelector((state) => state.modal);
  const auth = useSelector((state) => state.auth);
  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const { socket } = useApi();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    dispatch(getChannels(auth.token));
    dispatch(getMessages(auth.token));

    const handleNewMessage = (payload) => {
      dispatch(addMessage(payload));
    };
    const handleNewChannel = (payload) => {
      dispatch(addChannel(payload));
    };
    const handleRenameChannel = (payload) => {
      dispatch(renameChannel(payload));
    };
    const handleRemoveChannel = (payload) => {
      dispatch(removeChannel(payload));
    };

    // обернуть это в абстракцию может быть
    socket.on('newMessage', (payload) => handleNewMessage(payload));
    socket.on('newChannel', (payload) => handleNewChannel(payload));
    socket.on('renameChannel', (payload) => handleRenameChannel(payload));
    socket.on('removeChannel', (payload) => handleRemoveChannel(payload));

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('renameChannel', handleRenameChannel);
      socket.off('removeChannel', handleRemoveChannel);
    };
  }, [auth.token, dispatch, socket]);

  const renderModal = () => {
    if (modal.type === null) return null;

    const Component = getModal(modal.type);
    return <Component processedChannel={modal.processedChannel} />;
  };

  const handleChangeChannel = (id) => {
    dispatch(changeChannel({ id }));
    document.querySelector('input[name="body"]').focus();
  };

  const schema = yup.object().shape({
    body: yup.string().trim().required(), // до проверки required обрезаем концевые пробелы
  });
  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: schema,
    validateOnBlur: false, // не проверяем при потере фокуса
    validateOnMount: true, // проверяем даже при первом рендере
    onSubmit: (values, { resetForm }) => {
      const message = {
        body: values.body,
        channelId: channels.currentChannelId,
        username: auth.username,
      };
      const data = { message, token: auth.token };
      dispatch(sendMessage(data));
      resetForm();
    },
  });
  return (
    <>
      <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <Button type="button" className="p-0 text-primary" variant="group-vertical" onClick={() => dispatch(showModal({ type: 'add' }))}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                  <span className="visually-hidden">+</span>
                </Button>
              </div>
              <Nav id="channels-box" className="flex-column nav-fill px-2 mb-3 overflow-auto h-100 d-block" variant="pills">
                {channels.ids.map((id) => {
                  const channel = channels.entities[id];
                  const variantBtn = id === channels.currentChannelId ? 'secondary' : '';
                  if (channel.removable) {
                    return (
                      <Nav.Item className="w-100" key={id}>
                        <Dropdown as={ButtonGroup} className="d-flex">
                          <Button className="w-100 rounded-0 text-start text-truncate" variant={variantBtn} onClick={() => handleChangeChannel(id)}>
                            <span className="me-1">#</span>
                            {channel.name}
                          </Button>
                          <Dropdown.Toggle split className="flex-grow-0" variant={variantBtn}>
                            <span className="visually-hidden">Управление каналом</span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => dispatch(showModal({ type: 'remove', channel }))}>Удалить</Dropdown.Item>
                            <Dropdown.Item onClick={() => dispatch(showModal({ type: 'rename', channel }))}>Переименовать</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Nav.Item>
                    );
                  }
                  return (
                    <Nav.Item className="w-100" key={id}>
                      <Button className="w-100 rounded-0 text-start" variant={variantBtn} onClick={() => handleChangeChannel(id)}>
                        <span className="me-1">#</span>
                        {channel.name}
                      </Button>
                    </Nav.Item>
                  );
                })}
              </Nav>
            </Col>
            <Col className="p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0">
                    <b>
                      {'# '}
                      {channels.entities[channels.currentChannelId]?.name}
                    </b>
                  </p>
                  <span className="text-muted">
                    {messages.ids
                      .filter((id) => messages.entities[id].channelId === channels.currentChannelId)
                      .length}
                    {' сообщений'}
                  </span>
                </div>
                <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                  {messages.ids.map((id) => {
                    if (messages.entities[id].channelId === channels.currentChannelId) {
                      const { body } = messages.entities[id];
                      const { username } = messages.entities[id];
                      return (
                        <div className="text-break mb-2" key={id}>
                          <b>{username}</b>
                          {': '}
                          {body}
                        </div>
                      );
                    }
                    return '';
                  })}
                </div>
                <div className="mt-auto px-5 py-3">
                  <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
                    <InputGroup>
                      <Form.Control
                        ref={inputRef}
                        name="body"
                        aria-label="Новое сообщение"
                        placeholder="Введите сообщение..."
                        className="border-0 p-0 ps-2"
                        onChange={formik.handleChange}
                        value={formik.values.body}
                      />
                      <Button type="submit" variant="group-vertical" disabled={formik.errors.body}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                          <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                        </svg>
                        <span className="visually-hidden">Отправить</span>
                      </Button>
                    </InputGroup>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {renderModal()}
    </>
  );
};

export default Chat;
