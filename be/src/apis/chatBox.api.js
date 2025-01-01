const chatBoxApi = require('express').Router();
const chatBoxController = require('../controllers/chatBox.controller');

chatBoxApi.post("/message", chatBoxController.addMessage); // Thêm tin nhắn
chatBoxApi.get("/history", chatBoxController.addMessage); // Thêm tin nhắn
chatBoxApi.get("/chat-rooms", chatBoxController.getChatRooms); // Lấy danh sách chatRooms


module.exports = chatBoxApi;
