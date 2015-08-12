angular.module('frontend-module.products', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.products', {
            url: '/products',
            templateUrl: 'frontend/products/products.html'


        });
    }]);
