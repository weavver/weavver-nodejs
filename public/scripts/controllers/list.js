
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
