// server.js
const http = require('http');
const WebSocket = require('ws');
const express = require('express');
const SocketServer = require('ws').Server
const uuidV4 = require('uuid/v4');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  //User connected counter
  wss.broadcast(JSON.stringify({
    type: 'userCount',
    content: wss.clients.size
  }));

  ws.on('message', function incoming(message) {
    const receivedMsg = JSON.parse(message);

    // how to send the message back
    // broadcast to app as message
    if(receivedMsg.type === "postMessage") {
      receivedMsg.id = uuidV4();
      receivedMsg.type = "incomingMessage";
      console.log("Post Message Log:", receivedMsg);
    }

    //broadcast to app as Notification
    else if(receivedMsg.type === "postNotification") {
      receivedMsg.id = uuidV4();
      receivedMsg.type = "incomingNotification";
      console.log("Post Notication Log:", receivedMsg);
    }

    //broadcast message
    outgoingMsg = receivedMsg;
    wss.broadcast(JSON.stringify(outgoingMsg));

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');

    //broadcast user counter
    wss.broadcast(JSON.stringify({
      type: 'userCount',
      content: wss.clients.size
    }));

  });
});
