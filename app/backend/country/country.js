angular.module('backend-module.country', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.country', {
            url: '/country',
            templateUrl: 'backend/country/country-module.html'


        })
    }
    ]);
