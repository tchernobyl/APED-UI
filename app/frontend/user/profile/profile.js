angular.module('frontend-module.user.profile', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.user.profile', {
            url: '/profile',
            templateUrl: 'frontend/user/profile/profile.html'


        });
    }]);
