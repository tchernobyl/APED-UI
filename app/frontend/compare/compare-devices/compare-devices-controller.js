'use strict';
angular.module('frontend-module.compare')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.compare.devices', {
            url: '/devices/{id}?device1&device2&device3&device4',
            templateUrl: 'frontend/compare/compare-devices/compare-devices.html',
            controller: 'compareDevicesController',
            authenticate: true,
            userNotAuthenticated:true,
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
                                'query[1][value]': $stateParams.device1 + ',' + $stateParams.device2 + ',' + $stateParams.device3 + ',' + $stateParams.device4,
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
        ['$scope', '$modal', '$state', '$timeout', '_devices', '_product', 'DeviceDevices',
            function ($scope, $modal, $state, $timeout, _devices, _product, DeviceDevices) {


                $scope.search = {};

                $scope.devicesToCompare = _devices.data;
                $scope.indexDeviceToBeChanged = null;
                $scope.product = _product.data;
                $scope.sizeDiv = 12 / parseInt($scope.devicesToCompare.length);


                $scope.findFieldInDevice = function (name, deviceId) {
                    var indexDevice = _.findIndex($scope.devicesToCompare, {id: parseInt(deviceId)  });
                    if (indexDevice > -1) {
                        var indexField = _.findIndex($scope.devicesToCompare[indexDevice].extraFields, {name: name  });
                        if (indexField > -1) {
                            return {
                                content: $scope.devicesToCompare[indexDevice].extraFields[indexField].content,
                                unit: $scope.devicesToCompare[indexDevice].extraFields[indexField].unit || ""
                            }
                        } else {
                            return {
                                content: "N/A",
                                unit: ""
                            }
                        }
                    } else {
                        return{
                            content: "N/A",
                            unit: ""
                        }
                    }

                };


                $scope.changeDevice = function ($index) {
                    $scope.indexDeviceToBeChanged = $index;

                };

                $scope.productMarketingVaultOptions = {

                    filter: function (product) {

                        if ($scope.product.id == product.id) return false;
                        else return true;
                    },
                    select: function (product) {

                        $state.go(".", {id: product.id})
                        $scope.productMarketingVaultOptions.close();
                    }
                };

                $scope.addDevicesMarketingVaultOptions = {
                    product: $scope.product,
                    filter: function (device) {

                        if (_.find($scope.devicesToCompare, {id: device.id})) return false;
                        else return true;
                    },
                    select: function (device) {

                        if ($scope.devicesToCompare.length < 4) {
                            $scope.devicesToCompare.push(device);
                            $scope.sizeDiv = 12 / parseInt($scope.devicesToCompare.length);
                        }


//                        var params={};
//                      for(var i=1; i<$scope.devicesToCompare.length+1;i++){
//                          params['device'+i]=$scope.devicesToCompare[i-1].id;
//
//                      }
//
//                        params.id=$scope.product.id;


                        $scope.addDevicesMarketingVaultOptions.close();
                    }
                };

                $scope.deleteDevice = function ($index) {

                    $scope.devicesToCompare.splice($index, 1);
                    $scope.sizeDiv = 12 / parseInt($scope.devicesToCompare.length);

                }

            }]);