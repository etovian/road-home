(function() {
	angular.module('app').controller('WelcomeController', ['$aside', 'NotificationService', WelcomeController]);

	function WelcomeController($aside, notificationService) {
		var vm = this;

		angular.extend(vm, {
			
		});
	}

})();