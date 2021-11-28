import {
  WebSocketClient,
  WebSocketServer,
} from 'https://deno.land/x/websocket@v0.1.3/mod.ts';

console.log('ok');
const wss = new WebSocketServer(8080);
wss.on('connection', function (ws: WebSocketClient) {
  console.log('connected');
  ws.on('message', function (message: string) {
    console.log(message);
    ws.send('lol ' + message);
  });
});
