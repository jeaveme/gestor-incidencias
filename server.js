"use strict";

var express  = require("express"),
	bodyParser = require("body-parser"),
	methodOverride = require("method-override"),
	morgan  = require('morgan'),
	app  = express(),
	port = parseInt(process.env.PORT, 10) || 3000;

	app.use(methodOverride());
	app.use(morgan('short'));
	app.use(bodyParser());
	app.use(express.static(__dirname + '/app'));

var incidencias = {
	'0':{
		"_id": 0,
		"titulo": "Fallo de seguridad HeartBleed",
		"tipo": "Bug",
		"estado": "Abierta",
		"autor": "Jesus",
		"descripcion": "Agujero de seguridad (bug) de software en la biblioteca de código abierto OpenSSL, solo vulnerable en su versión 1.0.1f, que permite a un atacante leer la memoria de un servidor o un cliente, permitiéndole por ejemplo, conseguir las claves privadas SSL de un servidor."
	},
	'1':{
		"_id": 1,
		"titulo": "Integración con Git",
		"tipo": "Mejora",
		"estado": "Abierta",
		"autor": "Ana",
		"descripcion": "Permitir poner un código en el mensaje del commit y que automáticamente se resuelva la incidencia"
	},
	'2':{
		"_id": 2,
		"titulo": "Permitir diferentes tipos de incidencias",
		"tipo": "Mejora",
		"estado": "Resuelta",
		"autor": "Javier",
		"descripcion": "Sería adecuado que a la hora de crear una incidencia se pudiera distinguir si es un bug de si es una solicitud de mejora."
	},
	'3':{
		"_id": 3,
		"titulo": "Añadir el título del proyecto monitorizado en la cabecera de la webapp",
		"tipo": "Mejora",
		"estado": "Abierta",
		"autor": "Ana",
		"descripcion": "Actualmente no hay ninguna referencia a qué proyecto se le están siguiendo las incidencias."
	}
};
var next_id = 4;

//Sirve la lista de incidencias
app.get('/incidencias', function(req, res) {
	var lista = [];
	for (var i in incidencias){
		lista.push({
			"_id": i,
			"titulo": incidencias[i].titulo,
			"autor": incidencias[i].autor
		});
	}
	res.json(lista);
});

//Sirve una incidencia concreta
app.get('/incidencias/:id', function(req, res) {
	res.json(incidencias[req.params.id]);
});

//Crea una nueva incidencia
app.post('/incidencias', function(req, res) {
	var incidencia = req.body;
	incidencia._id = next_id++;
	incidencias[incidencia._id] = incidencia;

	res.json(incidencia);
});

//Modificar una incidencia ya existente
app.post('/incidencias/:id', function(req, res) {
	var incidencia = req.body;
	incidencia._id = req.params.id;
	incidencias[incidencia._id] = incidencia;

	res.json(incidencia);
});

//Eliminar una incidencia
app.delete('/incidencias/:id', function(req, res) {
	delete incidencias[req.params.id];
	res.json({"ok": true});
});

app.listen(port);
console.log('Servidor ejecutándose en http://localhost:' + port + '/');
