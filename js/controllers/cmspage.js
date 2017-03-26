
WeavverApp.controller('CmsPage', function (global, $stateParams, $scope, $http, $interval) {
     $scope.details = 'Loading..';

     global.load_data($stateParams.pageid, function (data) {
          $scope.details = data.data.details;
     });
});
