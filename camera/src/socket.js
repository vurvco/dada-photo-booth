import io from 'socket.io-client';

const serverUrl = 'http://localhost:3000';

const socketOptions = {
  transports: ['websocket'],
  'force new connection': true
};

const socket = io(serverUrl, socketOptions);

const client = socket.connect(serverUrl, socketOptions);

module.exports = client;
