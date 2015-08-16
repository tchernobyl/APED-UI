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
                            return ProductProducts.one($stateParams.id).get({expand: "brands"});
                        } else {
                            var product = {data: ProductProducts.one()};
                            product.data.brands = [];
                            return product;
                        }

                    }
                ],
                _brands: [
                    'BrandBrands',
                    function (BrandBrands) {
                        return BrandBrands.getList({expand: "brands"});
                    }
                ]
            }
        });
    }])
    .controller('ProductEditController',
        ['$scope', '$modal', '$state', '$timeout', '_product', '_brands',
            function ($scope, $modal, $state, $timeout, _product, _brands) {
                $scope.productSetup = {
                    multiple: true,
                    formatSearching: 'Searching the product...',
                    formatNoMatches: 'No product found'
                };
                $scope.product = _product.data;
                $scope.brands = _brands.data;


                $scope.AddExtraFields = {
                    open: function () {
                        var extraFields = angular.copy($scope.product.extraFields);

                        var addExtraFields = $modal.open({
                            templateUrl: 'components/extra-fields/extra-fields.html',
                            controller: 'ExtraFieldsModalController',
                            resolve: {
                                _extraFields: function () {
                                    return extraFields;
                                }
                            }
                        });
                        addExtraFields.result.then(function (result) {

                            $scope.product.extraFields = result;
                        }, function () {


                        });
                    }
                };
                $scope.AddBrands = {

                    open: function (brands, $index) {
                        var brands_list = angular.copy($scope.product.brands);

                        var addBrands = $modal.open({
                            templateUrl: 'components/brand-brands/select-brands/select-brands.html',
                            controller: 'SelectBrandsModalController',
                            resolve: {
                                _oldBrands: function () {
                                    return brands_list;
                                },
                                _brands: function () {
                                    return $scope.brands;
                                }
                            }
                        });
                        addBrands.result.then(function (result) {

                            $scope.product.brands = result;
                        }, function () {


                        });
                    }
                };
                $scope.saveProduct = function () {
                    $scope.product.save().then(function () {

                        $state.go("backend.product.list");
                    }, function () {

                    });
                }


            }]);