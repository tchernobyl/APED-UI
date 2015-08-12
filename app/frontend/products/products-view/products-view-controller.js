'use strict';
angular.module('frontend-module.products')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.products.view', {
            url: '/view/{id:[0-9]*}?brand_id',
            templateUrl: 'frontend/products/products-view/products-view.html',
            controller: 'ProductsViewController',
            authenticate: true,
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
        ['$scope', '$modal', '$state', '$timeout', '_product', '_devices', '_brand',
            function ($scope, $modal, $state, $timeout, _product, _devices, _brand) {

                $scope.product = _product.data;
                $scope.relatedDevices = _devices.data;
                $scope.brand = _brand.data;

            }]);