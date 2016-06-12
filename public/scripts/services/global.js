
var reply_events = [];

WeavverApp.service('global', function ($rootScope, $state, $http) {

     var myFunctions = {
          setLoggedIn: function () {
               $rootScope.base_url = '';
               $rootScope.version = 'Alpha';
               $rootScope.description = 'Weavver&reg; is a framework for building an open and transparent internet company. <a href="#" style="color:white; text-decoration:underline;">Click here</a> to change this text.';
               $rootScope.username = 'mythicalbox';
               $rootScope.orgs = [
                    { name: 'Weavver'},
                    { name: 'Mitchel' }
               ]
               $rootScope.IsLoggedIn = true;
          },
          guid: function () {
               function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
               }
               return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
          },
          callbacks: function () {
               return reply_events;
          },
          signOut: function () {
               $rootScope.IsLoggedIn = false;
          },
          getTest: function () {
               return '123412341234asdf';
          },
          load_data: function (pageId, callback) {
               $http({
                    method: 'GET',
                    url: '/api/load_data'
               }).then(function successCallback(response) {
                         callback(response);
                    },
                    function errorCallback(response) {
                         alert(response);
                    });
          },
          publish: function (exchange, data, callback) {
               console.log('publishing message to exchange: ' + exchange);
               // send a message over socket.io

               var message = {
                    'command': exchange,
                    'data': data
               };
               if (callback) {
                    message.callbackId = myFunctions.guid();
                    reply_events[message.callbackId] = callback;
                    console.log('setting callback: ' + message.callbackId);
                    console.log(reply_events);
               }
               socket.emit('weavver_inbound', message);

               // or send it over http
               // $http.post('/publish', data).then(
//               function successCallback(response) {
////                    alert('success' + JSON.stringify(response));
//               },
//               function errorCallback(err) {
//                    alert('error' + err);
//               }
//          );
          }
     };

     socket.on('browser_response', function (msg) {
          console.log('received response');
          console.log(msg);
          var cb = myFunctions.callbacks()[msg.callbackId];
          if (cb) {
               cb(null, msg);
          } else {
               console.log('call back not found');
          }
     });

     return myFunctions;
});
