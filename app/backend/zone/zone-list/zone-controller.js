'use strict';
angular.module('backend-module.zone')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.zone.list', {
            url: '/list?nameSearch&perPage&page',
            templateUrl: 'backend/zone/zone-list/zone.html',
            controller: 'ZoneListController',
            authenticate: true,
            role: "admin",
            resolve: {
                _zones: [
                    'ZoneZones', '$stateParams',
                    function (ZoneZones, $stateParams) {
                        var page = $stateParams.page ? $stateParams.page : 1;
                        var perPage = $stateParams.perPage ? $stateParams.perPage : 4;

                        var FiltersZones = {
                            'sort': '-updatedAt',
                            expand: '',
                            'per-page': perPage,
                            page: page
                        };
                        return ZoneZones.getList(FiltersZones);
                    }
                ]
            }
        });
    }])
    .controller('ZoneListController',
        ['$scope', '$rootScope', '$modal', '$timeout', '_zones', 'ZoneZones',
            function ($scope, $rootScope, $modal, $timeout, _zones, ZoneZones) {

                $scope.search = {};
                $scope.zones = _zones.data;
                $scope.search.totalItems = _zones.headers('x-pagination-total-count');
                $scope.search.currentPage = _zones.headers('x-pagination-current-page');
                $scope.search.itemsPerPage = _zones.headers('x-pagination-per-page');
                $scope.search.maxPageSize = 4;
                $scope.setPerPage = function (perPage) {
                    $scope.search.itemsPerPage = perPage;
                    goToZonesList();

                };

                $scope.pageChanged = function () {

                    goToZonesList()
                };
                function goToZonesList() {

                    var page = $scope.search.currentPage;
                    var perPage = $scope.search.itemsPerPage;

                    var FiltersZones = {
                        'sort': '-updatedAt',
                        expand: '',
                        'per-page': perPage,
                        page: page
                    };


                    ZoneZones.getList(
                        FiltersZones
                    ).then(function (result) {

                        $scope.zones = result.data;

                        $scope.search.totalItems = result.headers('x-pagination-total-count');
                        $scope.search.currentPage = result.headers('x-pagination-current-page');
                        $scope.search.itemsPerPage = result.headers('x-pagination-per-page');
                        $scope.displayPageBoundaryLinks = Math.ceil($scope.search.totalItems / $scope.search.itemsPerPage) > $scope.search.maxPageSize;

                    });

                }
            }]);