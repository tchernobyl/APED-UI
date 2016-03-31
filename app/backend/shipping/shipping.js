angular.module('backend-module.shipping', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.shipping', {
            url: '/shipping',
            templateUrl: 'backend/shipping/shipping-module.html'


        })
    }
    ]);
