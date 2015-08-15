'use strict';
angular.module('frontend-module.home')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.home', {
            url: '',
            resolve: {

                _announcementsList: [
                    'ContentContents',
                    function (ContentContents) {
                        return ContentContents.getList(
                            {
                                'sort': '-updatedAt',
                                expand: '',
                                'per-page': 6,
                                page: 1
                            }
                        );
                    }
                ],
                _topCategories: [
                    'CategoryCategoriesFormatted',
                    function (CategoryCategoriesFormatted) {
                        return CategoryCategoriesFormatted.getList();
                    }
                ],
                _topBrands: [
                    'BrandBrands',
                    function (BrandBrands) {
                        return BrandBrands.getList();
                    }
                ]
            },
            templateUrl: 'frontend/home/home.html',
            controller: 'HomeFrontendController',
            authenticate: true
        });
    }])
    .controller('HomeFrontendController',
        ['$scope', '$modal', '$timeout', '_announcementsList', '_topCategories', '_topBrands',
            function ($scope, $modal, $timeout, _announcementsList, _topCategories, _topBrands) {


                $scope.announcementsList = _announcementsList.data;
                $scope.topCategories = _topCategories.data;
                $scope.topBrands = _topBrands.data;


            }]);