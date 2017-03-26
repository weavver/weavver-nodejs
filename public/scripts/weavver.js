
function routes($stateProvider, $urlRouterProvider) {
     //$locationProvider.html5Mode(true).hashPrefix(!);
     $urlRouterProvider.otherwise('/home');

     $stateProvider
          .state('home', {
               url: '/home',
               controller: 'auth',
               views: {
                    'accountmenu': {templateUrl: 'views/blank.html'},
                    'content': {templateUrl: 'views/home.html', controller: 'auth'},
                    'home_account@home': {templateUrl: 'views/account_register.html', controller: 'auth'}
               }
          })
          .state('register', {
               url: '/account/register',
               views: {
                    'accountmenu': {templateUrl: 'views/blank.html'},
                    'content': {templateUrl: 'views/home.html', controller: 'auth' },
                    'home_account@register': {templateUrl: 'views/account_register.html', controller: 'auth'}
               },
               controller: 'auth'
          })
          .state('login', {
               url: '/account/login',
               views: {
                    'accountmenu': {templateUrl: 'views/blank.html'},
                    'content': {templateUrl: 'views/home.html' },
                    'home_account@login': {templateUrl: 'views/account_login.html', controller: 'auth'}
               },
               controller: 'auth'
          })
          .state('console', {
               url:'/console',
               templateUrl: 'views/console.html',
               views: {
                    'content': {
                         templateUrl: 'views/console.html',
                         controller: 'console_controller'
                    }
               },
               controller: 'console_controller'
          })
          .state('cms_page', {
               url:'/cms_page/:pageid',
               templateUrl: 'views/cms_page.html',
               views: {
                    'content': {templateUrl: 'views/cms_page.html' }
               },
               controller: 'CmsPage'
          })
          .state('account', {
               url:'/account',
               views: {
                    'accountmenu': {templateUrl: 'views/accountmenu_loggedin.html', controller: 'auth'},
                    'content': {templateUrl: 'views/account.html', controller: 'auth'},
               },
               controller: 'auth'
          })
          .state('node', {
               url:'/node/:id',
               templateUrl: 'views/node.html',
               views: {
                    'content': {templateUrl: 'views/node.html', controller: 'node' }
               }
          })
          .state(':type/new', {
               url:'/:type/new',
               templateUrl: 'views/schema.html',
               views: {
                    'content': {templateUrl: 'views/schema.html', controller: 'schema' }
               }
          })
          .state(':type/list', {
               url:'/:type/list',
               templateUrl: 'views/list.html',
               views: {
                    'content': {templateUrl: 'views/list.html', controller: 'schema' }
               }
          })
          .state(':type/edit/:id', {
               url:'/:type/edit/:id',
               templateUrl: 'views/schema.html',
               views: {
                    'content': {templateUrl: 'views/schema.html', controller: 'schema' }
               }
          })
          .state('debug', {
               url:'/debug',
               templateUrl: 'views/debug.html',
               views: {
                    'content': {templateUrl: 'views/debug.html', controller: 'debug' }
               }
          })
          //.state('add', {
          //     url:'/add/:id',
          //     templateUrl: 'views/node.html',
          //     views: {
          //          'content': {templateUrl: 'views/node.html', controller: 'node' }
          //     }
          //})
          .state('list', {
               url: '/list',
               templateUrl: 'views/list.html',
               views: {
                    'content': { templateUrl: 'views/list.html', controller: 'List' }
               }
          });
}
;
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


