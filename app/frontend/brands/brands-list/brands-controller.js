'use strict';
angular.module('frontend-module.brands')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.brands.list', {
            url: '/list?nameSearch&perPage&page&deviceId',
            templateUrl: 'frontend/brands/brands-list/brands-list.html',
            controller: 'BrandsController',
            authenticate: true,
            resolve: {

                _brandsList: [
                    'BrandBrands', '$stateParams',
                    function (BrandBrands, $stateParams) {
                        var page = $stateParams.page ? $stateParams.page : 1;
                        var perPage = $stateParams.perPage ? $stateParams.perPage : 4;

                        var FiltersInstantSearch = {
                            'sort': '-updatedAt',
                            expand: 'user,items,context',
                            'per-page': perPage,
                            page: page
                        };


                        return BrandBrands.getList(
                            FiltersInstantSearch
                        );
                    }
                ],

                _categoriesList: [
                    'CategoryCategoriesFormatted',
                    function (CategoryCategoriesFormatted) {
                        return CategoryCategoriesFormatted.getList(

                        );
                    }
                ]
            }
        });
    }])
    .controller('BrandsController',
        ['$scope', '$modal', '$timeout', '_brandsList',
            '_categoriesList', '$stateParams', '$state',
            'BrandBrands', 'CategoryCategories', 'growl', 'ListControllerFactory'
            , function ($scope, $modal, $timeout, _brandsList, _categoriesList, $stateParams, $state, BrandBrands, CategoryCategories, growl, ListControllerFactory) {


            $scope.search = {};
            $scope.brandsList = _brandsList.data;
            $scope.search.totalItems = _brandsList.headers('x-pagination-total-count');
            $scope.search.currentPage = _brandsList.headers('x-pagination-current-page');
            $scope.search.itemsPerPage = _brandsList.headers('x-pagination-per-page');
            $scope.search.maxPageSize = 4;


            $scope.categoriesList = _categoriesList.data;


            $scope.setPerPage = function (perPage) {
                $scope.search.itemsPerPage = perPage;
                goToBrandsList();

            };
            $scope.pageChanged = function () {

                goToBrandsList()
            };


            growl.addSuccessMessage("ddd" + ' has been cloned successfully.');

            $scope.updateProducts = function () {

                BrandBrands.one($scope.search.brandId).get({expand: "products"}).then(function (result) {

                    $scope.productsList = result.data.products
                })
            };


            if ($stateParams.nameSearch) {
                $scope.search.nameSearch = $stateParams.nameSearch;
            } else {
                $scope.search.nameSearch = null;
            }

            $scope.instantSearch = function (tmpStr) {


                setTimeout(function () {

                    if ((tmpStr == $scope.search.nameSearch)) {
                        $scope.search.nameSearch = tmpStr;
                        goToBrandsList();
                    }

                }, 250);
            };
            $scope.selectSelect = function () {

                goToBrandsList();
            };
            $scope.clearSearchFields = function () {
                $scope.search.nameSearch = null;

                $scope.search.brandId = null;
                $scope.search.categoryId = null;
                $scope.brandsList = [];
                $scope.productsList = [];
                $scope.devicesList = [];
                $scope.instantSearch();
            };
            $scope.findBrandsByCategory = function () {
                goToBrandsList();
            };
            function goToBrandsList() {

                var page = $scope.search.currentPage;
                var perPage = $scope.search.itemsPerPage;

                var FiltersInstantSearch = {
                    'sort': '-updatedAt',
                    expand: 'user,items,context',
                    'per-page': perPage,
                    page: page
                };

                if ($scope.search.nameSearch) {


                    FiltersInstantSearch = $.extend(FiltersInstantSearch,
                        {
                            'query[2][type]': "like",
                            'query[2][field]': "name",
                            'query[2][value]': $scope.search.nameSearch
                        }
                    );
                }
                if ($scope.search.categoryId) {

                    FiltersInstantSearch = $.extend(FiltersInstantSearch,
                        {
                            'query[1][type]': "HasMany",
                            'query[1][field]': "categories",
                            'query[1][value]': $scope.search.categoryId
                        }
                    );

                }

                BrandBrands.getList(
                        FiltersInstantSearch
                    ).then(function (result) {

                        $scope.brandsList = result.data;

                        $scope.search.totalItems = result.headers('x-pagination-total-count');
                        $scope.search.currentPage = result.headers('x-pagination-current-page');
                        $scope.search.itemsPerPage = result.headers('x-pagination-per-page');
                        $scope.displayPageBoundaryLinks = Math.ceil($scope.search.totalItems / $scope.search.itemsPerPage) > $scope.search.maxPageSize;

                    });

            }


        }]);
