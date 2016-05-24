angular.module('backend-module.zone', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.zone', {
            url: '/zone',
            templateUrl: 'backend/zone/zone-module.html'


        })
    }
    ]);
