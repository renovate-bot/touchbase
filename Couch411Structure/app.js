// modules
var couchbase 		= require('couchbase');
var express			= require('express');
var app 			= express();
var config 			= require("./config");
var bodyParser		= require('body-parser');
var methodOverride 	= require('method-override');
var morgan 			= require('morgan');
var multer  		= require('multer');

// use commands
app.use(bodyParser.urlencoded({extended:true, limit: '3mb'}));
app.use(bodyParser.json({limit: '3mb'}));
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var cluster = new couchbase.Cluster(config.couchbase.server);
module.exports.userBucket = cluster.openBucket(config.couchbase.userBucket);
module.exports.pictureBucket = cluster.openBucket(config.couchbase.pictureBucket);
module.exports.publishBucket = cluster.openBucket(config.couchbase.publishBucket);

var routes = require("./routes/routes.js")(app);

// startup our app at http://localhost:3000
var port = process.env.PORT || config.couchbase.TouchbasePort;
app.listen(port);               

// inform user of IP                     
console.log('View Touchbase at localhost:' + config.couchbase.TouchbasePort);