import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Row, Col, Form, InputGroup,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import {
  addChannel, renameChannel, removeChannel,
} from '../slices/channelsSlice.js';
import { useGetMessagesMutation, useSendMessageMutation } from '../slices/messagesApi.js';
import { useGetChannelsMutation } from '../slices/channelsApi.js';
import { addMessage } from '../slices/messagesSlice.js';
import { removeLocalAuth } from '../slices/authSlice.js';
import getModal from '../modals/index.js';
import useApi from '../hooks/useApi.js';
import Channels from './chat/Channels.jsx';
import Messages from './chat/Messages.jsx';

const Chat = () => {
  const modal = useSelector((state) => state.modal);
  const auth = useSelector((state) => state.auth);
  const channels = useSelector((state) => state.channels);
  const [sendMessage] = useSendMessageMutation();
  const [
    getMessages,
    { data: getMessagesData, error: getMessagesError },
  ] = useGetMessagesMutation();
  const [
    getChannels,
    { data: getChannelsData, error: getChannelsError },
  ] = useGetChannelsMutation();

  const dispatch = useDispatch();
  const { socket } = useApi();
  const inputRef = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    if (channels.ids.length === 0) {
      getChannels(auth.token);
      getMessages(auth.token);
    }
  }, [auth.token, channels.ids.length, getChannels, getMessages]);
  useEffect(() => {
    if (getChannelsData) {
      getChannelsData.forEach((channel) => dispatch(addChannel(channel)));
    }
  }, [getChannelsData, dispatch]);
  useEffect(() => {
    if (getMessagesData) {
      getMessagesData.forEach((message) => dispatch(addMessage(message)));
    }
  }, [getMessagesData, dispatch]);
  useEffect(() => {
    if (getMessagesError || getChannelsError) {
      const error = getMessagesError || getChannelsError;
      if (error.status === 401) {
        toast.error(t('errors.fetchError'));
        dispatch(removeLocalAuth());
      } else {
        toast.error(t('errors.networkError'));
      }
    }
  }, [getChannelsError, getMessagesError, dispatch, t]);

  useEffect(() => {
    socket.on('newMessage', (payload) => dispatch(addMessage(payload)));
    socket.on('newChannel', (payload) => dispatch(addChannel(payload)));
    socket.on('renameChannel', (payload) => dispatch(renameChannel(payload)));
    socket.on('removeChannel', (payload) => dispatch(removeChannel(payload)));

    // Выполняется при размонтировании компонента
    return () => {
      socket.disconnect(); // вместо нескольких socket.off()
    };
  }, [dispatch, socket]);

  useEffect(() => {
    inputRef.current.focus();
  }, [channels.currentChannelId]);

  const renderModal = () => {
    if (modal.type === null) return null;

    const Modal = getModal(modal.type);
    return <Modal />;
  };

  const schema = yup.object().shape({
    body: yup.string().trim().required(), // сразу обрезаем концевые пробелы
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
        body: filter.clean(values.body),
        channelId: channels.currentChannelId,
        username: auth.username,
      };
      sendMessage({ token: auth.token, message });
      resetForm();
    },
  });
  return (
    <>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
              <Messages />
              <div className="mt-auto px-5 py-3">
                <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
                  <InputGroup>
                    <Form.Control
                      ref={inputRef}
                      name="body"
                      aria-label={t('chat.ariaLabel')}
                      placeholder={t('chat.placeholder')}
                      className="border-0 p-0 ps-2"
                      onChange={formik.handleChange}
                      value={formik.values.body}
                    />
                    <Button type="submit" variant="group-vertical" disabled={formik.errors.body}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                      </svg>
                      <span className="visually-hidden">{t('chat.send')}</span>
                    </Button>
                  </InputGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {renderModal()}
    </>
  );
};

export default Chat;
