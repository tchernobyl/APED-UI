angular.module('device-devices')
    .factory('DeviceDevices',
        ['Restangular', function (Restangular) {

            return Restangular.service('device/devices');
        }]);