'use strict';
angular.module('frontend-module.products')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.products.view', {
            url: '/view/{id:[0-9]*}?brand_id',
            templateUrl: 'frontend/products/products-view/products-view.html',
            controller: 'ProductsViewController',
            userNotAuthenticated:true,
            resolve: {
                _product: [
                    'ProductProducts', '$stateParams', '$state',
                    function (ProductProducts, $stateParams, $state) {
                        if ($stateParams.id) {
                            return ProductProducts.one($stateParams.id).get({expand: 'brands,devices'});
                        } else {
                            $state._stop();
                            return false;
                        }

                    }
                ],
                _brand: [
                    'BrandBrands', '$stateParams', '$state',
                    function (BrandBrands, $stateParams, $state) {
                        if ($stateParams.brand_id) {
                            return BrandBrands.one($stateParams.brand_id).get();
                        } else {
                            var brand = {data: BrandBrands.one()};
                            brand.test = {};
                            return  brand;
                        }

                    }
                ],
                _devices: [
                    'DeviceDevices', '$stateParams', '$state',
                    function (DeviceDevices, $stateParams, $state) {

                        if ($stateParams.id) {
                            var FiltersSearch = {
                                'sort': '-updatedAt',
                                expand: '',
                                'per-page': 6,
                                page: 1,
                                'query[1][type]': "eq",
                                'query[1][field]': "device_product_id",
                                'query[1][value]': $stateParams.id
                            };
                            if ($stateParams.brand_id) {
                                FiltersSearch = $.extend(FiltersSearch,
                                    {
                                        'query[2][type]': "eq",
                                        'query[2][field]': "device_brand_id",
                                        'query[2][value]': $stateParams.brand_id
                                    }
                                );
                            }

                            return DeviceDevices.getList(
                                FiltersSearch
                            );
                        } else {
                            $state._stop();
                            return false;
                        }
                    }
                ]
            }
        });
    }])
    .controller('ProductsViewController',
        ['$scope', '$modal', '$state', '$timeout', '_product', '_devices', '_brand', 'DeviceDevices',
            function ($scope, $modal, $state, $timeout, _product, _devices, _brand, DeviceDevices) {

                $scope.devicesToCompare = [];

                $scope.product = _product.data;
                $scope.brand = _brand.data;
                $scope.relatedDevices = _devices.data;

                $scope.search = {};

                $scope.search.totalItems = _devices.headers('x-pagination-total-count');
                $scope.search.currentPage = _devices.headers('x-pagination-current-page');
                $scope.search.itemsPerPage = _devices.headers('x-pagination-per-page');
                $scope.search.maxPageSize = 34;

                $scope.compareDevice = function (device) {
                    console.log(device.images);
                    if ($scope.devicesToCompare.length < 2) {
                        $scope.devicesToCompare.push(device)
                    } else {
                        $scope.devicesToCompare[0] = $scope.devicesToCompare[1];
                        $scope.devicesToCompare[1] = device;
                    }
                };
                $scope.setPerPage = function (perPage) {
                    $scope.search.itemsPerPage = perPage;
                    goToDevicesList();

                };


                $scope.instantSearch = function (tmpStr) {


                    setTimeout(function () {

                        if ((tmpStr == $scope.search.nameSearch)) {
                            $scope.search.nameSearch = tmpStr;
                            goToDevicesList();
                        }

                    }, 250);
                };
                $scope.updateContent = function () {

                    goToDevicesList();
                };
                $scope.pageChanged = function () {

                    goToDevicesList()
                };

                $scope.selectSelect = function () {


                    goToDevicesList();
                };
                $scope.clearSearchFields = function () {
                    $scope.search.nameSearch = null;

                    $scope.search.brandId = null;
                    $scope.search.categoryId = null;

                    $scope.brandsList = [];
                    $scope.productsList = [];

                    $scope.instantSearch();
                };
                function goToDevicesList() {
                    var page = $scope.search.currentPage;
                    var perPage = $scope.search.itemsPerPage;

                    var FiltersInstantSearch = {
                        'sort': '-updatedAt',
                        expand: '',
                        'per-page': perPage,
                        page: page,
                        'query[1][type]': "eq",
                        'query[1][field]': "device_product_id",
                        'query[1][value]': $scope.product.id
                    };


                    if ($scope.brand.id) {


                        FiltersInstantSearch = $.extend(FiltersInstantSearch,
                            {
                                'query[2][type]': "eq",
                                'query[2][field]': "device_brand_id",
                                'query[2][value]': $scope.brand.id
                            }
                        );
                    }
                    DeviceDevices.getList(
                            FiltersInstantSearch
                        ).then(function (result) {

                            $scope.relatedDevices = result.data;

                            $scope.search = {};

                            $scope.search.totalItems = result.headers('x-pagination-total-count');
                            $scope.search.currentPage = result.headers('x-pagination-current-page');
                            $scope.search.itemsPerPage = result.headers('x-pagination-per-page');
                            $scope.search.maxPageSize = 34;
                            $scope.displayPageBoundaryLinks = Math.ceil($scope.search.totalItems / $scope.search.itemsPerPage) > $scope.search.maxPageSize;

                        });

                }

            }]);