angular.module('category-categories')
    .factory('CategoryCategories',
        ['Restangular', function (Restangular) {

            return Restangular.service('category/categories');
        }])
    .factory('CategoryCategoriesFormatted',
        ['Restangular', function (Restangular) {

            return Restangular.service('category/categories/formatted');
        }]);