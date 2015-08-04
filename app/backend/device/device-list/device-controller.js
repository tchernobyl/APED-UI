'use strict';
angular.module('backend-module.device')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.device.list', {
            url: '/list',
            templateUrl: 'backend/device/device-list/device.html',
            controller: 'DeviceListController',
            authenticate: true,
            resolve: {
                _devices: [
                    'DeviceDevices', '$stateParams',
                    function (DeviceDevices, $stateParams) {
                        return DeviceDevices.getList({expand: "product"});
                    }
                ]
            }
        });
    }])
    .controller('DeviceListController',
        ['$scope', '$modal', '$timeout', '_devices',
            function ($scope, $modal, $timeout, _devices) {
                $scope.devices = _devices.data;
                console.log(15151);

            }]);