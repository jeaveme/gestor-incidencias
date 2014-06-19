'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('Lista', function() {

	beforeEach(function() {
		browser.get('/');
	});


	it("debería filtrar las incidencias que no coinciden con el 'filtro'", function() {
		element(by.model('filtro')).sendKeys('heartbleed');
		expect(element.all(by.repeater('incidencia in incidencias')).count()).
		toEqual(1);
	});

	it("debería abrir el detalle de una incidencia", function() {
		element(by.repeater('incidencia in incidencias').row(1).column('titulo')).click();
		expect(element(by.binding('incidencia.estado')).getText()).toContain("Estado: Abierta");
	});
});


describe('Vista', function() {

	beforeEach(function() {
		browser.get('/#/ver/1');
	});


	it("debería mostrarse cuando el usuario navega a '/#/ver/1'", function() {
		expect(element(by.binding('incidencia.titulo')).getText()).toEqual("Título: Integración con Git");
	});

	it("debería abrir en modo edición una incidencia", function() {
		element(by.partialButtonText('Editar')).click();
		expect(element(by.model('incidencia.titulo')).getAttribute('value')) //getText() no funciona en inputs por un fallo en webdriver
		.toContain('Git');
	});

	it("debería eliminar una incidencia", function() {
		element(by.partialButtonText('Eliminar')).click();
		expect(element.all(by.repeater('incidencia in incidencias')).count()).
		toEqual(3);
	});

});

describe('Edición', function() {
	//TODO
});

describe('Nueva', function() {
	//TODO
});