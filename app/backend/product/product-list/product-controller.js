'use strict';
angular.module('backend-module.product')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.product.list', {
            url: '/list',
            templateUrl: 'backend/product/product-list/product.html',
            controller: 'ProductListController',
            authenticate: true,
            resolve: {
                _products: [
                    'ProductProducts', '$stateParams',
                    function (ProductProducts, $stateParams) {
                        return ProductProducts.getList({expand: "brand"});
                    }
                ]
            }
        });
    }])
    .controller('ProductListController',
        ['$scope', '$modal', '$timeout', '_products',
            function ($scope, $modal, $timeout, _products) {
                $scope.products = _products.data;
                console.log(15151);

            }]);