'use strict';

/* Services */

angular.module('meanIssue.services', ['ngResource']).
factory('IncidenciaServ', ['$resource', function($resource) {
	return $resource('incidencias/:id', { id: '@_id' }, {
		//actions
		listar: {
			method: 'GET',
			isArray: true
		}
	});
}]);