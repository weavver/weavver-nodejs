
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
});