;
WeavverApp.controller('auth', function (global, $stateParams, $state, $scope, $http, $interval) {

     $scope.registered = false;
     $scope.$state = $state;
     $scope.global = global;

     $scope.orgs = [
          {
               vanity_url: 'weavver',
               'name': 'Weavver'
          },
          {
               vanity_url: 'mjc',
               'name': 'Mitchel Constantin'
          }
     ];

     $scope.data = {};
     $scope.data.user = 'guestuser';
     $scope.data.pass = '1234';

     //global.setLoggedIn();
     $scope.global = global;
     //global.setLoggedOut();

     socket.on('account_loggedin', function (msg) {
          $state.go('account');
          //global.setLoggedIn();
     });

     $scope.submit = function () {
          //global.publish('ping', { data: 'hello world' });
          global.call('account_login', $scope.data);
     };
     //$interval($scope.updateSolar, 500);
     //$scope.updateSolar();

     $scope.register = function () {
          alert('test');
          $scope.registered = true;
     };

     $scope.login = function () {
          global.call('account_login', $scope.data);
          //alert('test');
          //global.setLoggedIn();
     };

     $scope.signout = function () {
          $state.go('^account.login');
          global.signOut();
     };
});;
WeavverApp.controller('CmsPage', function (global, $stateParams, $scope, $http, $interval) {
     $scope.details = 'Loading..';

     global.load_data($stateParams.pageid, function (data) {
          $scope.details = data.data.details;
     });
});
;
WeavverApp.controller('console_controller', function (global, $stateParams, $state, $scope, $http, $interval) {
     //$scope.$state = $state;
     //$scope.id = $stateParams.id;
     //$scope.url = $stateParams.url;
     //console.log($stateParams.url);
     //$scope.browser_response = 'asdfasdf';

     global.call('console_subscribe', { action: 'subscribe' },
          function (err, reply) {
               $scope.$apply(function () {
                    $scope.schema = reply.schema;
                    $scope.results = reply.results;
               });
          });
});;
WeavverApp.controller('HomeController', function (global, $scope, $state, $http, $interval) {

});
;//
//
//var WeavverApp = angular.module('WeavverApp', ['ui.router', 'ngAnimate', 'ui.bootstrap'])
//     .config(['$stateProvider', '$urlRouterProvider', routes]);
////.config(['$routeProvider', '$locationProvider', Routes]);
//
//
//WeavverApp.filter('unsafe', function($sce) {
//     return function(val) {
//          return $sce.trustAsHtml(val);
//     };
//});
//
//
//
;
WeavverApp.controller('List', function (global, $stateParams, $scope, $http, $interval) {
     
     $scope.init = function () {
          $http({
               method: 'GET',
               url: '/api/load_data?parent=' + $stateParams.id
          }).then(function successCallback(response) {
                    $scope.data = response.data;
               },
               function errorCallback(response) {
                    alert(response);
               })
     };

     $scope.init();

     $scope.edit = function () {
          alert('start edit mode');
     };

     //global.load_data($stateParams.pageid, function (data) {
     //     $scope.list = data.data.list;
     //});

});
;var expandedMode = true;
var hoverBackCover = "";
var normalBackCover = "";
var offsetX = 0;
var offsetY = 0;


function getPseudoGuid() {
     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
     });
}

$(document).ready(function () {
     jQuery.expr[':'].focus = function (elem) {
          return elem === document.activeElement && (elem.type || elem.href);
     };

     $.ctrl = function (key, callback, args) {
          $(document).keydown(function (e) {
               if (!args) args = []; // IE barks when args is null
               if (e.keyCode == key.charCodeAt(0) && e.ctrlKey) {
                    callback.apply(this, args);
                    return false;
               }
          });
     };

     //initialization
     $('.menu').menu({
          focus: function (event, ui) {
               var menu = $(this);
               var timeout = menu.data('timer');
               if (timeout) {
                    clearTimeout(timeout);
                    menu.data('timer', null);
               }
          },
          blur: function (event, ui) {
               var menu = $(this);
               timer = setTimeout(function () {
                    menu.menu().hide();
                    menu.data('state', 'hidden');
                    menu.data('timer', null);
               }, 300);
               menu.data('timer', timer);
          }
     }).removeClass('ui-corner-all').hide();

     $('.menuLink').hover
     (
          function () {
               $(this).css("background-Color", "#FFFFFF");
               $(this).css("color", "black");
               //$('.addMenu', $(this)).css('visibility', '');
          },
          function () {
               $(this).css("background-Color", "");
               $(this).css("color", "white");
               //                    if (expandedMode == false) {
               //                         $('.addMenu', $(this)).css('visibility', 'hidden');
               //                    }
          }
     );

     $('.menuLink').bind({
          click: function () {
               var menu = $(this).next('.menu');

               var state = menu.data('state');
               if (state == "shown") {
                    $(this).css('background-color', 'white');
                    menu.menu().hide();
                    menu.data('state', 'hidden');
               }
               else {
                    var left = $(this).offset().left;
                    menu.menu().css('left', left);
                    var top = $('#topbar').offset().top + $('#topbar').height();
                    menu.menu().css('top', top);
                    menu.menu().show();
                    menu.data('state', 'shown');
                    $(this).css('background-color', '');
               }
          }
     });

     //                         menu.css('position', 'absolute');
     //                         menu.slideDown("fast");

     $(document).keyup(function (e) {
          //alert(e.keyCode);

          if (e.keyCode == 27) // escape // clear any fields from focus
          {
               $("input").blur();
          }

          if (e.keyCode == 77) { // m Key
               if (!$("input").is(":focus")) {
                    toggleMenu();
                    e.stopPropagation();
               }
          }
     });

     //          $.ctrl('M', function (event) {
     //               //alert('box has focus');
     //               if (!$("input").is(":focus")) {
     //                    toggleMenu();
     //                    event.stopPropagation();
     //               }
     //          });

     //createPopup('fff', 300, 300, 'asdf');
});

