(function() {
	angular.module('app').controller('MainController', ['notificationService', MainController]);

	function MainController(notificationService) {
		var vm = this;

		angular.extend(vm, {
			getActiveNotifications: function() {
				return notificationService.getActiveNotifications();
			},
			getNotificationClass: function(notification) {
				return notificationService.getNotificationClass(notification);
			}
		});
		
		notificationService.add({
			title: 'Howdy!',
			text: 'Welcome to the Road Home',
			type: notificationService.NOTIFICATION_TYPES.SUCCESS
		});
	}

})();