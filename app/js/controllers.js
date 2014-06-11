'use strict';

/* Controllers */

angular.module('meanIssue.controllers', ['meanIssue.services'])
.controller('ListaCtrl', ['$scope', 'IncidenciaServ',
	function($scope, IncidenciaServ) {
		$scope.incidencias = IncidenciaServ.listar();
	}])
.controller('VistaCtrl', ['$scope', 'IncidenciaServ', '$location', 'idIncidencia',
	function($scope, IncidenciaServ, $location, idIncidencia) {
		IncidenciaServ.get({ id: idIncidencia }, function(leida) {
			$scope.incidencia = leida;
	
			$scope.modificar = function() {
				$location.path('editar/' + leida._id);
			};
	
			$scope.eliminar = function() {
				/*Acción no get a nivel de clase
				IncidenciaServ.remove({id: idIncidencia}, function(eliminada) {
					if (eliminada.ok === true) $location.path('/');
				});*/

				//A nivel de instacia
				leida.$remove(function(eliminada) {
					if (eliminada.ok === true) $location.path('/');
				});
			};
		});
	}])
.controller('EdicionCtrl', ['$scope', 'IncidenciaServ', '$location', 'idIncidencia',
	function($scope, IncidenciaServ, $location, idIncidencia) {
		IncidenciaServ.get({id: idIncidencia}, function(leida) {
			$scope.incidencia = leida;
	
			$scope.aplicar = function() {
				leida.$save(function(modificada) {
						$location.path('ver/' + modificada._id);
				});
			};
		});
	}])
.controller('NuevaCtrl', ['$scope', '$location', 'IncidenciaServ',
	function($scope, $location, IncidenciaServ) {
		$scope.incidencia = { estado: "Abierta", tipo: "Bug" };
		$scope.aplicar = function() {
			IncidenciaServ.save({}, $scope.incidencia, function(nueva) {
				$location.path('ver/' + nueva._id);
			});
		};
	}]);