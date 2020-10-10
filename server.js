var http = require('http');

var app = require('./config/express')();

var server_port = process.env.PORT || 9000;

//var connectMongoDB = 'mongodb://52.38.232.255:27017/ciadasofertas';
var connectMongoDB = 'mongodb://localhost/ciadasofertas';

require('./config/database.js')(connectMongoDB);

http.createServer(app).listen(server_port, function() {
    console.log('Listening: http://localhost:' + server_port);
});
