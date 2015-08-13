'use strict';
angular.module('frontend-module.devices')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.devices.view', {
            url: '/view/{id:[0-9]*}',
            templateUrl: 'frontend/devices/devices-view/devices-view.html',
            controller: 'DevicesViewController',
            authenticate: true,
            resolve: {
                _device: [
                    'DeviceDevices', '$stateParams', '$state',
                    function (DeviceDevices, $stateParams, $state) {
                        if ($stateParams.id) {
                            return DeviceDevices.one($stateParams.id).get({expand: ''});
                        } else {
                            $state._stop();
                            return false;
                        }

                    }
                ]


            }
        });
    }])
    .controller('DevicesViewController',
        ['$scope', '$modal', '$state', '$timeout', '_device',
            function ($scope, $modal, $state, $timeout, _device) {

                $scope.device = _device.data;


            }]);