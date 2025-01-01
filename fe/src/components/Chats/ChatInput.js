import React, { useState } from 'react';
import { Input, Button } from 'antd';

const MessageInput = ({ onSend }) => {
  const [content, setContent] = useState('');

  const handleSend = () => {
    if (content.trim()) {
      onSend(content);
      setContent('');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Input
        placeholder="Nhập tin nhắn..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onPressEnter={handleSend}
      />
      <Button type="primary" onClick={handleSend}>
        Gửi
      </Button>
    </div>
  );
};

export default MessageInput;
