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
			$httpBackend.expectGET('/incidencias').
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

		it("deberia cargar una lista 'incidencias' con 4 items", function() {
			expect(scope.incidencias).toEqual(undefined);
			$httpBackend.flush();

			expect(scope.incidencias.length).toEqual(4);
		});
	});

	describe('VistaCtrl', function(){
		var scope, ctrl, $httpBackend,
		incidencia = {
			"_id": 1,
			"titulo": "Integración con Git",
			"tipo": "Mejora",
			"estado": "Abierta",
			"autor": "Ana",
			"descripcion": "Permitir poner un código en el mensaje del commit y que automáticamente se resuelva la incidencia"
		};

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('/incidencias/1').
			respond(incidencia);

			scope = $rootScope.$new();
			ctrl = $controller('VistaCtrl', {$scope: scope, idIncidencia: 1});
		}));

		it("deberia cargar un objeto con la incidencia", function() {
			expect(scope.incidencia).toEqual(undefined);
			$httpBackend.flush();

			expect(scope.incidencia).toEqualData(incidencia);
		});
	});

	describe('EdicionCtrl', function(){
		var scope, ctrl, $httpBackend,
		incidencia = {
			"_id": 1,
			"titulo": "Integración con Git",
			"tipo": "Mejora",
			"estado": "Abierta",
			"autor": "Ana",
			"descripcion": "Permitir poner un código en el mensaje del commit y que automáticamente se resuelva la incidencia"
		};

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('/incidencias/1').
			respond(incidencia);

			scope = $rootScope.$new();
			ctrl = $controller('EdicionCtrl', {$scope: scope, idIncidencia: 1});
		}));

		it("deberia cargar un objeto con la incidencia a editar", function() {
			expect(scope.incidencia).toEqual(undefined);
			$httpBackend.flush();

			expect(scope.incidencia).toEqualData(incidencia);
		});
	});

	describe('NuevaCtrl', function(){
		var scope, ctrl;

		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			ctrl = $controller('NuevaCtrl', {$scope: scope, idIncidencia: 1});
		}));

		it("deberia crear un objeto con la incidencia abierta", function() {
			expect(scope.incidencia).toEqualData({estado:"Abierta", tipo: "Bug"});
		});
	});
});