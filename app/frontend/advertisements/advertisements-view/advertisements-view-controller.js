'use strict';
angular.module('frontend-module.advertisements')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.advertisements.view', {
            url: '/view/{id:[0-9]*}',
            templateUrl: 'frontend/advertisements/advertisements-view/advertisements-view.html',
            controller: 'AdvertisementsViewController',
            authenticate: true,
            resolve: {
                _announcement: [
                    'ContentContents', '$stateParams', '$state',
                    function (ContentContents, $stateParams, $state) {
                        if ($stateParams.id) {
                            return ContentContents.one($stateParams.id).get();
                        } else {
                            $state._stop();
                            return false;
                        }

                    }
                ]
            }
        });
    }])
    .controller('AdvertisementsViewController',
        ['$scope', '$modal', '$state', '$timeout', '_announcement',
            function ($scope, $modal, $state, $timeout, _announcement) {

                $scope.announcement = _announcement.data;


            }]);