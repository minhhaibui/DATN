const socketIO = require('socket.io');
const ChatRoomModel=require('../models/chatBox.model');
const setupSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Xử lý khi user bắt đầu chat
    socket.on('start_chat', async ({ userId }) => {
      try {
        // Tham gia vào phòng chat của user
        socket.join(userId);
        console.log(`User ${userId} joined room ${userId}`);

        // Tìm hoặc tạo chat room dựa vào userId
        const chatRoom = await ChatRoomModel.findOneAndUpdate(
          { userId },
          { $setOnInsert: { userId, messages: [] } },
          { new: true, upsert: true, populate: 'userId' }
        );

        // Gửi lịch sử tin nhắn
        socket.emit('chat_history', chatRoom.messages);

      } catch (error) {
        console.error('Error in start_chat:', error);
      }
    });


    // Xử lý khi user gửi tin nhắn
    socket.on('send_message', async (message) => {
      const { userId, sender, message: content } = message;

      try {
        // Tìm hoặc tạo phòng chat dựa vào userId
        const chatRoom = await ChatRoomModel.findOneAndUpdate(
          { userId },
          {
            $push: {
              messages: {
                sender,
                message: content,
                timestamp: new Date(),
              },
            },
          },
          { new: true, upsert: true } // Tùy chọn: tạo mới nếu không tìm thấy và trả về tài liệu mới
        );

        // Tạo object tin nhắn để gửi tới client
        const newMessage = {
          sender,
          message: content,
          timestamp: new Date(),
        };

        // Gửi tin nhắn tới tất cả người trong phòng chat tương ứng
        io.to(userId).emit('new_message', newMessage);
      } catch (error) {
        console.error('Error in send_message:', error);
      }
    });


    // Xử lý khi client ngắt kết nối
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = setupSocket;
