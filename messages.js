

exports.init = function (global, callback) {
     function bail(err) {
          console.error(err);
          process.exit(1);
     }

     global.log('// connecting to amqp service: %s', global.amqp_url)
     require('amqplib/callback_api')
          .connect(global.amqp_url, function(err, conn) {
               if (err != null) bail(err);

               conn.createChannel(function (err, ch) {
                    exports.consume = function (exchange, queue, options, callback) {
                         if (exchange) {
                              ch.assertExchange(exchange, 'fanout', {durable: true}, function () {
                                   ch.assertQueue(queue, options);
                                   ch.bindQueue(queue, exchange);
                                   ch.consume(queue, function (msg) {
                                        if (msg !== null) {
                                             var messageString = msg.content.toString();
                                             console.log(messageString);
                                             callback(JSON.parse(messageString));
                                             ch.ack(msg);
                                        }
                                   });
                              });
                         }
                         else {
                              ch.assertQueue(queue, options);
                              ch.consume(queue, function (msg) {
                                   if (msg !== null) {
                                        var messageString = msg.content.toString();
                                        console.log(messageString);
                                        callback(JSON.parse(messageString));
                                        ch.ack(msg);
                                   }
                              });
                         }
                    };

                    exports.exchange_publish = function (exchange, message) {
                         console.log('publishing to exchange \'' + exchange + '\': ' + JSON.stringify(message));
                         ch.publish(exchange, '', new Buffer(JSON.stringify(message)), function () {
                              console.log('called back');
                         });
                    };

                    var reply_events = {};

                    exports.queue_publish = function (queue, message) {
                         queue_publish(queue, message, null);
                    };

                    exports.queue_publish = function (queue, message, callback) {
                         console.log('publishing to queue ' + queue + ': ' + message);
                         ch.publish('', queue, new Buffer(JSON.stringify(message)), function (err) {
                              console.log(err);
                         });
                    };

                    console.log('// connected to rabbitmq'.green);
                    callback();
               });

               exports.conn = conn;
          });
}