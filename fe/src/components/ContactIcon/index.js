import React from 'react';
import messageIcon from 'assets/imgs/logo-message.png';
import { Tooltip } from 'antd';
import './index.scss';

function ContactIcon() {
  return (
    <a
      className="Contact-Icon-Link"
      href="https://www.facebook.com/hathu.vu.357"
      target="blank">
      <Tooltip title="Liên hệ tư vấn" placement="left">
        <img
          style={{ opacity: 0.8 }}
          className="Contact-Icon"
          src={messageIcon}
        />
      </Tooltip>
    </a>
  );
}

export default ContactIcon;
