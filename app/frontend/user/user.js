angular.module('frontend-module.user', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.user', {
            url: '/user',
            templateUrl: 'frontend/user/user.html'


        });
    }]);
