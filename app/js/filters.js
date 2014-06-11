'use strict';

/* Filters */

angular.module('meanIssue.filters', []).
filter('estado', function() {
	return function(input) {
		if(input==="Resuelta") return input+" \u2713";
		else if (input==="Abierta") return input+" \u2718";
		else return "No válido ¿?";
	};
});
