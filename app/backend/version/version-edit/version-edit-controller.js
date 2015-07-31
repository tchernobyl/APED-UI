'use strict';
angular.module('backend-module.version')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.version.edit', {
            url: '/edit/{id:[0-9]*}',
            templateUrl: 'backend/version/version-edit/version-edit.html',
            controller: 'VersionEditController',
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
    .controller('VersionEditController',
        ['$scope', '$modal', '$state', '$timeout', '_version', '_brands',
            function ($scope, $modal, $state, $timeout, _version, _brands) {
                $scope.version = _version.data;
                $scope.brands = _brands.data;
                $scope.saveVersion = function () {
                    $scope.version.save().then(function () {

                        $state.go("backend.version.list");
                    }, function () {

                    });
                }


            }]);