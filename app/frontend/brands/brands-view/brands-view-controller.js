'use strict';
angular.module('frontend-module.brands')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.brands.view', {
            url: '/view/{id:[0-9]*}',
            templateUrl: 'frontend/brands/brands-view/brands-view.html',
            controller: 'BrandsViewController',
            authenticate: true,
            resolve: {
                _brand: [
                    'BrandBrands', '$stateParams', '$state',
                    function (BrandBrands, $stateParams, $state) {
                        if ($stateParams.id) {
                            return BrandBrands.one($stateParams.id).get({expand: 'products'});
                        } else {
                            $state._stop();
                            return false;
                        }

                    }
                ],
                _brandProducts: [
                    'ProductProducts', '$stateParams', '$state',
                    function (ProductProducts, $stateParams, $state) {
                        if ($stateParams.id) {
                            return ProductProducts.getList({
                                'sort': '-updatedAt',
                                expand: '',
                                'per-page': 4,
                                page: 1,
                                'query[3][type]': "HasMany",
                                'query[3][field]': "brands",
                                'query[3][value]': $stateParams.id
                            });
                        } else {
                            $state._stop();
                            return false;
                        }

                    }
                ],
                _devices: [
                    'DeviceDevices', '$stateParams', '$state',
                    function (DeviceDevices, $stateParams, $state) {
                        if ($stateParams.id) {
                            return DeviceDevices.getList(
                                {

                                }
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
    .controller('BrandsViewController',
        ['$scope', '$modal', '$state', '$timeout', '_brand', '_brandProducts',
            function ($scope, $modal, $state, $timeout, _brand, _brandProducts) {

                $scope.brand = _brand.data;
                $scope.brandProducts = _brandProducts.data;

            }]);