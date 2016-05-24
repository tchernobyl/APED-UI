angular.module('shipping-shippings')
    .factory('ShippingShippings',
        ['Restangular', function (Restangular) {

            return Restangular.service('shipping/shippings');
        }]);