'use strict';
angular.module('frontend-module.home')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.home', {
            url: '/home',
            resolve: {

                _announcementsList: [
                    'ContentContents',
                    function (ContentContents) {
                        return ContentContents.getList();
                    }
                ],
                _topCategories: [
                    'CategoryCategoriesFormatted',
                    function (CategoryCategoriesFormatted) {
                        return CategoryCategoriesFormatted.getList();
                    }
                ]
            },
            templateUrl: 'frontend/home/home.html',
            controller: 'HomeFrontendController',
            authenticate: true
        });
    }])
    .controller('HomeFrontendController',
        ['$scope', '$modal', '$timeout', '_announcementsList', '_topCategories',
            function ($scope, $modal, $timeout, _announcementsList, _topCategories) {


                $scope.announcementsList = _announcementsList.data;
                $scope.topCategories = _topCategories.data;


            }]);