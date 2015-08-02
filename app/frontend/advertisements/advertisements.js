angular.module('frontend-module.advertisements', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.advertisements', {
            url: '/advertisements',
            templateUrl: 'frontend/advertisements/advertisements.html'


        });
    }]);
