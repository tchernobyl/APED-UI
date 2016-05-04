'use strict';
angular.module('backend-module.country')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.country.list', {
            url: '/list?nameSearch&perPage&page',
            templateUrl: 'backend/country/country-list/country.html',
            controller: 'CountryListController',
            authenticate: true,
            role: "admin",
            resolve: {
                _countrys: [
                    'CountryCountrys', '$stateParams',
                    function (CountryCountrys, $stateParams) {
                        var page = $stateParams.page ? $stateParams.page : 1;
                        var perPage = $stateParams.perPage ? $stateParams.perPage : 4;

                        var FiltersCountrys = {
                            'sort': '-updatedAt',
                            expand: '',
                            'per-page': perPage,
                            page: page
                        };
                        return CountryCountrys.getList(FiltersCountrys);
                    }
                ]
            }
        });
    }])
    .controller('CountryListController',
        ['$scope', '$rootScope', '$modal', '$timeout', '_countrys', 'CountryCountrys',
            function ($scope, $rootScope, $modal, $timeout, _countrys, CountryCountrys) {

                $scope.search = {};
                $scope.countrys = _countrys.data;
                $scope.search.totalItems = _countrys.headers('x-pagination-total-count');
                $scope.search.currentPage = _countrys.headers('x-pagination-current-page');
                $scope.search.itemsPerPage = _countrys.headers('x-pagination-per-page');
                $scope.search.maxPageSize = 4;
                $scope.setPerPage = function (perPage) {
                    $scope.search.itemsPerPage = perPage;
                    goToCountrysList();

                };

                $scope.pageChanged = function () {

                    goToCountrysList()
                };
                function goToCountrysList() {

                    var page = $scope.search.currentPage;
                    var perPage = $scope.search.itemsPerPage;

                    var FiltersCountrys = {
                        'sort': '-updatedAt',
                        expand: '',
                        'per-page': perPage,
                        page: page
                    };


                    CountryCountrys.getList(
                        FiltersCountrys
                    ).then(function (result) {

                        $scope.countrys = result.data;

                        $scope.search.totalItems = result.headers('x-pagination-total-count');
                        $scope.search.currentPage = result.headers('x-pagination-current-page');
                        $scope.search.itemsPerPage = result.headers('x-pagination-per-page');
                        $scope.displayPageBoundaryLinks = Math.ceil($scope.search.totalItems / $scope.search.itemsPerPage) > $scope.search.maxPageSize;

                    });

                }
            }]);