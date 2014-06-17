"use strict";

var express  = require("express"),
	bodyParser = require("body-parser"),
	morgan  = require('morgan'),
	mongoose = require('mongoose'),
	http = require('http'),
	app  = express(),
	ip = process.env.IP || 'localhost',
	port = parseInt(process.env.PORT, 10) || 3000,
	routes = require('./routes');

mongoose.connect('mongodb://localhost:27017/meanissue', function (err) {
	if (err) throw err;

	//Middleware
	app.use(express.static(__dirname + '/../app'));
	app.use(morgan('short'));
	app.use(bodyParser());

	//Rutas
	routes(app, mongoose);

	http.createServer(app).listen(port, ip, function(){
		console.log('Servidor ejecutándose en http://'+ip+':' + port + '/');
	});
});