
exports.init = function (weavver) {
     weavver.http.post('/publish', function (req, res) {
          weavver.log('// received publish command from client'.orange);
          res.send({status: 'processing'});

          weavver.messages.exchange_publish(req.exchange, req.body);
     });
}