'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('APEDevices')
    .directive('headerNotificationFrontend', function () {
        return {
            templateUrl: 'components/directives/frontend/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
            controller: function ($scope, MessageMessages) {
                $scope.userNotification = {};
                $scope.userNotification.newestMessages = [];
                MessageMessages.getList(
                    {
                        expand: 'sender',
                        page: 1,
                        'sort': '-updatedAt',
                        'per-page': 3
                    }
                ).then(function (result) {
                        $scope.userNotification.newestMessages = result.data
                    });
                $scope.ameur = 'ameur';
            }
        }
    });


