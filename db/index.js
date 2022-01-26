var mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("DB Connection Successful");
});

module.exports = db
