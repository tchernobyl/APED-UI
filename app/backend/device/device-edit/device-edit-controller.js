'use strict';
angular.module('backend-module.device')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.device.edit', {
            url: '/edit/{id:[0-9]*}',
            templateUrl: 'backend/device/device-edit/device-edit.html',
            controller: 'DeviceEditController',
            authenticate: true,
            resolve: {
                _device: [
                    'DeviceDevices', '$stateParams',
                    function (DeviceDevices, $stateParams) {
                        if ($stateParams.id) {
                            return DeviceDevices.one($stateParams.id).get({expand: "products"});
                        } else {
                            var dataDevice = {data: DeviceDevices.one()};
                            dataDevice.data.products = [];
                            return dataDevice;
                        }

                    }
                ],
                _products: [
                    'ProductProducts',
                    function (ProductProducts) {
                        return ProductProducts.getList();
                    }
                ],
                _categories: [
                    'CategoryCategories',
                    function (CategoryCategories) {
                        return CategoryCategories.getList();
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
    .controller('DeviceEditController',
        ['$scope', '$modal', '$state', '$timeout', '_device', '_products', '_categories', '_brands',
            function ($scope, $modal, $state, $timeout, _device, _products, _categories, _brands) {
                $scope.device = _device.data;
                $scope.brands = _brands.data;
                $scope.categories = _categories.data;
                $scope.products = _products.data;
                $scope.saveDevice = function () {
                    $scope.device.save().then(function () {

                        $state.go("backend.device.list");
                    }, function () {

                    });
                };

                $scope.AddProducts = {

                    open: function (products, $index) {
                        var products_list = angular.copy($scope.device.products);

                        var addProducts = $modal.open({
                            templateUrl: 'components/product-products/select-objects/select-objects.html',
                            controller: 'SelectObjectsModalController',
                            resolve: {
                                _oldObjects: function () {
                                    return products_list;
                                },
                                _allObjects: function () {
                                    return $scope.products;
                                }
                            }
                        });
                        addProducts.result.then(function (result) {

                            $scope.device.products = result;
                        }, function () {


                        });
                    }
                };

            }]);