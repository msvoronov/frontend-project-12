import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, Nav, Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { changeChannel } from '../../slices/channelsSlice.js';
import { showModal } from '../../slices/modalSlice.js';

const Channels = () => {
  const channels = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleChangeChannel = (id) => {
    dispatch(changeChannel({ id }));
  };

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
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
                    <span className="visually-hidden">{t('chat.management')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => dispatch(showModal({ type: 'remove', channel }))}>{t('chat.remove')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => dispatch(showModal({ type: 'rename', channel }))}>{t('chat.rename')}</Dropdown.Item>
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
  );
};

export default Channels;
