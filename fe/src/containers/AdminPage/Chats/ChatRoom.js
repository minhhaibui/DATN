// src/components/admin/ChatRoom.js
import React, { useEffect, useRef, useState } from 'react';
import { Input, Button, List, Typography, Layout } from 'antd';
import socket from '../../../configs/socket.config'; // Kết nối Socket.IO
import { useParams } from 'react-router-dom';
import socketConfig from '../../../configs/socket.config';
import MessageList from '../../../components/Chats/ChatList';
import MessageInput from '../../../components/Chats/ChatInput';
import { Content, Footer, Header } from 'antd/es/layout/layout'; // Lấy params từ URL

const { Title } = Typography;

const ChatRoom = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false); // Trạng thái thông báo
  const messagesEndRef = useRef(null);
  const contentRef = useRef(null); // Tham chiếu đến khung nội dung tin nhắn

  // Cuộn xuống cuối danh sách
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Kiểm tra nếu người dùng đang ở cuối danh sách
  const isAtBottom = () => {
    if (!contentRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    return scrollHeight - scrollTop === clientHeight;
  };

  // Xử lý sự kiện cuộn
  const handleScroll = () => {
    if (isAtBottom()) {
      setHasUnreadMessages(false); // Ẩn thông báo nếu ở cuối danh sách
    }
  };

  // Lấy lịch sử tin nhắn
  useEffect(() => {
    socketConfig.emit('start_chat', { userId });

    socketConfig.on('chat_history', (history) => {
      setMessages(history);
      scrollToBottom(); // Cuộn xuống cuối khi load lịch sử
    });

    socketConfig.on('new_message', (message) => {
      setMessages((prev) => [...prev, message]);

      if (!isAtBottom()) {
        setHasUnreadMessages(true); // Hiển thị thông báo nếu không ở cuối danh sách
      } else {
        scrollToBottom(); // Cuộn xuống nếu đang ở cuối danh sách
      }
    });

    return () => {
      socketConfig.off('chat_history');
      socketConfig.off('new_message');
    };
  }, [userId]);

  // Gửi tin nhắn
  const sendMessage = (content) => {
    const message = {
      userId,
      sender: 'admin',
      message: content,
    };
    socketConfig.emit('send_message', message);
  };

  return (
    <Layout>
      <Header>
        <Title style={{ color: 'white', margin: 0 }}>Chat với Admin</Title>
      </Header>
      <Content
        style={{ padding: '20px', overflowY: 'auto', position: 'relative' }}
        ref={contentRef}
        onScroll={handleScroll} // Lắng nghe sự kiện cuộn
      >
        <MessageList messages={messages} userId={userId} />
        <div ref={messagesEndRef} />
        {hasUnreadMessages && (
          <Button
            type="primary"
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              zIndex: 1000,
            }}
            onClick={scrollToBottom}>
            Xem tin nhắn mới
          </Button>
        )}
      </Content>
      <Footer>
        <MessageInput onSend={sendMessage} />
      </Footer>
    </Layout>
  );
};

export default ChatRoom;
