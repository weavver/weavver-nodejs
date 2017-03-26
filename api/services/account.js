
exports.init = function (weavver) {
     var options_login = {autoDelete: true, noAck: false};
     weavver.messages.consume('account_login', 'account_login-checkcredentials', options_login, function (message) {
          console.log('account_login: ' + JSON.stringify(message));
          //global.messages.queue_publish(global.nodeQueueId, 'testing');

          if (message.body.data.pass == '1234') {
               var data = {};
               data.queue = 'account_loggedin';
               data.socketId = message.returnAddress.socketId;
               data.browser_response = {'message': 'success!!'};
               global.messages.queue_publish(message.returnAddress.nodeQueueId, data);
          }
          else {
               var data = {};
               data.queue = 'account_loggedin';
               data.socketId = message.returnAddress.socketId;
               data.browser_response = {'message': 'success!!'};
               global.messages.queue_publish(message.returnAddress.nodeQueueId, data);
          }
     });


     var options_register = {autoDelete: true, noAck: false};
     weavver.messages.consume('account_register', 'account_register-sqlserver', options_register, function (message) {
          console.log('account_login: ' + JSON.stringify(message));
          //global.messages.queue_publish(global.nodeQueueId, 'testing');

          if (message.body.data.pass == '1234') {
               //var data = {};
               //data.queue = 'show_message';
               //data.socketId = message.returnAddress.socketId;
               //data.browser_response = {'message': 'failed!!'};
               //global.messages.queue_publish(message.returnAddress.nodeQueueId, data);

               var data = {};
               data.queue = 'account_loggedin';
               data.socketId = message.returnAddress.socketId;
               data.browser_response = {'message': 'success!!'};
               global.messages.queue_publish(message.returnAddress.nodeQueueId, data);
          }
          else {
               var data = {};
               data.queue = 'account_register_success';
               data.socketId = message.returnAddress.socketId;
               //data.browser_response = {'message': 'pong'};
               global.messages.queue_publish(message.returnAddress.nodeQueueId, data);
          }
     });
}