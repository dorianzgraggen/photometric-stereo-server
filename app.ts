import {
  WebSocketClient,
  WebSocketServer,
} from 'https://deno.land/x/websocket@v0.1.3/mod.ts';
import { readLines } from 'https://deno.land/std@0.116.0/io/mod.ts';
import * as path from 'https://deno.land/std@0.116.0/path/mod.ts';
import * as cli from './lib/cli.ts';
import { readKeypress } from 'https://deno.land/x/keypress@0.0.7/mod.ts';

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
          // loop();
          console.log('haha');
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
    console.log('hehehehe');

    setTimeout(() => {
      console.log('shine bright like a diamond');
    }, 1000);
  },
};

let acceptingCommands = false;
let currentCommand = '';
for await (const keypress of readKeypress()) {
  // console.log(keypress);

  if (acceptingCommands) {
    if (keypress.key === 'return') {
      acceptingCommands = false;

      if (typeof commands[currentCommand] === 'undefined') {
        console.log(`Command /${currentCommand} does not exist.`);
      } else {
        console.log(`Running /${currentCommand}.`);
        commands[currentCommand]();
      }
    } else {
      currentCommand += keypress.sequence;
      await Deno.stdout.write(new TextEncoder().encode(`/${currentCommand}\r`));
    }
  }

  if (keypress.key === '/') {
    if (devices.length !== expectedDevices) {
      console.log(
        `Expected amount of devices (${expectedDevices}) does not match amoint of connected devices (${devices.length}).`
      );
    } else {
      console.log('Enter a command:');
      await Deno.stdout.write(new TextEncoder().encode(`/\r`));
      acceptingCommands = true;
      currentCommand = '';
    }
  }

  if (keypress.ctrlKey && keypress.key === 'c') {
    Deno.exit(0);
  }
}
