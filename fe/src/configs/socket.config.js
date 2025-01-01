import { io } from 'socket.io-client';
const env = process.env.NODE_ENV;
const baseURL =
  !env || env === 'development'
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL;
console.log('baseURL', baseURL);
const socketConfig = io(baseURL, {
  transports: ['websocket'],
});

socketConfig.on('connect', () => {
  console.log('Connected to server with ID:', socketConfig.id);
});

socketConfig.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});

socketConfig.on('connect_timeout', () => {
  console.error('Connection timed out');
});

export default socketConfig;
