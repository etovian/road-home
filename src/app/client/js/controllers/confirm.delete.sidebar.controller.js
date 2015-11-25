(function() {

	'use strict';

	var deps = ['$uibModalInstance', 'NotificationService', 'message', ConfirmDeleteSidebarController];
	angular.module('app').controller('ConfirmDeleteSidebarController', deps);

	function ConfirmDeleteSidebarController($uibModalInstance, NotificationService, message) {
		var vm = this;
		angular.extend(vm, {
			message: message,
			cancel: function() {
				$uibModalInstance.dismiss();
			},
			confirm: function() {
				$uibModalInstance.close();
			}
		});
	}

})();