'use strict';
angular.module('backend-module.device')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.device.list', {
            url: '/list',
            templateUrl: 'backend/device/device-list/device.html',
            controller: 'DeviceListController',
            authenticate: true,
            role: "admin",
            resolve: {
                _devices: [
                    'DeviceDevices', '$stateParams',
                    function (DeviceDevices, $stateParams) {
                        var page = $stateParams.page ? $stateParams.page : 1;
                        var perPage = $stateParams.perPage ? $stateParams.perPage : 4;

                        var FiltersDevices = {
                            'sort': '-updatedAt',
                            expand: 'product',
                            'per-page': perPage,
                            page: page
                        };
                        return DeviceDevices.getList(FiltersDevices);
                    }
                ]
            }
        });
    }])
    .controller('DeviceListController',
        ['$scope', '$modal', '$timeout', '_devices', 'DeviceDevices',
            function ($scope, $modal, $timeout, _devices, DeviceDevices) {
                $scope.devices = _devices.data;
                $scope.search = {};

                $scope.search.totalItems = _devices.headers('x-pagination-total-count');
                $scope.search.currentPage = _devices.headers('x-pagination-current-page');
                $scope.search.itemsPerPage = _devices.headers('x-pagination-per-page');
                $scope.search.maxPageSize = 4;
                $scope.setPerPage = function (perPage) {
                    $scope.search.itemsPerPage = perPage;
                    goToDevicesList();

                };
                $scope.pageChanged = function () {

                    goToDevicesList()
                };
                function goToDevicesList() {

                    var page = $scope.search.currentPage;
                    var perPage = $scope.search.itemsPerPage;

                    var FiltersDevices = {
                        'sort': '-updatedAt',
                        expand: '',
                        'per-page': perPage,
                        page: page
                    };


                    DeviceDevices.getList(
                            FiltersDevices
                        ).then(function (result) {

                            $scope.devices = result.data;

                            $scope.search.totalItems = result.headers('x-pagination-total-count');
                            $scope.search.currentPage = result.headers('x-pagination-current-page');
                            $scope.search.itemsPerPage = result.headers('x-pagination-per-page');
                            $scope.displayPageBoundaryLinks = Math.ceil($scope.search.totalItems / $scope.search.itemsPerPage) > $scope.search.maxPageSize;

                        });

                }

            }]);