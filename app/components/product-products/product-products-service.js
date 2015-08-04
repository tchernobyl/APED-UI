angular.module('product-products')
    .factory('ProductProducts',
        ['Restangular', function (Restangular) {

            return Restangular.service('product/products');
        }]);