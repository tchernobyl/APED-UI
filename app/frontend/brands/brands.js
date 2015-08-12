angular.module('frontend-module.brands', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.brands', {
            url: '/brands',
            templateUrl: 'frontend/brands/brands.html'


        });
    }]);
