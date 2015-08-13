angular.module('frontend-module.devices', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.devices', {
            url: '/devices',
            templateUrl: 'frontend/devices/devices.html'


        });
    }]);