function preventIFrameMouseEvents() {
     $('iframe').css('pointer-events', 'none');
}

function allowIFrameMouseEvents() {
     $('iframe').css('pointer-events', 'auto');
}

function closeIFrame(windowId, parentId) {
     refreshParent(parentId);
     $('#' + windowId).remove();
}

function refreshParent(parentId) {
     var obj = $('iframe', '#' + parentId);
     obj.attr('src', obj.attr('src'));

     //$(obj)[0].contentWindow.document.forms[0].submit()
     //$('input[type=submit]').click();
     //$(obj)[0].WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions("ctl00$Content$DList$searchButton", "", true, "", "", false, false));
}

function createPopup(url, width, height, myId) {

     isDialogLoaded = true;
     if (width == 0) {
          width = $(document).width() - 10;
          if (width > 800)
               width = 800;
     }
     if (height == 0)
          height = 500;

     //$('#ContentTable').remove();

     var windowId = getPseudoGuid();

     frameDialogs.push(windowId);

     var newPopup = $('#TheIFrame').clone();
     newPopup.attr("id", windowId);
     newPopup.attr("style", newPopup.attr("style") + "; ");
     newPopup.attr("isdialog", 'yes');

     // navigate to the frame
     if (url.match(/\?/))
          url = url + '&IFrame=true&WindowId=' + windowId;
     else
          url = url + '?IFrame=true&WindowId=' + windowId;
     if (myId)
          url = url + '&ParentId=' + myId;

     $('iframe', newPopup).attr('src', url);

     newPopup.dialog({
               open: function (event, ui) {
                    //$(this).parent().find('.ui-dialog-titlebar').append($('#ItemTitle'));
                    $(".ui-dialog-content").css("padding", 0);
                    $(this).css('overflow', 'hidden');
                    isDialogLoaded = true;
               },
               close: function (event, ui) {
                    frameDialogs.pop(myId);
               },
               title: "Loading..",
               dragStart: preventIFrameMouseEvents,
               dragStop: allowIFrameMouseEvents,
               resizeStart: preventIFrameMouseEvents,
               resizeStop: allowIFrameMouseEvents,
               position: [offsetX + 5, offsetY + 120],
               width: width,
               height: height
          })    //.attr('id', 'dialogId').attr('name', 'dialogId');
          .dialogExtend({
               "closable": true,
               "maximizable": true,
               "minimizable": true,
               "collapsable": true,
               "dblclick": "collapse",
               "minimizeLocation": "right",
               "icons": {
                    "close": "ui-icon-circle-close",
                    "maximize": "ui-icon-circle-plus",
                    "minimize": "ui-icon-circle-minus",
                    "collapse": "ui-icon-triangle-1-s",
                    "restore": "ui-icon-bullet"
               }
          });
     //newPopup.draggable("option", "containment", [50, 50, 300, 300]);


     newPopup.resize(function () {
          clearTimeout(doit);
          doit = setTimeout(resizedw, 100);
     });

//          $('div', 'iframe').ready(function () {
//               $(this).dialog('option', 'title', $(this).attr('title'));
//          });

     //$('#ContentDIV').append(newPopup);

     offsetX = (offsetX > 100) ? 0 : offsetX + 20;
     offsetY = (offsetY > 100) ? 0 : offsetY + 20;

}
var frameDialogs = [];

