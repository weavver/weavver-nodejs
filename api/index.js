
exports.init = function(weavver) {
     var normalizedPath = require("path").join(__dirname, "/services");
     weavver.log('// searching %s for services..'.green, normalizedPath);

     weavver.fs.readdirSync(normalizedPath).forEach(function(file) {
          var out = '...initializing service \'' + file + '\'';
          weavver.log(out.green);
          var service = require(normalizedPath + "/" + file);
          service.init(weavver);
     });
};