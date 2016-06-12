
exports.init = function(global) {
     var normalizedPath = require("path").join(__dirname, "/services");

     require("fs").readdirSync(normalizedPath).forEach(function(file) {
          require(normalizedPath + "/" + file).init(global);
     });

};