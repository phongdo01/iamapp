const cors = require("cors");
var whitelist = ['http://http://13.215.199.73', 'http://shinosuke.cf/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = cors(corsOptions);