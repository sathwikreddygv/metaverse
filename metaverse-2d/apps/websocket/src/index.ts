// import { WebSocketServer } from 'ws';
const WebSocket = require('ws');
import { User } from './user';

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', function connection(ws:any) {
  console.log("user connected")
  let user = new User(ws);
  ws.on('error', console.error);

  ws.on('close', () => {
    user?.destroy();
  });
});