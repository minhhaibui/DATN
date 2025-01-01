const ChatsModal = require("../models/chatBox.model");
const { getIo } = require("../configs/socketConfig");

// Thêm tin nhắn vào chatRoom hoặc tạo mới
exports.addMessage = async (req, res) => {
  const { userId, sender, message } = req.body;

  try {
    let chatRoom = await ChatRoom.findOne({ userId });

    if (chatRoom) {
      chatRoom.messages.push({ sender, message });
      await chatRoom.save();
    } else {
      chatRoom = new ChatRoom({
        userId,
        messages: [{ sender, message }],
      });
      await chatRoom.save();
    }

    // Gửi message qua socket.io
    const io = getIo();
    io.to(userId.toString()).emit("receiveMessage", { sender, message });

    res.status(200).json(chatRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.history=async (req, res)=>{

  const { userId } = req.body;
  try {
    const messages = await ChatsModal.find({ userId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
}

// Lấy danh sách chatRooms
exports.getChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatsModal.find().populate("userId", "fullName");
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
