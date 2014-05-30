'use strict';


// Declare app level module which depends on filters, and services
angular.module('meanIssue', [
	'ngRoute',
	'meanIssue.filters',
	'meanIssue.services',
	'meanIssue.directives',
	'meanIssue.controllers'
	]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {templateUrl: 'partials/lista.html', controller: 'ListaCtrl'});
	$routeProvider.when('/ver/:id', {templateUrl: 'partials/verIncidencia.html', controller: 'VistaCtrl'});
	$routeProvider.when('/editar/:id', {templateUrl: 'partials/formIncidencia.html', controller: 'EdicionCtrl'});
	$routeProvider.when('/nueva', {templateUrl: 'partials/formIncidencia.html', controller: 'NuevaCtrl'});  
	$routeProvider.otherwise({redirectTo: '/'});
}]);
