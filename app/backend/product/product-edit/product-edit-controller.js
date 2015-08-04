'use strict';
angular.module('backend-module.product')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.product.edit', {
            url: '/edit/{id:[0-9]*}',
            templateUrl: 'backend/product/product-edit/product-edit.html',
            controller: 'ProductEditController',
            authenticate: true,
            resolve: {
                _product: [
                    'ProductProducts', '$stateParams',
                    function (ProductProducts, $stateParams) {
                        if ($stateParams.id) {
                            return ProductProducts.one($stateParams.id).get();
                        } else {
                            return {data: ProductProducts.one()};
                        }

                    }
                ],
                _brands: [
                    'BrandBrands',
                    function (BrandBrands) {
                        return BrandBrands.getList();
                    }
                ]
            }
        });
    }])
    .controller('ProductEditController',
        ['$scope', '$modal', '$state', '$timeout', '_product', '_brands',
            function ($scope, $modal, $state, $timeout, _product, _brands) {
                $scope.product = _product.data;
                $scope.brands = _brands.data;
                $scope.saveProduct = function () {
                    $scope.product.save().then(function () {

                        $state.go("backend.product.list");
                    }, function () {

                    });
                }


            }]);