import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Messages = () => {
  const channels = useSelector((state) => state.channels);
  const messages = useSelector((state) => state.messages);
  const { t } = useTranslation();

  const countMessages = () => messages.ids
    .filter((id) => messages.entities[id].channelId === channels.currentChannelId)
    .length;

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            {'# '}
            {channels.entities[channels.currentChannelId]?.name}
          </b>
        </p>
        <span className="text-muted">
          {countMessages()}
          {' '}
          {t('chat.message', { count: countMessages() })}
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
    </>
  );
};

export default Messages;
