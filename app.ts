import {
  WebSocketClient,
  WebSocketServer,
} from 'https://deno.land/x/websocket@v0.1.3/mod.ts';
import { readLines } from 'https://deno.land/std@0.116.0/io/mod.ts';
import * as path from 'https://deno.land/std@0.116.0/path/mod.ts';
import * as cli from './lib/cli.ts';

let expectedDevices = 0;

const devices = [];

expectedDevices = Number(
  cli.ask('Expected number of devices:', cli.validations.isNumber)
);

console.log(expectedDevices);

const wss = new WebSocketServer(8080);
wss.on('connection', function (ws: WebSocketClient) {
  console.log('connected');
  ws.on('message', function (message: string) {
    console.log(message);

    const [messageType, messageContent] = message.split(',');

    switch (messageType) {
      case 'new device':
        devices.push(messageContent);
        console.log(
          `New device connected (${devices.length}/${expectedDevices})`
        );

        if (devices.length == expectedDevices) {
          loop();
        }
        break;

      default:
        break;
    }

    ws.send('lol ' + message);
  });
});

const commands: any = {
  start: () => {
    console.log('start');

    setTimeout(() => {
      console.log('shine bright like a diamond');
    }, 1000);

    setTimeout(() => {
      loop();
    }, 2000);
  },
};

function loop() {
  const command = cli.ask(
    'Command:',
    (response) => typeof commands[response as string] != 'undefined'
  );

  commands[command]();
}