WeavverApp.controller('debug', function (global, $state, $stateParams, $scope, $http, $interval) {
     $scope.data = { 'status': 'loading..' };

     $scope.init = function () {
          options.method = 'GET';
          options.url = '/api/debug';

          $http(options).then(function successCallback(response) {
                    $scope.data = response.data;
               },
               function errorCallback(response) {
                    alert(response);
               }
          );
     };
});

WeavverApp.controller('node', function (global, $state, $stateParams, $scope, $http, $interval) {

     $scope.$state = $state;
     $scope.id = $stateParams.id;
     $scope.url = $stateParams.url;

     console.log($stateParams.url);

     $scope.init = function () {
          var options = {};
          options.method = 'GET';
          if ($stateParams.id)
               options.url = '/api/node?id=' + $stateParams.id;
          else if ($stateParams.url)
               options.url = '/api/node?url=' + $stateParams.url;

          if ($stateParams.id == 'weavver')
               $scope.type = 'org';

          if ($stateParams.id == 'weavver')
               $scope.type = 'org';

          $http(options).then(function successCallback(response) {
                    $scope.menu = response.data.menu;
                    $scope.menu = response.data.menu;
                    console.log($scope.menu);
               },
               function errorCallback(response) {
                    alert(response);
               }
          );

          $http({ method: 'GET', url: '/api/load_menu?id=' + $stateParams.id }).then(function successCallback(response) {
                    $scope.menu = response.data;
                    console.log($scope.menu);
               },
               function errorCallback(response) {
                    alert(response);
               });

          $http({ method: 'GET', url: '/api/schema' }).then(function successCallback(response) {
                    $scope.schema = response.data;
               },
               function errorCallback(response) {
                    alert(response);
               });
     };

     $scope.init();
});
;
WeavverApp.controller('omnibox', function (global, $scope, $state, $http, $interval) {

     $scope.submit = function () {
          //global.publish('ping', { data: 'hello world' });
          global.call('omnibox_command', $scope.command_text, function (err, reply) {
               console.log('got my response!!' + JSON.stringify(reply));

               $state.go(reply.redirectState);
          });

          //$http({
          //     method: 'GET',
          //     url: '/api/omnibox?text=' + $scope.command_text
          //}).then(function successCallback(response) {
          //          $scope.data = response.data;
          //
          //          alert($scope.data);
          //     },
          //     function errorCallback(response) {
          //          alert(response);
          //     })
     };


     $scope.init = function () {

     };
});

$('#myTabs a').click(function (e) {
     e.preventDefault()
     $(this).tab('show')
});

$('#myTabs a:last').tab('show');


WeavverApp.directive('schemaobject', function() {
     return {
          restrict: 'E',
          template: '<div class="datepicker-wrapper input-append">' + '<input type="text" class="datepicker" ng-model="bar" />' + '<span class="add-on"><i class="icon-calendar"></i></span>' + '</div>',
          scope: {
               bar: '=ngModel'
          },
          require: 'ngModel',
          replace: true
     };
});
//
//http://nathanleclaire.com/blog/2014/01/31/banging-your-head-against-an-angularjs-issue-try-this/

