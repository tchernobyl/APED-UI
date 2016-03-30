'use strict';
angular.module('backend-module.shipping')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.shipping.list', {
            url: '/list?nameSearch&perPage&page',
            templateUrl: 'backend/shipping/shipping-list/shipping.html',
            controller: 'ShippingListController',
            authenticate: true,
            resolve: {
                _shippings: [
                    'ShippingShippings', '$stateParams',
                    function (ShippingShippings, $stateParams) {
                        var page = $stateParams.page ? $stateParams.page : 1;
                        var perPage = $stateParams.perPage ? $stateParams.perPage : 4;

                        var FiltersShippings = {
                            'sort': '-updatedAt',
                            expand: '',
                            'per-page': perPage,
                            page: page
                        };
                        return ShippingShippings.getList(FiltersShippings);
                    }
                ]
            }
        });
    }])
    .controller('ShippingListController',
        ['$scope', '$rootScope', '$modal', '$timeout', '_shippings', 'ShippingShippings',
            function ($scope, $rootScope, $modal, $timeout, _shippings, ShippingShippings) {

                $scope.search = {};
                $scope.shippings = _shippings.data;
                $scope.search.totalItems = _shippings.headers('x-pagination-total-count');
                $scope.search.currentPage = _shippings.headers('x-pagination-current-page');
                $scope.search.itemsPerPage = _shippings.headers('x-pagination-per-page');
                $scope.search.maxPageSize = 4;
                $scope.setPerPage = function (perPage) {
                    $scope.search.itemsPerPage = perPage;
                    goToShippingsList();

                };

                $scope.pageChanged = function () {

                    goToShippingsList()
                };
                function goToShippingsList() {

                    var page = $scope.search.currentPage;
                    var perPage = $scope.search.itemsPerPage;

                    var FiltersShippings = {
                        'sort': '-updatedAt',
                        expand: '',
                        'per-page': perPage,
                        page: page
                    };


                    ShippingShippings.getList(
                        FiltersShippings
                    ).then(function (result) {

                        $scope.shippings = result.data;

                        $scope.search.totalItems = result.headers('x-pagination-total-count');
                        $scope.search.currentPage = result.headers('x-pagination-current-page');
                        $scope.search.itemsPerPage = result.headers('x-pagination-per-page');
                        $scope.displayPageBoundaryLinks = Math.ceil($scope.search.totalItems / $scope.search.itemsPerPage) > $scope.search.maxPageSize;

                    });

                }
            }]);