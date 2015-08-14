'use strict';
angular.module('frontend-module.products')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.products.list', {
            url: '/list?nameSearch&perPage&page',
            templateUrl: 'frontend/products/products-list/products-list.html',
            controller: 'ProductsController',
            authenticate: true,
            resolve: {

                _productsList: [
                    'ProductProducts', '$stateParams',
                    function (ProductProducts, $stateParams) {
                        var page = $stateParams.page ? $stateParams.page : 1;
                        var perPage = $stateParams.perPage ? $stateParams.perPage : 4;

                        var FiltersInstantSearch = {
                            'sort': '-updatedAt',
                            expand: '',
                            'per-page': perPage,
                            page: page
                        };
                        return ProductProducts.getList(
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
    .controller('ProductsController',
        ['$scope', '$modal', '$timeout', '_productsList',
            '_categoriesList', '$stateParams', '$state',
            'BrandBrands', 'ProductProducts', 'CategoryCategories',
            'ContentContents', 'growl', 'ListControllerFactory'
            , function ($scope, $modal, $timeout, _productsList, _categoriesList, $stateParams, $state, BrandBrands, ProductProducts, CategoryCategories, ContentContents, growl, ListControllerFactory) {
            $scope.categoriesList = _categoriesList.data;
            $scope.productsList = _productsList.data;
            $scope.search = {};

            $scope.search.totalItems = _productsList.headers('x-pagination-total-count');
            $scope.search.currentPage = _productsList.headers('x-pagination-current-page');
            $scope.search.itemsPerPage = _productsList.headers('x-pagination-per-page');
            $scope.search.maxPageSize = 34;

            $scope.updateBrands = function () {

                CategoryCategories.one($scope.search.categoryId).get({expand: "brands"}).then(function (result) {

                    $scope.brandsList = result.data.brands

                })
            };
            $scope.setPerPage = function (perPage) {
                $scope.search.itemsPerPage = perPage;
                goToProductsList();

            };
            $scope.instantSearch = function (tmpStr) {


                setTimeout(function () {

                    if ((tmpStr == $scope.search.nameSearch)) {
                        $scope.search.nameSearch = tmpStr;
                        goToProductsList();
                    }

                }, 250);
            };
            $scope.updateContent = function () {

                goToProductsList();
            };
            $scope.pageChanged = function () {

                goToProductsList()
            };

            $scope.selectSelect = function () {


                goToProductsList();
            };
            $scope.clearSearchFields = function () {
                $scope.search.nameSearch = null;

                $scope.search.brandId = null;
                $scope.search.categoryId = null;

                $scope.brandsList = [];
                $scope.productsList = [];

                $scope.instantSearch();
            };

            function goToProductsList() {
                var page = $scope.search.currentPage;
                var perPage = $scope.search.itemsPerPage;

                var FiltersInstantSearch = {
                    'sort': '-updatedAt',
                    expand: '',
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
                if ($scope.search.brandId) {


                    FiltersInstantSearch = $.extend(FiltersInstantSearch,
                        {
                            'query[3][type]': "HasMany",
                            'query[3][field]': "brands",
                            'query[3][value]': $scope.search.brandId
                        }
                    );
                }
                ProductProducts.getList(
                        FiltersInstantSearch
                    ).then(function (result) {

                        $scope.productsList = result.data;
                        $scope.search.totalItems = result.headers('x-pagination-total-count');
                        $scope.search.currentPage = result.headers('x-pagination-current-page');
                        $scope.search.itemsPerPage = result.headers('x-pagination-per-page');
                        $scope.displayPageBoundaryLinks = Math.ceil($scope.search.totalItems / $scope.search.itemsPerPage) > $scope.search.maxPageSize;

                    });

            }


        }]);
