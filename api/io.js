
exports.init = function (global) {
     var io = require('socket.io')(global.http);

     global.clients = [];

     var socketId = null;
     io.on('connection', function (socket) {
          console.info('New client connected (id=' + socket.id + ').');
          socketId = socket.id;
          global.clients[socket.id] = socket;

          // incoming event
          socket.on('weavver_inbound', function (client_message) {
               console.log('socket.io got ' + JSON.stringify(client_message));
               var message = {
                    body: client_message,
                    received: new Date().getTime(),
                    returnAddress: {
                         nodeQueueId: global.nodeQueueId,
                         socketId: socket.id
                    }
               };
               global.messages.exchange_publish('weavver_inbound', message);
          });

          // get messages destined for the browser
          global.messages.consume(null, global.nodeQueueId, { autoDelete: true, noAck: false }, function (message) {
               console.log(global.nodeQueueId + ' queue got: ' + JSON.stringify(message));

               var client = global.clients[message.socketId];
               if (client)
                    client.emit(message.queue, message.browser_response);
               else
                    console.log('error to deal with');
          });

          socket.on('disconnect', function () {
               console.log('disconnected client');
          });
     });
};