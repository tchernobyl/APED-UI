angular.module('payment-payments')
    .factory('PaymentPayments',
        ['Restangular', function (Restangular) {

            return Restangular.service('payment/payments');
        }]);