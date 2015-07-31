angular.module('brand-brands')
    .factory('BrandBrands',
        ['Restangular', function (Restangular) {

            return Restangular.service('brand/brands');
        }]);