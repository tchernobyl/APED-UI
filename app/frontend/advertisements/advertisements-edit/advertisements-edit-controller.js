'use strict';
angular.module('frontend-module.advertisements')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.advertisements.edit', {
            url: '/edit/{id:[0-9]*}',
            templateUrl: 'frontend/advertisements/advertisements-edit/advertisements-edit.html',
            controller: 'AdvertisementsEditController',
            authenticate: true,
            resolve: {
                _announcement: [
                    'ContentContents', '$stateParams',
                    function (ContentContents, $stateParams) {
                        if ($stateParams.id) {
                            return ContentContents.one($stateParams.id).get();
                        } else {
                            return {data: ContentContents.one()};
                        }

                    }
                ]
            }
        });
    }])
    .controller('AdvertisementsEditController',
        ['$scope', '$modal', '$state', '$timeout', '_announcement',
            function ($scope, $modal, $state, $timeout, _announcement) {

                $scope.announcement = _announcement.data;


            }]);