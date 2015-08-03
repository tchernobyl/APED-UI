'use strict';
angular.module('frontend-module.advertisements')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.advertisements.list', {
            url: '/list?nameSearch&perPage&page&deviceId',
            templateUrl: 'frontend/advertisements/advertisements-list/advertisements-list.html',
            controller: 'AdvertisementsController',
            authenticate: true,
            resolve: {

                _announcementsList: [
                    'ContentContents', '$stateParams',
                    function (ContentContents, $stateParams) {
                        var page = $stateParams.page ? $stateParams.page : 1;
                        var perPage = $stateParams.perPage ? $stateParams.perPage : 10;

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
            'BrandBrands', 'VersionVersions', 'DeviceDevices', 'CategoryCategories'
            , function ($scope, $modal, $timeout, _announcementsList, _categoriesList, $stateParams, $state, _devicesList, BrandBrands, VersionVersions, DeviceDevices, CategoryCategories) {
            $scope.brandsList = [];
            $scope.categoriesList = _categoriesList.data;
            $scope.announcementsList = _announcementsList.data;
            $scope.devicesList = _devicesList.data;
            $scope.search = {};
            $scope.search.page = $stateParams.page ? $stateParams.page : 1;
            $scope.search.perPage = $stateParams.perPage ? $stateParams.perPage : 10;

            $scope.updateBrands = function () {

                CategoryCategories.one($scope.search.categoryId).get({expand: "brands"}).then(function (result) {

                    $scope.brandsList = result.data.brands
                })
            };
            $scope.updateVersions = function () {

                BrandBrands.one($scope.search.brandId).get({expand: "versions"}).then(function (result) {

                    $scope.versionsList = result.data.versions
                })
            };

            $scope.updateDevices = function () {

                VersionVersions.one($scope.search.versionId).get({expand: "devices"}).then(function (result) {
                    $scope.devicesList = result.data.devices;
                })
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

                    if ((tmpStr == $scope.search.nameSearch) || (tmpStr == null) || (tmpStr == '')) {
                        $scope.search.nameSearch = tmpStr;
                        goToAdvertisementsList();
                    }

                }, 750);
            };
            $scope.selectSelect = function () {

                goToAdvertisementsList();
            };
            function goToAdvertisementsList() {
                var filter = {};
                if ($scope.search.perPage) {
                    filter = $.extend(filter,
                        {
                            perPage: $scope.search.perPage,
                            nameSearch: $scope.search.nameSearch
                        }
                    );
                }

                if ($scope.search.deviceId) {
                    filter = $.extend(filter,
                        {
                            deviceId: $scope.search.deviceId
                        }
                    );

                }
                if ($scope.search.page) {
                    filter = $.extend(filter,
                        {
                            page: $scope.search.page
                        }
                    );

                }

                $state.go(".", filter);
            }


        }]);
