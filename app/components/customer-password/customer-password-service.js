angular.module('customer-password')
    .factory('CustomerPassword',
        ['Restangular', function (Restangular) {

            return Restangular.service('customer/portals/password');
        }])

    .factory('CustomerPasswordCustomer',
        ['Restangular', function (Restangular) {

            return Restangular.service('customer/portals/password/customer');
        }]);