var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var async = require('async');

exports.init = function (weavver) {
     weavver.http.get('/debug', function (req, res) {

          res.send(global.config);
          return;

          console.log(weavver.data.config.mongo_url);
          var db = null;
          async.series([
                    function (callback) {
                         MongoClient.connect(weavver.data.config.mongo_url, function(err, dbobj) {
                              db = dbobj;
                              if (!err) {
                                   console.log('...debug: connected to mongodb server');
                              } else {
                                   console.log('...debug: could not connect to mongodb'.red);
                              }
                              callback(err, null);
                         });
                    },
                    // load up the schema for this data type
                    function (callback) {
                         db.collection.count(function (err, count) {
                              console.log('total count: ' + count);
                              callback(err, count);
                         });
                    }
               ],
               function (err, results) {
                    var data = weavver.data;

                    if (!err) {
                         data.status = 'error loading data properly';
                         data.error = err;
                    }
                    data.results = results;
                    res.send(data);

                    db.close();
               }
          );

     });
};