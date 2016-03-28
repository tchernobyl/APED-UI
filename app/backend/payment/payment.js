angular.module('backend-module.payment', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.payment', {
            url: '/payment',
            templateUrl: 'backend/payment/payment-module.html'


        })
    }
    ]);
