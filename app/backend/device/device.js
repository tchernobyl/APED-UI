angular.module('backend-module.device', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.device', {
            url: '/device',
            templateUrl: 'backend/device/device-module.html'


        })
    }
    ]);
