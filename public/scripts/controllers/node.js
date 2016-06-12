
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
