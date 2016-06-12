

$('#myTabs a').click(function (e) {
     e.preventDefault()
     $(this).tab('show')
});

$('#myTabs a:last').tab('show');

WeavverApp.controller('schema', function (global, $state, $stateParams, $scope, $http, $interval) {
     //$scope.$state = $state;
     //$scope.id = $stateParams.id;
     //$scope.url = $stateParams.url;
     //console.log($stateParams.url);
     //$scope.browser_response = 'asdfasdf';

     $scope.item = { 'a': 'b'};
     $scope.data = { fields: [] };

     //$scope.schema = {
     //     "fields": [
     //          {
     //               "key": "_id",
     //               "name": "Id",
     //               "description": "The data id"
     //          },
     //          {
     //               "key": "type",
     //               "name": "Type",
     //               "description": "The type of data"
     //          },
     //          {
     //               "key": "key",
     //               "name": "Key",
     //               "description": "The database key for this type"
     //          },
     //          {
     //               "key": "name",
     //               "name": "Name",
     //               "description": "The name of the schema type"
     //          },
     //          {
     //               "key": "description",
     //               "name": "Description",
     //               "description": "The description of the schema"
     //          }
     //     ],
     //     "key": "schema",
     //     "name": "Schema",
     //     "description": "A data model"
     //};

     $scope.init = function ($scope) {
          if ($stateParams.id) {
               var query = { type: $stateParams.type, id: $stateParams.id };
               global.publish('schema_item_load', query, function (err, reply) {
                    $scope.$apply(function () {
                         console.log($scope);
                         $scope.schema = reply.schema;
                         $scope.data = reply.result;
                    });
               });

               var typeListQuery = {type: 'schema' };
               global.publish('schema_load', typeListQuery, function (err, reply) {
                    $scope.$apply(function () {
                         console.log(reply.results);
                         $scope.typelist = reply.results;
                    });
               });
          }
          else {
               global.publish('schema_load', {type: $stateParams.type, id: $stateParams.id}, function (err, reply) {
                    $scope.$apply(function () {
                         $scope.schema = reply.schema;
                         $scope.results = reply.results;
                    });
               });
          }
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
          global.publish('schema_save', data);
     }

     $scope.deleteItem = function () {
          global.publish('schema_item_delete', { id: $stateParams.id });
     }
});