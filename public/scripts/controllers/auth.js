
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
          global.publish('account_login', $scope.data);
     };
     //$interval($scope.updateSolar, 500);
     //$scope.updateSolar();

     $scope.register = function () {
          alert('test');
          $scope.registered = true;
     };

     $scope.login = function () {
          global.publish('account_login', $scope.data);
          //alert('test');
          //global.setLoggedIn();
     };

     $scope.signout = function () {
          $state.go('^account.login');
          global.signOut();
     };
});