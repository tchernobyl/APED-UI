'use strict';
angular.module('backend-module.product')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('backend.product.list', {
            url: '/list',
            templateUrl: 'backend/product/product-list/product.html',
            controller: 'ProductListController',
            authenticate: true,
            resolve: {
                _products: [
                    'ProductProducts', '$stateParams',
                    function (ProductProducts, $stateParams) {
                        var page = $stateParams.page ? $stateParams.page : 1;
                        var perPage = $stateParams.perPage ? $stateParams.perPage : 4;

                        var FiltersProduct = {
                            'sort': '-updatedAt',
                            expand: 'brand',
                            'per-page': perPage,
                            page: page
                        };
                        return ProductProducts.getList(FiltersProduct);
                    }
                ]
            }
        });
    }])
    .controller('ProductListController',
        ['$scope', '$modal', '$timeout', '_products', 'ProductProducts',
            function ($scope, $modal, $timeout, _products, ProductProducts) {
                $scope.products = _products.data;
                $scope.search = {};

                $scope.search.totalItems = _products.headers('x-pagination-total-count');
                $scope.search.currentPage = _products.headers('x-pagination-current-page');
                $scope.search.itemsPerPage = _products.headers('x-pagination-per-page');
                $scope.search.maxPageSize = 4;
                $scope.setPerPage = function (perPage) {
                    $scope.search.itemsPerPage = perPage;
                    goToProductsList();

                };
                $scope.pageChanged = function () {

                    goToProductsList()
                };
                function goToProductsList() {

                    var page = $scope.search.currentPage;
                    var perPage = $scope.search.itemsPerPage;

                    var FiltersDevices = {
                        'sort': '-updatedAt',
                        expand: '',
                        'per-page': perPage,
                        page: page
                    };


                    ProductProducts.getList(
                            FiltersDevices
                        ).then(function (result) {

                            $scope.products = result.data;

                            $scope.search.totalItems = result.headers('x-pagination-total-count');
                            $scope.search.currentPage = result.headers('x-pagination-current-page');
                            $scope.search.itemsPerPage = result.headers('x-pagination-per-page');
                            $scope.displayPageBoundaryLinks = Math.ceil($scope.search.totalItems / $scope.search.itemsPerPage) > $scope.search.maxPageSize;

                        });

                }

            }]);