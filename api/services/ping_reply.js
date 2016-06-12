
exports.init = function (global) {
     global.messages.consume('ping', 'ping_reply', {autoDelete: true, noAck: false}, function (message) {
          console.log('got: ' + message);

          var data = {};
          data.queue = 'show_message';
          data.socketId = message.returnAddress.socketId;
          data.browser_response = {'message': 'pong'};
          global.messages.queue_publish(message.returnAddress.nodeQueueId, data);
     });

     global.messages.consume('types', 'ping_reply', {autoDelete: true, noAck: false}, function (message) {
          console.log('got: ' + message);

          var data = {};
          data.queue = 'show_message';
          data.socketId = message.returnAddress.socketId;
          data.browser_response = {'message': 'type'};
          global.messages.queue_publish(message.returnAddress.nodeQueueId, data);
     });
}