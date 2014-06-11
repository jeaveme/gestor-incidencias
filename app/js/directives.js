'use strict';

/* Directives */

angular.module('meanIssue.directives', []).
directive('enfocar', function() {
	return function(scope, elm, attrs) {
		elm[0].focus();
	};
});