'use strict';
angular.module('frontend-module.advertisements')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.advertisements.list', {
            url: '/list?nameSearch&perPage&page&deviceId',
            templateUrl: 'frontend/advertisements/advertisements-list/advertisements-list.html',
            controller: 'AdvertisementsController',
            authenticate: true,
            userNotAuthenticated:true,
            resolve: {

                _announcementsList: [
                    'ContentContents', '$stateParams',
                    function (ContentContents, $stateParams) {
                        var page = $stateParams.page ? $stateParams.page : 1;
                        var perPage = $stateParams.perPage ? $stateParams.perPage : 3;

                        var FiltersInstantSearch = {
                            'sort': '-updatedAt',
                            expand: 'user,items,context',
                            'per-page': perPage,
                            page: page
                        };
                        if ($stateParams.deviceId) {


                            FiltersInstantSearch = $.extend(FiltersInstantSearch,
                                {
                                    'query[1][type]': "eq",
                                    'query[1][field]': "deviceId",
                                    'query[1][value]': $stateParams.deviceId
                                }
                            );
                        }
                        if ($stateParams.nameSearch) {


                            FiltersInstantSearch = $.extend(FiltersInstantSearch,
                                {
                                    'query[2][type]': "like",
                                    'query[2][field]': "name",
                                    'query[2][value]': $stateParams.nameSearch
                                }
                            );
                        }
                        return ContentContents.getList(
                            FiltersInstantSearch
                        );
                    }
                ],
                _devicesList: [
                    'DeviceDevices',
                    function (DeviceDevices) {
                        return DeviceDevices.getList(

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
    .controller('AdvertisementsController',
        ['$scope', '$modal', '$timeout', '_announcementsList',
            '_categoriesList', '$stateParams', '$state', '_devicesList',
            'BrandBrands', 'ProductProducts', 'DeviceDevices', 'CategoryCategories', 'ContentContents', 'growl', 'ListControllerFactory'
            , function ($scope, $modal, $timeout, _announcementsList, _categoriesList, $stateParams, $state, _devicesList, BrandBrands, ProductProducts, DeviceDevices, CategoryCategories, ContentContents, growl, ListControllerFactory) {


            $scope.search = {};
            $scope.announcementsList = _announcementsList.data;
            $scope.search.totalItems = _announcementsList.headers('x-pagination-total-count');
            $scope.search.currentPage = _announcementsList.headers('x-pagination-current-page');
            $scope.search.itemsPerPage = _announcementsList.headers('x-pagination-per-page');
            $scope.search.maxPageSize = 3;


            $scope.brandsList = [];
            $scope.categoriesList = _categoriesList.data;

            $scope.devicesList = [];
            $scope.setPerPage = function (perPage) {
                $scope.search.itemsPerPage = perPage;
                goToAdvertisementsList();

            };
            $scope.pageChanged = function () {

                goToAdvertisementsList()
            };


            $scope.updateBrands = function () {

                CategoryCategories.one($scope.search.categoryId).get({expand: "brands"}).then(function (result) {

                    $scope.brandsList = result.data.brands;
                    $scope.productsList = [];
                    $scope.devicesList = [];
                })
            };
            $scope.updateProducts = function () {

                BrandBrands.one($scope.search.brandId).get({expand: "products"}).then(function (result) {

                    $scope.productsList = result.data.products;
                    $scope.devicesList = [];
                })
            };

            $scope.updateDevices = function () {

                var filterDevicesList = {};
                if ($scope.search.productId) {
                    filterDevicesList = $.extend(filterDevicesList,
                        {
                            'query[1][type]': "eq",
                            'query[1][field]': "device_product_id",
                            'query[1][value]': $scope.search.productId
                        }
                    );
                }
                if ($scope.search.brandId) {
                    filterDevicesList = $.extend(filterDevicesList,
                        {
                            'query[2][type]': "eq",
                            'query[2][field]': "device_brand_id",
                            'query[2][value]': $scope.search.brandId
                        }
                    );
                }
                DeviceDevices.getList(filterDevicesList).then(function (result) {

                    $scope.devicesList = result.data;
                })
            };
            $scope.updateContent = function () {

                goToAdvertisementsList();
            };
            if ($stateParams.nameSearch) {
                $scope.search.nameSearch = $stateParams.nameSearch;
            } else {
                $scope.search.nameSearch = null;
            }
            if ($stateParams.deviceId) {
                $scope.search.deviceId = $stateParams.deviceId;
            } else {
                $scope.search.deviceId = null;
            }
            $scope.instantSearch = function (tmpStr) {


                setTimeout(function () {

                    if ((tmpStr == $scope.search.nameSearch)) {
                        $scope.search.nameSearch = tmpStr;
                        goToAdvertisementsList();
                    }

                }, 250);
            };
            $scope.selectSelect = function () {

                goToAdvertisementsList();
            };
            $scope.clearSearchFields = function () {
                $scope.search.nameSearch = null;
                $scope.search.deviceId = null;
                $scope.search.brandId = null;
                $scope.search.categoryId = null;
                $scope.search.productId = null;
                $scope.brandsList = [];
                $scope.productsList = [];
                $scope.devicesList = [];
                $scope.instantSearch();
            };
            function goToAdvertisementsList() {
                var page = $scope.search.currentPage;
                var perPage = $scope.search.itemsPerPage;

                var FiltersInstantSearch = {
                    'sort': '-updatedAt',
                    expand: 'user,items,context',
                    'per-page': perPage,
                    page: page
                };
                if ($scope.search.deviceId) {


                    FiltersInstantSearch = $.extend(FiltersInstantSearch,
                        {
                            'query[1][type]': "eq",
                            'query[1][field]': "deviceId",
                            'query[1][value]': $scope.search.deviceId
                        }
                    );
                }
                if ($scope.search.nameSearch) {


                    FiltersInstantSearch = $.extend(FiltersInstantSearch,
                        {
                            'query[2][type]': "like",
                            'query[2][field]': "name",
                            'query[2][value]': $scope.search.nameSearch
                        }
                    );
                }

                ContentContents.getList(
                        FiltersInstantSearch
                    ).then(function (result) {

                        $scope.announcementsList = result.data;
                        $scope.search.totalItems = result.headers('x-pagination-total-count');
                        $scope.search.currentPage = result.headers('x-pagination-current-page');
                        $scope.search.itemsPerPage = result.headers('x-pagination-per-page');
                        $scope.displayPageBoundaryLinks = Math.ceil($scope.search.totalItems / $scope.search.itemsPerPage) > $scope.search.maxPageSize;

                    });

            }


        }]);
