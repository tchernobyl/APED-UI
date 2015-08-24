'use strict';
angular.module('frontend-module.compare')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.compare.devices', {
            url: '/devices/{id}?device1&device2&device3',
            templateUrl: 'frontend/compare/compare-devices/compare-devices.html',
            controller: 'compareDevicesController',
            authenticate: true,
            resolve: {
                _product: [
                    'ProductProducts', '$stateParams', '$state',
                    function (ProductProducts, $stateParams, $state) {

                        return ProductProducts.one($stateParams.id).get();

                    }

                ],
                _devices: [
                    'DeviceDevices', '$stateParams', '$state',
                    function (DeviceDevices, $stateParams, $state) {

                        return DeviceDevices.getList(

                            {
                                'query[1][type]': "in",
                                'query[1][field]': "id",
                                'query[1][value]': $stateParams.device1 + ',' + $stateParams.device2 + ',' + $stateParams.device3,
                                'query[2][type]': "eq",
                                'query[2][field]': "deviceProductId",
                                'query[2][value]': $stateParams.id
                            }
                        );


                    }
                ]



            }
        });
    }])
    .controller('compareDevicesController',
        ['$scope', '$modal', '$state', '$timeout', '_devices', '_product',
            function ($scope, $modal, $state, $timeout, _devices, _product) {

                $scope.devicesToCompare = _devices.data;

                $scope.product = _product.data;
                $scope.sizeDiv = 12 / parseInt($scope.devicesToCompare.length);
                $scope.findFieldInDevice = function (name, deviceId) {
                    var indexDevice = _.findIndex($scope.devicesToCompare, {id: parseInt(deviceId)  });
                    if (indexDevice > -1) {
                        var indexField = _.findIndex($scope.devicesToCompare[indexDevice].extraFields, {name: name  });
                        if (indexField > -1) {
                            return $scope.devicesToCompare[indexDevice].extraFields[indexField].content;
                        } else {
                            return "N/A"
                        }
                    } else {
                        return "N/A"
                    }

                }

            }]);