import React, { useState } from 'react';
import messageIcon from 'assets/imgs/logo-message.png';
import { Tooltip } from 'antd';
import './index.scss';
import ChatBox from '../Chats';
import { useSelector } from 'react-redux';

function ContactIcon() {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChatBox = () => {
    setIsChatVisible(!isChatVisible);
  };
  const { _id: userId } = useSelector((state) => state.user);
  console.log(userId);
  return (
    <>
      <Tooltip title="Liên hệ tư vấn" placement="left">
        <img
          style={{ opacity: 0.8 }}
          className="Contact-Icon"
          src={messageIcon}
          alt="Liên hệ tư vấn"
          onClick={toggleChatBox}
        />
      </Tooltip>

      {isChatVisible && (
        <div className="chat-box-container">
          {/*<ChatBox userId={userId} />*/}
        </div>
      )}
    </>
  );
}

export default ContactIcon;
