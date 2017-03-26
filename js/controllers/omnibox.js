
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
     }


     $scope.init = function () {

     };
});
