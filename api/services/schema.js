var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var async = require('async');
var url = 'mongodb://192.168.10.14:27017/weavver';

exports.init = function (global) {

     global.messages.consume('schema_load', 'schema_load-schema', {autoDelete: true, noAck: false}, function (message) {
          MongoClient.connect(url, function(err, db) {
               console.log("Connected to server----------");
               console.log(message);
               //return;

               //console.log(message.body.data.type);
               async.parallel([
                         function(callback){
                              var collection = db.collection('schema');
                              collection.find({type: message.body.data.type}).toArray(function (err, docs) {
                                   callback(err, docs[0]);
                              });
                         },
                         function(callback){
                              var collection = db.collection(message.body.data.type);
                              collection.find().toArray(function (err, docs) {
                                   callback(err, docs);
                              });
                         }
                    ],
                    function(err, results){
                         var data = {};
                         data.queue = 'browser_response';
                         data.socketId = message.returnAddress.socketId;
                         data.browser_response = { schema: results[0], results: results[1] };
                         data.browser_response.callbackId = message.body.callbackId;
                         global.messages.queue_publish(message.returnAddress.nodeQueueId, data);

                         db.close();
                    });
          });
     });

     global.messages.consume('schema_item_load', 'schema_item_load-schema', {autoDelete: true, noAck: false}, function (message) {
          MongoClient.connect(url, function(err, db) {
               console.log("...schema_item_load: " + message.body.data.type + ' - id: ' + message.body.data.id);
               //console.log(message);
               //return;

               async.parallel([
                    function(callback){
                         var schemas = db.collection('schema');
                         schemas.find({type: message.body.data.type}).toArray(function (err, docs) {
                              callback(err, docs[0]);
                         });
                    },
                    function(callback) {
                         var collection = db.collection(message.body.data.type);
                         collection.find({ _id: ObjectID(message.body.data.id) }).toArray(function (err, docs) {
                              callback(err, docs[0]);
                         });
                    }
               ],
               function(err, results){
                    var data = {};
                    data.queue = 'browser_response';
                    data.socketId = message.returnAddress.socketId;
                    data.browser_response = { schema: results[0], result: results[1] };
                    data.browser_response.callbackId = message.body.callbackId;
                    global.messages.queue_publish(message.returnAddress.nodeQueueId, data);

                    db.close();
               });
          });
     });

     global.messages.consume('schema_item_delete', 'schema_item_delete-schema', {autoDelete: true, noAck: false}, function (message) {

          MongoClient.connect(url, function(err, db) {
               console.log('deleting: ' + message.body.data.id);
               var collection = db.collection('schema'); //message.body.data.type);
               collection.deleteOne({ _id : ObjectID(message.body.data.id) }, function(err, result) {
                    console.log(err);
                    if (result) {
                         console.log(result);
                    }
                    db.close();
               });

          });
     });

     global.messages.consume('schema_save', 'schema_save-mongo', {autoDelete: true, noAck: false}, function (message) {
          console.log('--------------- schema_load: ' + JSON.stringify(message.body.data));

          MongoClient.connect(url, function(err, db) {
               console.log("Connected to server");


               var collection = db.collection('schema');
               if (message.body.data.id) {
                    delete message.body.data.object['_id'];
                    collection.updateOne({ _id: ObjectID(message.body.data.id) }, { $set: message.body.data.object }, function (err, result) {
                         console.log(err);
                         console.log(result);
                    });
               }
               else {
                    collection.insertOne(message.body.data.object,
                         function(err, result) {
                              console.log(err);
                              console.log(result);
                         }
                    );
               };
          });
     });
};