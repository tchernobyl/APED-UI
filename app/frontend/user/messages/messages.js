angular.module('frontend-module.user.message', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.user.messages', {
            url: '/messages',
            templateUrl: 'frontend/user/messages/messages.html'


        });
    }]);
