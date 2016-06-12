
exports.init = function (global) {
     global.messages.consume('data_load', 'data_load-sqlserver', {autoDelete: true, noAck: false}, function (message) {
          console.log('data_load: ' + JSON.stringify(message));
          //global.messages.queue_publish(global.nodeQueueId, 'testing');

          if (message.body.data.pass == '1234') {
               var data = {};
               data.queue = 'show_message';
               data.socketId = message.returnAddress.socketId;
               data.browser_response = {'message': 'not implemented!!'};
               global.messages.queue_publish(message.returnAddress.nodeQueueId, data);
          }
     });

     global.messages.consume('data_save', 'data_save-sqlserver', {autoDelete: true, noAck: false}, function (message) {
          console.log('data_load: ' + JSON.stringify(message));
          //global.messages.queue_publish(global.nodeQueueId, 'testing');

          if (message.body.data.pass == '1234') {
               var data = {};
               data.queue = 'show_message';
               data.socketId = message.returnAddress.socketId;
               data.browser_response = {'message': 'not implemented!!'};
               global.messages.queue_publish(message.returnAddress.nodeQueueId, data);
          }
     });
}