angular.module('frontend-module.compare', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.compare', {
            url: '/compare',
            userNotAuthenticated:true,
            templateUrl: 'frontend/compare/compare.html'


        });
    }]);
