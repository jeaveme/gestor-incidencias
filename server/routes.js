var errores = require('./errors'),
	Incidencia;

module.exports = function(app, mongoose){
	Incidencia = (require('./models/incidencia')(mongoose.connection));

	//Sirve la lista de incidencias
	app.get('/incidencias', function(req, res) {
		Incidencia.find(function(err, incidencias){
			if (err) throw err;
			var lista = [];
			for (var i in incidencias){
				lista.push({
					"_id": incidencias[i]._id,
					"titulo": incidencias[i].titulo,
					"autor": incidencias[i].autor
				});
			}
			res.json(lista);
		});
	});

	//Sirve una incidencia concreta
	app.get('/incidencias/:id', function(req, res) {
		Incidencia.find({'_id': req.params.id}, function(err, incidencia){
			if (err) throw err;
			res.json(incidencia[0]);
		});
	});

	//Crea una nueva incidencia
	app.post('/incidencias', function(req, res) {
		var datosIncidencia = req.body,
		nueva = new Incidencia(datosIncidencia);
		nueva.save(function(err, insertada){
			if (err) throw err;
			res.json(insertada);
		});
	});

	//Modificar una incidencia ya existente
	app.post('/incidencias/:id', function(req, res) {
		var incidencia = req.body;
		Incidencia.findOneAndUpdate({'_id': req.params.id}, incidencia, function(err, actualizada){
			if (err) throw err;
			res.json(actualizada);
		});
	});

	//Eliminar una incidencia
	app.delete('/incidencias/:id', function(req, res) {
		Incidencia.findOneAndRemove({'_id': req.params.id}, function(err){
			if (err) throw err;
			res.json({"ok": true});
		});
	});

	errores(app);
};