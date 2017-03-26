
if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
     }).catch(function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
     });
}

var socket = io();

socket.on('account_loggedin', function(msg) {

});

socket.on('show_message', function(msg) {
     alert(JSON.stringify(msg));
});

socket.on('console', function (msg) {
     //console.log(msg);
     $('#console_log').append('<pre>' + syntaxHighlight(msg) + "</pre><br />");
     window.scrollTo(0,document.body.scrollHeight);
});

function syntaxHighlight(json) {
     if (typeof json != 'string') {
          json = JSON.stringify(json, undefined, 2);
     }
     json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
     return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
          var cls = 'number';
          if (/^"/.test(match)) {
               if (/:$/.test(match)) {
                    cls = 'key';
               } else {
                    cls = 'string';
               }
          } else if (/true|false/.test(match)) {
               cls = 'boolean';
          } else if (/null/.test(match)) {
               cls = 'null';
          }
          return '<span class="' + cls + '">' + match + '</span>';
     });
}


var WeavverApp = angular.module('WeavverApp', ['ui.router', 'ngAnimate', 'ui.bootstrap'])
     .config(['$stateProvider', '$urlRouterProvider', routes]);
//.config(['$routeProvider', '$locationProvider', Routes]);


WeavverApp.filter('unsafe', function($sce) {
     return function(val) {
          return $sce.trustAsHtml(val);
     };
});


