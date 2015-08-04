angular.module('backend-module.product', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.product', {
            url: '/product',
            templateUrl: 'backend/product/product-module.html'


        })
    }
    ]);
