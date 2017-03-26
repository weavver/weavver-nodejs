
exports.init = function (global) {
     var consume_options = {
          autoDelete: false,
          noAck: false
     };
     global.messages.consume('omnibox_command',
                             'processor', // name of this subscriber on the exchange
                             consume_options,
                             function (message) {
                                  console.log('/// got: ' + JSON.stringify(message));

                                  if (message.input == 'debug') {
                                       message.reply({redirectState: 'debug'});
                                  } else {
                                       console.log(JSON.stringify(data));
                                       global.messages.queue_publish(message.returnAddress.nodeQueueId, data, function (err, message) {
                                            global.log('this is the actual reply');
                                       });
                                  }
                              });


};
