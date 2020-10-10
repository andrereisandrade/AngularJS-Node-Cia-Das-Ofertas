var express = require('express');

var fs = require('fs');

var load = require('express-load');

var bodyParser = require('body-parser');

var methodOverride  = require('method-override');

var favicon = require('serve-favicon');


module.exports = function() {

    var app = express();

    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    app.use(favicon('./public/src/favicon/favicon.ico'));

    app.use(methodOverride()); // simulate DELETE and PUT

    // CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
    app.use('*', function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers',  'Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Range, Content-Disposition, Authorization, X-Requested-With');
        next();
    });


    load('models', { cwd: 'app' })
    .then('controllers')
    .then('routes')
    .into(app);
    return app;
};
