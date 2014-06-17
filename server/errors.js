module.exports = function(app) {
	// 404s
	app.use(function(req, res, next) {
		res.status(404);
		res.format({
			text: function() {
				res.send("Error 404, la página no ha sido encontrada.");
			},
			html: function() {
				res.set("content-type","text/html; charset=utf-8");
				res.send("<h2>Error 404</h2>La página no ha sido encontrada.");
			},
			json: function() {
				res.json({
					error: 'Not found'
				});
			},
			default: function() {
				res.send(406, 'Formato solicitado no aceptable');
			}
		});
	});

	// 500
	app.use(function(err, req, res, next) {
		console.error('Error interno en %s\n%s', req.url, err.stack);
		res.json({status: 500, mensaje: "Oops, ocurrió un error interno en el servidor."});
	});
};