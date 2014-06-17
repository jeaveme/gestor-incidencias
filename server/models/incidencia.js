module.exports = function(connection){
	var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		autoIncrement = require('mongoose-auto-increment');

	autoIncrement.initialize(connection);

	//Definimos el esquema
	var incidenciaSchema = new Schema({
		titulo: {
			type: String,
			trim: true,
			validate: validarTitulo
		},
		tipo: {
			type: String,
			trim: true,
			validate: validarTipo
		},
		estado: {
			type: String,
			trim: true,
			validate: validarEstado
		},
		autor: {
			type: String,
			trim: true,
			validate: validarAutor
		},
		descripcion: {
			type: String,
			trim: true,
			validate: validarDescripcion
		}
	});

	//funciones de validación
	function validarTitulo(str) { return str.length < 70; }
	function validarTipo(str) { 
		return (str==="Mejora" || str==="Bug");
	}
	function validarEstado(str) { 
		return (str==="Abierta" || str==="Resuelta");
	}
	function validarAutor(str) { return str.length < 30; }
	function validarDescripcion(str) { return str.length < 250; }

	incidenciaSchema.plugin(autoIncrement.plugin, {
		model: 'Incidencia',
		startAt: 4
	});

	//Compilamos el modelo
	return mongoose.model('Incidencia', incidenciaSchema);
}