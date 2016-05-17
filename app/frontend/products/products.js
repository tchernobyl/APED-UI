angular.module('frontend-module.products', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.products', {
            url: '/products',
            userNotAuthenticated:true,
            templateUrl: 'frontend/products/products.html'


        });
    }]);
