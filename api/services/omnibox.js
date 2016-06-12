
exports.init = function (global) {
     global.messages.consume('omnibox_command', 'process', {autoDelete: true, noAck: false}, function (message) {
          console.log('got: ' + JSON.stringify(message));

          var data = {};
          data.queue = 'browser_response';
          data.socketId = message.returnAddress.socketId;
          data.browser_response = {'message': 'pong'};
          data.browser_response.redirectState = 'types/new';
          data.browser_response.callbackId = message.body.callbackId;
          //data.browser_response.

          console.log(data);
          global.messages.queue_publish(message.returnAddress.nodeQueueId, data, function (err, message) {
               global.log('this is the actual reply');
          });
     });
}
