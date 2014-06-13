'use strict';

/* Directives */

angular.module('meanIssue.directives', []).
directive('enfocar', function() {
	return {
		link: function(scope, elm, attrs) {
			elm[0].focus();
		}
	};
});