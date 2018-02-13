import io from 'socket.io-client';
let socket;

export default {
  init() {
    socket = io('https://www.conversatie.online/', { transports: ['websocket'] });
  },
  handleEvents(handlers) {
    Object.keys(handlers).forEach(eventName => {
      socket.on(eventName, msg => {
        console.log(`[${eventName}]: ${msg}`);
        handlers[eventName](JSON.parse(msg));
      });
    })
  },
  checkIn(userId, userName, userRoom) {
    socket.emit('check in', JSON.stringify({ userId, userName, userRoom }));
  },
  sendMessage(message) {
    socket.emit('chat message', message);
  }
}
