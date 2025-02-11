import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import cn from 'classnames';
import { apiRoutes } from '../utils/routes.js';
import { actions as actionsChannels } from '../slices/channelsSlice.js';
import { actions as actionsMessages } from '../slices/messagesSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

const Chat = () => {
  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    const requestData = async () => {
      const header = getAuthHeader();

      const response1 = await axios.get(apiRoutes.channelsPath(), { headers: header });
      response1.data.forEach((channel) => dispatch(actionsChannels.addChannel({ channel })));

      const response2 = await axios.get(apiRoutes.messagesPath(), { headers: header });
      response2.data.forEach((message) => dispatch(actionsMessages.addMessage({ message })));
    };
    requestData();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <p>{JSON.stringify(channels, null, ' ')}</p>
      <p>{JSON.stringify(messages, null, ' ')}</p>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <button type="button" className="p-0 text-primary btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
              {channels.ids.map((id) => {
                const { name } = channels.entities[id];
                return (
                  <li className="nav-item w-100" key={id}>
                    <button type="button" className={cn('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': id === channels.currentChannelId })}>
                      <span className="me-1">#</span>
                      {name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0"><b># general</b></p>
                <span className="text-muted">0 сообщений</span>
              </div>
              <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                {messages.ids.map((id) => {
                  if (messages.entities[id].channelId === channels.currentChannelId) {
                    const { body } = messages.entities[id];
                    const { username } = messages.entities[id];
                    return (
                      <div className="text-break mb-2" key={id}>
                        <b>{username}</b>
                        :
                        {' '}
                        {body}
                      </div>
                    );
                  }
                  return '';
                })}
              </div>
              <div className="mt-auto px-5 py-3">
                <form noValidate="" className="py-1 border rounded-2">
                  <div className="input-group has-validation">
                    <input name="body" aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" value="" />
                    <button type="submit" disabled="" className="btn btn-group-vertical">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                      </svg>
                      <span className="visually-hidden">Отправить</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
/*
Созданный канал
<li class="nav-item w-100">
            <div role="group" class="d-flex dropdown btn-group">
              <button type="button" class="w-100 rounded-0 text-start text-truncate btn">
                <span class="me-1">#</span>task3
              </button>
              <button type="button" id="react-aria5886053601-:r0:" aria-expanded="false" class="flex-grow-0 dropdown-toggle dropdown-toggle-split btn">
                <span class="visually-hidden">Управление каналом</span>
              </button>
              <div x-placement="bottom-start" aria-labelledby="react-aria5886053601-:r0:" class="dropdown-menu" data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-start" style="position: absolute; inset: 0px auto auto 0px; transform: translate3d(897.6px, 278.4px, 0px);">
                <a data-rr-ui-dropdown-item="" class="dropdown-item" role="button" tabindex="0" href="#">Удалить</a>
                <a data-rr-ui-dropdown-item="" class="dropdown-item" role="button" tabindex="0" href="#">Переименовать</a>
              </div>
            </div>
          </li>
*/
export default Chat;
