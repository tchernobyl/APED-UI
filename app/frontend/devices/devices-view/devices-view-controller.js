'use strict';
angular.module('frontend-module.devices')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('frontend.devices.view', {
            url: '/view/{id:[0-9]*}',
            templateUrl: 'frontend/devices/devices-view/devices-view.html',
            controller: 'DevicesViewController',

            userNotAuthenticated:true,
            resolve: {
                _device: [
                    'DeviceDevices', '$stateParams', '$state',
                    function (DeviceDevices, $stateParams, $state) {
                        if ($stateParams.id) {
                            return DeviceDevices.one($stateParams.id).get({expand: ''});
                        } else {
                            $state._stop();
                            return false;
                        }

                    }
                ],
                _announcementsSuggested: [
                    'ContentContents', '$stateParams', '$state',
                    function (ContentContents, $stateParams, $state) {
                        if ($stateParams.id) {
                            return ContentContents.getList(
                                {
                                    'sort': '-updatedAt',
                                    expand: '',
                                    'per-page': 6,
                                    page: 1,
                                    'query[2][type]': "eq",
                                    'query[2][field]': "device_id",
                                    'query[2][value]': $stateParams.id
                                }
                            );
                        } else {
                            $state._stop();
                            return false;
                        }

                    }
                ]


            }
        });
    }])
    .controller('DevicesViewController',
        ['$scope', '$modal', '$state', '$timeout', '_device', '_announcementsSuggested',
            function ($scope, $modal, $state, $timeout, _device, _announcementsSuggested) {

                $scope.device = _device.data;
                $scope.announcementsSuggested = _announcementsSuggested.data;


            }]);