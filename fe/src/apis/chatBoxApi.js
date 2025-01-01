import axiosClient from './axiosClient';

const CHAT_API_ENDPOINT = '/chats';

const chatApi = {
  // API: lấy danh sách phòng chat
  getChatRooms: () => {
    const url = CHAT_API_ENDPOINT + '/chat-rooms';
    return axiosClient.get(url);
  },
};

export default chatApi;
