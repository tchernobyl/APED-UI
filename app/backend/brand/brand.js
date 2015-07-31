angular.module('backend-module.brand', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.brand', {
            url: '/brand',
            templateUrl: 'backend/brand/brand-module.html'


        })
    }
    ]);