WeavverApp.controller('schema', function (global, $state, $stateParams, $scope, $http, $interval) {
     //$scope.$state = $state;
     //$scope.id = $stateParams.id;
     //$scope.url = $stateParams.url;
     //console.log($stateParams.url);
     //$scope.browser_response = 'asdfasdf';

     $scope.item = { 'a': 'b'};
     $scope.data = { fields: [] };

     $scope.schema = {
          "fields": [
               {
                    "key": "_id",
                    "name": "Id",
                    "description": "The data id"
               },
               {
                    "key": "type",
                    "name": "Type",
                    "description": "The type of data"
               },
               {
                    "key": "key",
                    "name": "Key",
                    "description": "The database key for this type"
               },
               {
                    "key": "name",
                    "name": "Name",
                    "description": "The name of the schema type"
               },
               {
                    "key": "description",
                    "name": "Description",
                    "description": "The description of the schema"
               }
          ],
          "key": "schema",
          "name": "Schema",
          "description": "A data model"
     };

     $scope.init = function ($scope) {
          //if ($stateParams.id) {
          //     var typeListQuery = {type: 'schema' };
          //     global.publish('schema_load', typeListQuery, function (err, reply) {
          //          $scope.$apply(function () {
          //               console.log(reply.results);
          //               console.log('te d3st');
          //               $scope.typelist = reply.results;
          //          });
          //     });
          //
          //     var query = { type: $stateParams.type, id: $stateParams.id };
          //     global.publish('schema_item_load', query, function (err, reply) {
          //          $scope.$apply(function () {
          //               console.log($scope);
          //               $scope.schema = reply.schema;
          //               $scope.data = reply.result;
          //          });
          //     });
          //}
          //else {
               global.call('schema_load', {type: $stateParams.type, id: $stateParams.id},
                    function (err, reply) {
                         $scope.$apply(function () {
                              $scope.schema = reply.schema;
                              $scope.results = reply.results;
                         });
                    });
          //}
     };

     $scope.init($scope);

     $scope.getField = function (row, fieldName) {
          return row[fieldName];
     }
     $scope.format = function () {
          return JSON.stringify($scope.data, null, "    ");
     }

     $scope.field_add = function () {
          $scope.data.fields.push({});
     }

     $scope.down = function (index) {
          var a = $scope.data.fields[index];
          var b = $scope.data.fields[index + 1];

          $scope.data.fields[index] = b;
          $scope.data.fields[index + 1] = a;
     }

     $scope.up = function (index) {
          var a = $scope.data.fields[index];
          var b = $scope.data.fields[index - 1];

          $scope.data.fields[index] = b;
          $scope.data.fields[index - 1] = a;
     }

     $scope.field_remove = function(field) {
          var index = $scope.data.fields.indexOf(field);
          $scope.data.fields.splice(index, 1);
     }

     $scope.saveModel = function () {
          //$scope.data.type = $scope.schema.key;
          var data = { object: $scope.data };
          if ($stateParams.id) {
               data.id = $stateParams.id;
          }
          global.call('schema_save', data);
     }

     $scope.deleteItem = function () {
          global.call('schema_item_delete', { id: $stateParams.id });
     }
});;
//WeavverApp.factory('sessionRecoverer', ['$q', '$injector', function($q, $injector) {
//     var sessionRecoverer = {
//          responseError: function(response) {
//               // Session has expired
//               if (response.status == 419){
//                    var SessionService = $injector.get('SessionService');
//                    var $http = $injector.get('$http');
//                    var deferred = $q.defer();
//
//                    // Create a new session (recover the session)
//                    // We use login method that logs the user in using the current credentials and
//                    // returns a promise
//                    SessionService.login().then(deferred.resolve, deferred.reject);
//
//                    // When the session recovered, make the same backend call again and chain the request
//                    return deferred.promise.then(function() {
//                         return $http(response.config);
//                    });
//               }
//               return $q.reject(response);
//          }
//     };
//     return sessionRecoverer;
//}]);

//WeavverApp.config(['$httpProvider', function($httpProvider) {
//     //$httpProvider.interceptors.push('sessionRecoverer');
//}]);

WeavverApp.directive('myEnter', function () {
     return function (scope, element, attrs) {
          element.bind("keydown keypress", function (event) {
               if(event.which === 13) {
                    scope.$apply(function (){
                         scope.$eval(attrs.myEnter);
                    });

                    event.preventDefault();
               }
          });
     };
});;
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
          call: function (exchange, data, callback) {
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

               // or fallback and send it over http
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

//function SortObject(oData) {
//     var oNewData = {};
//     var aSortArray = [];
//
//     // sort keys
//     $.each(oData, function(sKey) {
//          aSortArray.push(sKey);
//     });
//     aSortArray.sort(SortLowerCase);
//
//     // create new data object
//     $.each(aSortArray, function(i) {
//          if (RealTypeOf(oData[(aSortArray[i])]) == "object" ) {
//               oData[(aSortArray[i])] = SortObject(oData[(aSortArray[i])]);
//          }
//          oNewData[(aSortArray[i])] = oData[(aSortArray[i])];
//     });
//
//     return oNewData;
//
//     function SortLowerCase(a,b) {
//          a = a.toLowerCase();
//          b = b.toLowerCase();
//          return ((a < b) ? -1 : ((a > b) ? 1 : 0));
//     }
//}