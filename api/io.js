
exports.init = function (weavver) {
     var io = require('socket.io')(weavver.http_service);

     weavver.clients = [];

     var socketId = null;
     io.on('connection', function (socket) {
          weavver.log('--> new io.js client connected (guid=' + weavver.nodeQueueId + '-' + socket.id + ').'.green);
          socketId = socket.id;
          weavver.clients[socket.id] = socket;

          weavver.log('--> subscribing to incoming messages from express client'.green);
          socket.on('message', function (client_message) {
               weavver.log('socket.io got ' + JSON.stringify(client_message));
               var message = {
                    body: client_message,
                    received: new Date().getTime(),
                    returnAddress: {
                         nodeQueueId: weavver.nodeQueueId,
                         socketId: socket.id
                    }
               };
               weavver.messages.exchange_publish('message_inbound', message);
          });

          // get messages destined for the browser
          weavver.messages.consume(null, weavver.nodeQueueId, { autoDelete: true, noAck: false }, function (message) {
               var client = weavver.clients[message.socketId];
               if (client) {
                    client.emit(message.queue, message.browser_response);
                    weavver.log(weavver.nodeQueueId + ' queue got: ' + JSON.stringify(message));
               }
               else {
                    io.sockets.emit('console', message);
                    //weavver.log('error to deal with');
               }
          });

          socket.on('disconnect', function () {
               weavver.log('disconnected client');
          });
     });
};