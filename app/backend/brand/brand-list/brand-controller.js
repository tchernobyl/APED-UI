'use strict';
angular.module('backend-module.brand')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.brand.list', {
            url: '/list',
            templateUrl: 'backend/brand/brand-list/brand.html',
            controller: 'BrandListController',
            authenticate: true,
            resolve: {
                _brands: [
                    'BrandBrands', '$stateParams',
                    function (BrandBrands, $stateParams) {
                        return BrandBrands.getList();
                    }
                ]
            }
        });
    }])
    .controller('BrandListController',
        ['$scope', '$modal', '$timeout', '_brands',
            function ($scope, $modal, $timeout, _brands) {
                $scope.brands = _brands.data;


            }]);