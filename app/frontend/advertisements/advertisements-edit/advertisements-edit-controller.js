'use strict';
angular.module('frontend-module.advertisements')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.advertisements.edit', {
            url: '/edit/{id:[0-9]*}',
            templateUrl: 'frontend/advertisements/advertisements-edit/advertisements-edit.html',
            controller: 'AdvertisementsEditController',
            authenticate: true,
            resolve: {
                _version: [
                    'VersionVersions', '$stateParams',
                    function (VersionVersions, $stateParams) {
                        if ($stateParams.id) {
                            return VersionVersions.one($stateParams.id).get();
                        } else {
                            return {data: VersionVersions.one()};
                        }

                    }
                ],
                _brands: [
                    'BrandBrands',
                    function (BrandBrands) {
                        return BrandBrands.getList();
                    }
                ]
            }
        });
    }])
    .controller('AdvertisementsEditController',
        ['$scope', '$modal', '$state', '$timeout', '_version', '_brands',
            function ($scope, $modal, $state, $timeout, _version, _brands) {
                $scope.version = _version.data;
                $scope.brands = _brands.data;


            }]);