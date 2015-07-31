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
                            return DeviceDevices.one($stateParams.id).get();
                        } else {
                            return {data: DeviceDevices.one()};
                        }

                    }
                ],
                _versions: [
                    'VersionVersions',
                    function (VersionVersions) {
                        return VersionVersions.getList();
                    }
                ]
            }
        });
    }])
    .controller('DeviceEditController',
        ['$scope', '$modal', '$state', '$timeout', '_device', '_versions',
            function ($scope, $modal, $state, $timeout, _device, _versions) {
                $scope.device = _device.data;
                $scope.versions = _versions.data;
                $scope.saveDevice = function () {
                    $scope.device.save().then(function () {

                        $state.go("backend.device.list");
                    }, function () {

                    });
                }


            }]);