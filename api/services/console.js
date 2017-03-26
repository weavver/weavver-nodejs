
exports.init = function (global) {

     global.messages.consume('console_subscribe', 'subscribe', {autoDelete: true, noAck: false}, function (message) {
          console.log('got: ' + message);

          if (message.body.data.action == "subscribe") {

               console.log(message.returnAddress.nodeQueueId);

               global.messages.conn.createChannel(function (err, ch) {
                    ch.assertExchange('console_log', 'fanout', {durable: true}, function () {
                         ch.bindQueue(message.returnAddress.nodeQueueId, 'console_log');
                    });
               });
          }

          //var data = {};
          //data.queue = 'show_message';
          //data.socketId = message.returnAddress.socketId;
          //data.browser_response = {'message': 'pong'};
          //global.messages.queue_publish(message.returnAddress.nodeQueueId, data);
     });
}