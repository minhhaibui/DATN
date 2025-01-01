import React from 'react';
import { List, Avatar } from 'antd';

const MessageList = ({ messages }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={messages}
      renderItem={(message) => (
        <List.Item
          style={{
            justifyContent:
              message.sender === 'user' ? 'flex-end' : 'flex-start',
          }}>
          {message.sender === 'admin' && (
            <Avatar style={{ backgroundColor: '#f56a00' }}>A</Avatar>
          )}
          <div
            style={{
              padding: '10px',
              borderRadius: '8px',
              backgroundColor:
                message.sender === 'user' ? '#1890ff' : '#f0f0f0',
              color: message.sender === 'user' ? 'white' : 'black',
              maxWidth: '60%',
            }}>
            {message.message}
          </div>
          {message.sender === 'user' && (
            <Avatar style={{ backgroundColor: '#87d068' }}>U</Avatar>
          )}
        </List.Item>
      )}
    />
  );
};

export default MessageList;
