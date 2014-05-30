'use strict';

/* Controllers */

angular.module('meanIssue.controllers', [])
.controller('ListaCtrl', ['$scope', '$http', function($scope, $http) {
	$http({method: 'GET', url: '/incidencias'}).
	success(function(data, status, headers, config) {
		$scope.incidencias = data;
	});
}])
.controller('VistaCtrl', ['$scope', '$http', '$location', 'idIncidencia',
	function($scope, $http, $location, idIncidencia) {
		$http({method: 'GET', url: '/incidencias/'+idIncidencia}).
		success(function(data, status, headers, config) {
			$scope.incidencia = data;
			
			$scope.modificar = function(){
				$location.path('editar/'+data._id);
			};

			$scope.eliminar = function(){
				$http.delete('/incidencias/'+data._id).
				success(function(data, status, headers, config) {
					if(data==="true") $location.path('/');
				});
			};
		});
	}])
.controller('EdicionCtrl', ['$scope', '$http', '$location', 'idIncidencia',
	function($scope, $http, $location, idIncidencia) {
		$http({method: 'GET', url: '/incidencias/'+idIncidencia}).
		success(function(data, status, headers, config) {
			$scope.incidencia = data;

			$scope.aplicar = function(){
				$http.post('/incidencias/'+data._id, $scope.incidencia).
				success(function(data, status, headers, config) {
					$location.path('ver/'+data._id);
				});
			};
		});
	}])
.controller('NuevaCtrl', ['$scope', '$location', '$http', function($scope, $location, $http) {
	$scope.incidencia = {estado:"Abierta", tipo: "Bug"};
	$scope.aplicar = function(){
		$http.post('/incidencias', $scope.incidencia).
		success(function(data, status, headers, config) {
			$location.path('ver/'+data._id);
		});
	};
}]);