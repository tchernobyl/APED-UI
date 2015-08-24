angular.module('frontend-module.compare', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.compare', {
            url: '/compare',
            templateUrl: 'frontend/compare/compare.html'


        });
    }]);
