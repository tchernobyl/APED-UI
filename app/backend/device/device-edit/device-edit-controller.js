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
                            return DeviceDevices.one($stateParams.id).get({expand: "products,images"});
                        } else {
                            var dataDevice = {data: DeviceDevices.one()};
                            dataDevice.data.products = [];
                            dataDevice.data.images = [];
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
        ['$scope', '$modal', '$state', '$timeout', '_device', '_products', '_categories', '_brands', 'CategoryCategories', 'BrandBrands',
            function ($scope, $modal, $state, $timeout, _device, _products, _categories, _brands, CategoryCategories, BrandBrands) {
                $scope.device = _device.data;
                $scope.brands = _brands.data;
                $scope.categories = _categories.data;
                $scope.products = _products.data;

                $scope.AddExtraFields = {
                    open: function () {
                        var extraFields = angular.copy($scope.device.extraFields);

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

                            $scope.device.extraFields = result;
                        }, function () {


                        });
                    }
                };
                $scope.UploadFile = {
                    open: function () {

                        var actionConfiguration = $modal.open({
                            templateUrl: 'components/device-devices/add-images-modal/add-images-modal.html',
                            controller: 'AddImagesModalController'

                        });
                        actionConfiguration.result.then(function (result) {
                            for (var i = 0; i < result.length; i++) {
                                $scope.device.images.push(result[i]);
                            }

                        }, function () {

                        });
                    }
                };
                $scope.categorySelected = function () {

                    CategoryCategories.one($scope.device.deviceCategoryId).get({expand: "brands"}).then(function (result) {
                        $scope.brands = result.data.brands;
                    });
                };
                $scope.brandSelected = function () {

                    BrandBrands.one($scope.device.deviceBrandId).get({expand: "products"}).then(function (result) {
                        $scope.products = result.data.products;
                    });
                };
                $scope.productSelected = function () {

                    var index = _.findIndex($scope.products, {id: parseInt($scope.device.deviceProductId) });

                    if (index < 0) {
                        $scope.device.product = {};

                    } else {
                        $scope.device.product = $scope.products[index];

                        $scope.device.extraFields = $scope.device.product.extraFields;
                    }

                };
                //TODO complete this function so that it can find the device extra fields that they did not exist in product extra fields .
                function verifyExtraFieldsFromProduct() {
                    if ($scope.device.product.extraFields) {

                    }
                }

                $scope.saveDevice = function () {
                    delete $scope.device.product;
                    delete $scope.device.brand;
                    delete $scope.device.categoryId;
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