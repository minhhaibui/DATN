const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
  },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const chatRoomSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  messages: [messageSchema],
},  { timestamps: true });

chatBoxModal = mongoose.model("chatRoom", chatRoomSchema,'chatRooms');
module.exports = chatBoxModal;
