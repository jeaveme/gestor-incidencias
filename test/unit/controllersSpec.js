'use strict';

describe('Controlador', function(){

	beforeEach(function(){
		this.addMatchers({
			toEqualData: function(expected) {
				return angular.equals(this.actual, expected);
			}
		});
	});

	beforeEach(module('meanIssue.controllers'));

	describe('ListaCtrl', function(){
		var scope, ctrl, $httpBackend;

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('incidencias').
			respond([
			{
				"_id": "0",
				"titulo": "Fallo de seguridad HeartBleed",
				"autor": "Jesus"
			},
			{
				"_id": "1",
				"titulo": "Integración con Git",
				"autor": "Ana"
			},
			{
				"_id": "2",
				"titulo": "Permitir diferentes tipos de incidencias",
				"autor": "Javier"
			},
			{
				"_id": "3",
				"titulo": "Añadir el título del proyecto monitorizado en la cabecera de la webapp",
				"autor": "Ana"
			}
			]);

			scope = $rootScope.$new();
			ctrl = $controller('ListaCtrl', {$scope: scope});
		}));

		it("debería cargar una lista 'incidencias' con 4 items", function() {
			expect(scope.incidencias).toEqualData([]);
			$httpBackend.flush();

			expect(scope.incidencias.length).toEqual(4);
		});
	});

	describe('VistaCtrl', function(){
		var scope, ctrl, location, $httpBackend,
		incidencia = {
			"_id": 1,
			"titulo": "Integración con Git",
			"tipo": "Mejora",
			"estado": "Abierta",
			"autor": "Ana",
			"descripcion": "Permitir poner un código en el mensaje del commit y que automáticamente se resuelva la incidencia"
		};

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $location) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('incidencias/1').respond(incidencia);
			location = $location;
			scope = $rootScope.$new();
			ctrl = $controller('VistaCtrl', {$scope: scope, $location: location, idIncidencia: 1});
		}));

		it("debería cargar un objeto con la incidencia", function() {
			expect(scope.incidencia).toBeUndefined();
			$httpBackend.flush();

			expect(scope.incidencia).toEqualData(incidencia);
		});

		it("debería eliminar la incidencia cuando se solicita", function() {
			$httpBackend.flush();
			expect(scope.incidencia).toBeTruthy();
			$httpBackend.expectDELETE('incidencias/1').respond({"ok":true});
			scope.eliminar();
			$httpBackend.flush();
			expect(location.path()).toEqual('/');
		});

		it("debería abrir la incidencia en modo edición", function() {
			$httpBackend.flush();
			expect(scope.incidencia).toBeTruthy();
			scope.modificar();
			expect(location.path()).toEqual('/editar/1');
		});
	});

	describe('EdicionCtrl', function(){
		var scope, ctrl, location, $httpBackend,
		incidencia = {
			"_id": 1,
			"titulo": "Integración con Git",
			"tipo": "Mejora",
			"estado": "Abierta",
			"autor": "Ana",
			"descripcion": "Permitir poner un código en el mensaje del commit y que automáticamente se resuelva la incidencia"
		};

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $location) {
			$httpBackend = _$httpBackend_;
			location = $location;
			$httpBackend.expectGET('incidencias/1').respond(incidencia);
			scope = $rootScope.$new();
			ctrl = $controller('EdicionCtrl', {$scope: scope, $location: location, idIncidencia: 1});
		}));

		it("debería guardar la edición de una incidencia", function() {
			expect(scope.incidencia).toBeUndefined();
			$httpBackend.flush();
			expect(scope.incidencia).toEqualData(incidencia);
			scope.incidencia.estado = "Resuelta";
			$httpBackend.expectPOST('incidencias/1', scope.incidencia).respond(scope.incidencia);
			scope.aplicar();
			$httpBackend.flush();
			expect(location.path()).toEqual('/ver/1');
		});
	});

	describe('NuevaCtrl', function(){
		var scope, ctrl, httpBackend, location, nueva = {
			"titulo": "Integración con SVN",
			"tipo": "Mejora",
			"estado": "Abierta",
			"autor": "María",
			"descripcion": "Permitir poner un código en el mensaje del commit y que automáticamente se resuelva la incidencia"
		}, respuesta = Object.create(nueva);
		respuesta._id = 100;

		beforeEach(inject(function($rootScope, $controller, $httpBackend, $location) {
			scope = $rootScope.$new();
			httpBackend = $httpBackend;
			location = $location;
			ctrl = $controller('NuevaCtrl', {$scope: scope, idIncidencia: 1});
			httpBackend.expectPOST('incidencias', nueva).respond(respuesta);
		}));

		it("debería crear un objeto con la incidencia abierta", function() {
			expect(scope.incidencia).toEqualData({estado:"Abierta", tipo: "Bug"});
			scope.incidencia = nueva;
			scope.aplicar();
			httpBackend.flush();
			expect(location.path()).toEqual('/ver/100');
		});
	});
});