var global = {};
global.async = require('async');
global.shortid = require('shortid');
global.express = require('express');
global.app = global.express();
global.bodyParser = require('body-parser');
global.messages = require('./messages.js');
global.io = require('./api/io.js');
global.fs = require('fs');
global.api = require('./api/index.js');

// the id for this instance of nodejs
global.nodeId = global.shortid.generate();
global.nodeQueueId = 'weavver_node_' + global.nodeId;

global.express.static.mime.define({ 'text/css': ['css'] });
global.app.use(global.bodyParser.json() );
global.app.use(global.express.static('public'));
global.app.use('/bower_components', global.express.static('bower_components'));

require('./api/node.js').init(global);

global.app.get('/api/schema', function (req, res) {
     var schema = [ {'name': 'id' },
                  { 'name' : 'name' } ];
     //if (!req.query.id) {
     //     menu = [{ "name": 'accounting'}, { "name": 'customer support'}];
     //} else if (req.query.id == 'accounting') {
     //     menu = [{ "name": 'accounts'}, { "name": 'something'}];
     //}
     res.send(schema);
});


global.app.get('*', function (req, res) {
     //res.send('Hello World!');
     global.fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, content) {
          res.send(content);
     });
});

global.http = global.app.listen(3000, function () {
     var host = global.http.address().address;
     var port = global.http.address().port;

     console.log('Example app listening at http://%s:%s', host, port);

     global.messages.init(global, function () {
          global.app.post('/publish', function (req, res) {
               res.send({status: 'processing'});

               global.messages.exchange_publish(req.exchange, req.body);
          });

          global.io.init(global)
          global.api.init(global);
     });
});
