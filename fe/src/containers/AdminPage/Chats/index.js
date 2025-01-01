// import React, { useEffect, useState } from 'react';
// import chatApi from '../../../apis/chatBoxApi'; // Import API bạn đã tạo
// import { Layout, Menu, Typography } from 'antd';
// import ChatRoom from './ChatRoom'; // Component để hiển thị đoạn chat
//
// const { Sider, Content } = Layout;
// const { Title } = Typography;
//
// const ChatRoomList = () => {
//   const [chatRooms, setChatRooms] = useState([]); // Danh sách các phòng chat
//   const [selectedUser, setSelectedUser] = useState(null); // User được chọn
//   console.log('selectedUser', selectedUser);
//   // Lấy danh sách các phòng chat từ API
//   useEffect(() => {
//     const fetchChatRooms = async () => {
//       try {
//         const response = await chatApi.getChatRooms(); // Gọi API
//         setChatRooms(response.data); // Lưu danh sách phòng chat
//         if (response.data.length > 0) {
//           setSelectedUser(response.data[0].userId); // Set user đầu tiên làm mặc định
//         }
//       } catch (error) {
//         console.error('Error fetching chat rooms:', error);
//       }
//     };
//
//     fetchChatRooms().then();
//   }, []);
//
//   // Xử lý khi click vào user trong Navbar
//   const handleUserClick = (userId) => {
//     setSelectedUser(userId);
//   };
//
//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       {/* Sidebar chứa danh sách user */}
//       <Sider width={200} style={{ background: '#fff' }}>
//         <Menu
//           mode="inline"
//           selectedKeys={[selectedUser?._id]}
//           style={{ height: '100%', borderRight: 0 }}>
//           {chatRooms.map((room) => (
//             <Menu.Item
//               key={room.userId?._id}
//               onClick={() => handleUserClick(room.userId)}>
//               {room.userId?.fullName || 'Unknown User'}{' '}
//               {/* Hiển thị tên user */}
//             </Menu.Item>
//           ))}
//         </Menu>
//       </Sider>
//
//       {/* Content hiển thị đoạn chat */}
//       <Layout style={{ padding: '24px' }}>
//         <Content
//           style={{
//             background: '#fff',
//             padding: 24,
//             margin: 0,
//             minHeight: 280,
//           }}>
//           {selectedUser ? (
//             <ChatRoom userId={selectedUser?._id} />
//           ) : (
//             <Title level={4}>Không có tin nhắn nào</Title>
//           )}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };
//
// export default ChatRoomList;
