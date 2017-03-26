
var weavver = {};
weavver.shortid = require('shortid');
weavver.async = require('async');
weavver.express = require('express');
weavver.express_bodyParser = require('body-parser');
weavver.messages = require('./messages.js');
weavver.clients = require('./api/io.js');
weavver.fs = require('fs');
weavver.colors = require('colors');

weavver.http = weavver.express();

weavver.data = { };
weavver.config = require('./config.js');

// the id for this instance of nodejs
weavver.nodeId = weavver.shortid.generate();
weavver.nodeQueueId = 'weavver_node_' + weavver.nodeId;


weavver.log = function (msg) {
     console.log(msg); //'DEBUG: ' + msg.red);
     //console.log(JSON.stringify(obj, null, 2));

     //weavver.messages.exchange_publish('console_log', { message: msg });
};

weavver.start = function () {
     weavver.log("/////////////////////////////////////////////////".green);
     weavver.log("////////////////////////////////////////////////".green);
     weavver.log("//////// WEAVVER             ///////////////////".green);
     weavver.log("//////// Author: Mitchel Constantin    /////////".green);
     weavver.log("//////// Copyright 2017 Weavver, Inc. //////////".green);
     weavver.log("////////////////////////////////////////////////".green);

     weavver.express.static.mime.define({ 'text/css': ['css'] });
     weavver.http.use(weavver.express_bodyParser.json() );

     weavver.amqp_url = 'amqp://localhost';

     console.log('// http expose the folders with static html'.green);
     weavver.http.use(weavver.express.static('public'));
     weavver.http.use('/bower_components', weavver.express.static('bower_components'));

     weavver.messages.init(weavver, function () {
          console.log('// loading the services folder (rest endpoints and exchange subscribers)'.green);
          weavver.services = require('./api/index.js');
          weavver.services.init(weavver);

          console.log('// http: exposing io.js client library sw.js'.green);
          weavver.http.get('/sw.js', function (req, res) {
               // res.send('Hello World!');
               weavver.fs.readFile(__dirname + '/public/sw.js', 'utf8', function(err, content) {
                    // console.log(err);
                    res.send(content);
               });
          });

          weavver.http.get('*', function (req, res) {
               //res.send('Hello World!');
               weavver.fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, content) {
                    res.send(content);
               });
          });


          weavver.http_service = weavver.http.listen(928, function () {
               weavver.data.address = weavver.http_service.address().address;
               weavver.data.port = weavver.http_service.address().port;
               console.log('// web server now listening on http://%s:%s'.yellow, weavver.data.address, weavver.data.port);

               weavver.log('// initializing io.js so we can push data to web clients'.green);
               weavver.clients.init(weavver);
          });
     });

};

weavver.start();
