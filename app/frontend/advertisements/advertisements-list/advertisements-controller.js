'use strict';
angular.module('frontend-module.advertisements')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.advertisements.list', {
            url: '/list',
            templateUrl: 'frontend/advertisements/advertisements-list/advertisements-list.html',
            controller: 'AdverccsdfController',
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
    .controller('AdverccsdfController',
        ['$scope', '$modal', '$timeout', '_brands',
            function ($scope, $modal, $timeout, _brands) {

                console.log(1121666)
                $scope.brands = _brands.data;

            }]);
