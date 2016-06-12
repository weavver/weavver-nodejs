
exports.init = function (global) {
     global.app.get('/api/node', function (req, res) {
          //res.send({details: 'page dadtasdflaksjdflaskjd'});

          //global.messages.publish(req.exchange, JSON.stringify(req.body));
          var response = {};
          global.async.series([
               function (callback) {
                    response.schema = [{
                         field_name: 'type',
                         display_name: 'Type',
                         value_type: 'string',
                         header: {
                              text_align: 'center'
                         },
                         row: {
                              text_align: 'center'
                         }
                    },
                    {
                         field_name: 'memo',
                         display_name: 'Memo',
                         value_type: 'string'
                    },
                    {
                         field_name: 'amount',
                         display_name: 'Amount',
                         value_type: 'decimal'
                    }];
                    callback();
               },
               // load the menu
               function (callback) {
                    console.log(req.query.id);

                    if (req.query.id == 'accounting') {
                         response.menu = [{"name": 'accounts'}, {"name": 'something'}];
                    } else if (req.query.id == 'customer support') {
                         response.menu = [{"name": 'tickets'}, {"name": 'asdf'}];
                    } else {
                         response.menu = [{"name": 'accounting'}, {"name": 'customer support'}];
                    }
                    callback();
               },
               //// load list ?
               //function (callback) {
               //
               //     var sql = require('mssql');
               //     var config = {
               //          user: 'sa',
               //          password: '#mdkf38',
               //          server: '192.168.10.111', // You can use 'localhost\\instance' to connect to named instance
               //          database: 'weavverdb'
               //     };
               //
               //     sql.connect(config).then(function () {
               //          // Query
               //
               //          new sql.Request().query('select top 10 * from Accounting_LedgerItems').then(function (recordset) {
               //               response.items = recordset;
               //               callback();
               //          }).catch(function (err) {
               //               // ... query error checks
               //          });
               //     });
               //}
               ],
               function (err) {
                    res.send(response);
               });

     });

     global.app.get('/api/load_menu', function (req, res) {
     });
};