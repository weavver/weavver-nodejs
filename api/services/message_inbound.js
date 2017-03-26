
exports.init = function (global) {
     global.messages.consume('weavver_inbound', 'inbound',  { autoDelete: false, noAck: false }, function (message) {
          global.log('weavver_inbound received: ' + JSON.stringify(message));
          //global.messages.queue_publish(global.nodeQueueId, 'testing');



          global.messages.exchange_publish(message.body.command, message);



          //var data = {};
          //data.queue = 'show_message';
          //data.socketId = message.returnAddress.socketId;
          //data.browser_response = { 'a': 'b'};
          //global.messages.queue_publish(message.returnAddress.nodeQueueId, data);
     });
};
