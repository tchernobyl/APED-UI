'use strict';
angular.module('backend-module.category')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.category.list', {
            url: '/list',
            templateUrl: 'backend/category/category-list/category.html',
            controller: 'CategoryListController',
            authenticate: true,
            resolve: {
                _categories: [
                    'CategoryCategories', '$stateParams',
                    function (CategoryCategories, $stateParams) {
                        return CategoryCategories.getList();
                    }
                ]
            }
        });
    }])
    .controller('CategoryListController',
        ['$scope', '$modal', '$timeout', '_categories',
            function ($scope, $modal, $timeout, _categories) {
                $scope.categories = _categories.data;


            }]);