'use strict';
angular.module('frontend-module.advertisements')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.advertisements.list', {
            url: '/list',
            templateUrl: 'frontend/advertisements/advertisements-list/advertisements-list.html',
            controller: 'AdvertisementsController',
            authenticate: true,
            resolve: {
                _brands: [
                    'BrandBrands', '$stateParams',
                    function (BrandBrands, $stateParams) {
                        return BrandBrands.getList();
                    }
                ],
                _announcementsList: [
                    'ContentContents',
                    function (ContentContents) {
                        return ContentContents.getList();
                    }
                ]
            }
        });
    }])
    .controller('AdvertisementsController',
        ['$scope', '$modal', '$timeout', '_brands', '_announcementsList',
            function ($scope, $modal, $timeout, _brands, _announcementsList) {

                $scope.brands = _brands.data;
                $scope.announcementsList = _announcementsList.data;

            }]);
